/* =========================================================
   PLANER – baut Trainingsvorschläge aus einfachen Regeln
   Kein "KI-Zauber": Wir wählen Übungen aus Pools, bevorzugen,
   was lange nicht dran war, und würfeln für Abwechslung.
   ========================================================= */

const CALI_FOKUS = {
  auto:       "Passt für mich",
  ganzkoerper:"Ganzkörper",
  push:       "Push",
  pull:       "Pull",
  beinecore:  "Beine & Core",
  skill:      "Skill (Handstand/Planche)"
};
const BASKET_FOKUS = { mix: "Mix", wurf: "Wurf", ball: "Ballhandling", abschluss: "Abschlüsse", athletik: "Athletik & Fußarbeit" };

/* Welche Übungs-Gruppen (Slots) gehören zu welchem Fokus */
const SLOTS = {
  ganzkoerper: ["push", "pull", "beine", "core", "push", "pull"],
  push:        ["push", "push", "push", "core", "pfad"],
  pull:        ["pull", "pull", "pull", "core", "core"],
  beinecore:   ["beine", "beine", "core", "core", "beine"],
  skill:       ["pfad", "pfad", "pfad", "core", "push"]
};

function tageSeit(datum) {
  if (!datum) return 999;
  return Math.round((textZuDatum(heuteText()) - textZuDatum(datum)) / 86400000);
}

/* Wann wurde jede Übung zuletzt gemacht? { uebungId: "2026-10-20" } */
function letzteDurchfuehrungen() {
  const m = {};
  Speicher.alleEinheiten().forEach(function (e) {
    (e.uebungen || []).forEach(function (x) {
      if (!m[x.uebungId] || e.datum > m[x.uebungId]) m[x.uebungId] = e.datum;
    });
  });
  return m;
}

/* Sperre für Planche-Übungen: nicht nach gestern/heute und höchstens 3 Tage pro Woche */
function planchePause() {
  const heute = heuteText(), ab = tageVerschieben(heute, -6), tage = {};
  Speicher.alleEinheiten().forEach(function (e) {
    (e.uebungen || []).forEach(function (x) {
      if (HOHE_BELASTUNG.indexOf(x.uebungId) >= 0 && e.datum >= ab) tage[e.datum] = true;
    });
  });
  return Object.keys(tage).length >= 3 || !!tage[tageVerschieben(heute, -1)] || !!tage[heute];
}

/* Fokus automatisch wählen: das, was am längsten nicht dran war */
function waehleAutoFokus() {
  const gruppen = { push: ["push"], pull: ["pull"], beinecore: ["beine", "core"] };
  const letzte = letzteDurchfuehrungen();
  const heute = heuteText();
  const basketRecent = Speicher.alleEinheiten().some(function (e) {
    return e.sportart === "basketball" && (e.datum === heute || e.datum === tageVerschieben(heute, -1));
  });

  let besten = [], bestSeit = -1;
  Object.keys(gruppen).forEach(function (k) {
    if (k === "beinecore" && basketRecent) return;   // Beine nach Basketball schonen
    let latest = "";
    UEBUNGEN.forEach(function (u) {
      if (gruppen[k].indexOf(u.kategorie) >= 0 && letzte[u.id] && letzte[u.id] > latest) latest = letzte[u.id];
    });
    const seit = tageSeit(latest);
    if (seit > bestSeit) { bestSeit = seit; besten = [k]; } else if (seit === bestSeit) besten.push(k);
  });
  const fokus = besten[Math.floor(Math.random() * besten.length)];
  return { fokus: fokus, seit: bestSeit };
}

function waehleUebung(slot, benutzt, sperre, letzte) {
  const pool = UEBUNGEN.filter(function (u) {
    const passt = slot === "pfad" ? PFAD_IDS.indexOf(u.id) >= 0 : u.kategorie === slot;
    return passt && benutzt.indexOf(u.id) < 0 && !(sperre && HOHE_BELASTUNG.indexOf(u.id) >= 0);
  });
  if (!pool.length) return null;
  pool.sort(function (a, b) { return tageSeit(letzte[b.id]) - tageSeit(letzte[a.id]); });
  const top = pool.slice(0, Math.min(3, pool.length));
  return top[Math.floor(Math.random() * top.length)];
}

function erstellePlan(v) {
  const ampel = berechneAmpel(Speicher.alleEinheiten(), Speicher.check(heuteText()));
  return v.sportart === "calisthenics" ? planCalisthenics(v, ampel) : planBasketball(v, ampel);
}

function planCalisthenics(v, ampel) {
  const minuten = v.minuten;
  const warm = minuten >= 30 ? 5 : 4, cool = minuten >= 30 ? 3 : 2;
  const haupt = minuten - warm - cool;
  const saetzeGesamt = Math.floor(haupt / 2);
  const anzahl = Math.max(2, Math.min(5, Math.round(saetzeGesamt / 3)));
  const sperre = planchePause();
  const hinweise = [];

  let fokus = v.fokus;
  let fokusText = CALI_FOKUS[fokus];
  if (fokus === "auto") {
    const a = waehleAutoFokus();
    fokus = a.fokus;
    fokusText = CALI_FOKUS[fokus] + (a.seit >= 999 ? " (noch nie eingetragen)" : a.seit === 0 ? " (heute schon trainiert)" : " (zuletzt vor " + a.seit + " Tagen)");
  }

  let slots = SLOTS[fokus].slice(0, anzahl);
  if (v.fokus === "auto" && minuten >= 30 && !sperre && fokus !== "skill" && slots.length >= 3) slots[slots.length - 1] = "pfad";

  if (sperre && (fokus === "skill" || slots.indexOf("pfad") >= 0)) {
    hinweise.push("Planche-Übungen sind heute pausiert (gestern oder bereits 3 Tage diese Woche). Das schützt Handgelenke und Ellbogen.");
  }

  const letzte = letzteDurchfuehrungen();
  const benutzt = [];
  const liste = [];
  slots.forEach(function (slot) {
    const u = waehleUebung(slot, benutzt, sperre, letzte);
    if (u) { benutzt.push(u.id); liste.push(u); }
  });

  // Sätze verteilen
  const basis = Math.floor(saetzeGesamt / liste.length);
  let rest = saetzeGesamt - basis * liste.length;
  let leicht = 0;
  if (ampel.farbe === "gelb") { leicht = 1; hinweise.push("Die Ampel steht auf Gelb: eine Runde weniger pro Übung und eher locker."); }
  if (ampel.farbe === "rot")  { leicht = 9; hinweise.push("Die Ampel steht auf Rot: heute nur 2 Sätze pro Übung, locker. Ein freier Tag wäre auch okay."); }

  const hauptListe = liste.map(function (u) {
    let s = basis + (rest > 0 ? 1 : 0);
    if (rest > 0) rest--;
    s = Math.min(5, Math.max(2, s));
    if (leicht === 1) s = Math.max(2, s - 1);
    if (leicht === 9) s = 2;
    return { uebungId: u.id, saetze: s };
  });

  return {
    typ: "cali", titel: minuten + " Minuten Calisthenics", fokusText: fokusText, minuten: minuten,
    warm: { min: warm, punkte: [
      "Handgelenke kreisen und Finger dehnen (1 Min.)",
      "Schulterkreisen und Arm-Pendeln (1 Min.)",
      minuten >= 30 ? "Stepper oder Hampelmänner locker (2 Min.)" : "Hampelmänner locker (1 Min.)",
      "Dann: 1 leichter Satz der ersten Übung"
    ] },
    haupt: hauptListe,
    cool: { min: cool, punkte: ["Brust und Schulter dehnen (je 30 Sek. pro Seite)", "Handgelenke und Unterarme locker dehnen", "Ruhig atmen und etwas trinken"] },
    hinweise: hinweise
  };
}

const DRILL_REIHENFOLGE = ["athletik", "ball", "abschluss", "wurf", "spiel"];

function planBasketball(v, ampel) {
  const minuten = v.minuten;
  const warm = minuten >= 30 ? 5 : 4, cool = minuten >= 30 ? 3 : 2;
  let rest = minuten - warm - cool;
  const level = DRILL_BRAUCHT[v.ort];
  const partner = v.partner === "partner";
  const hinweise = [];

  let pool = DRILLS.filter(function (d) { return DRILL_BRAUCHT[d.braucht] <= level && (d.partner !== "ja" || partner); });
  if (ampel.farbe === "rot") {
    pool = pool.filter(function (d) { return d.fokus !== "athletik" && d.fokus !== "spiel"; });
    hinweise.push("Die Ampel steht auf Rot: heute ohne Sprints, Sprünge und Spielformen, lieber Technik in ruhigem Tempo.");
  } else if (ampel.farbe === "gelb") {
    hinweise.push("Die Ampel steht auf Gelb: Sprints und Sprünge eher kurz halten.");
  }

  const gewaehlt = [];
  function nimm(fokus) {
    const kand = pool.filter(function (d) { return d.fokus === fokus && gewaehlt.indexOf(d) < 0 && d.min <= rest; });
    if (!kand.length) return false;
    const d = kand[Math.floor(Math.random() * kand.length)];
    gewaehlt.push(d); rest -= d.min; return true;
  }

  if (v.fokus === "mix") {
    const kreis = ["ball", "abschluss", "wurf", "athletik", "spiel"];
    let weiter = true;
    while (weiter && rest >= 4) {
      weiter = false;
      kreis.forEach(function (f) { if (rest >= 4 && nimm(f)) weiter = true; });
    }
  } else {
    while (nimm(v.fokus)) { /* so lange noch Zeit und Drills da sind */ }
  }

  gewaehlt.sort(function (a, b) { return DRILL_REIHENFOLGE.indexOf(a.fokus) - DRILL_REIHENFOLGE.indexOf(b.fokus); });
  if (!gewaehlt.length) hinweise.push("Mit dieser Auswahl gibt es keinen passenden Drill. Wähle mehr Zeit oder einen anderen Ort.");

  return {
    typ: "basket", titel: minuten + " Minuten Basketball-Skills", fokusText: BASKET_FOKUS[v.fokus], minuten: minuten,
    warm: { min: warm, punkte: ["Lockeres Einlaufen (2 Min.)", "Arm-, Hüft- und Fußgelenk-Kreisen", "Seitgalopp und leichte Hüpfer", minuten >= 30 ? "Ein paar lockere Würfe oder Dribblings zum Warmwerden" : "Ball locker in den Händen bewegen"] },
    haupt: gewaehlt.map(function (d) { return { drillId: d.id, min: d.min }; }),
    frei: rest >= 3 ? rest : 0,
    cool: { min: cool, punkte: ["Waden und Oberschenkel dehnen", "Schultern und Arme locker ausschütteln", "Ruhig atmen und etwas trinken"] },
    hinweise: hinweise
  };
}

/* Plan in das Eintrag-Formular übernehmen */
function uebernehmePlan(plan) {
  entwurf = neuerEntwurf();
  entwurf.dauer = plan.minuten;
  if (plan.typ === "cali") {
    entwurf.sportart = "calisthenics";
    entwurf.anstrengung = 5;
    entwurf.uebungen = plan.haupt.map(function (h) {
      const saetze = [];
      for (let i = 0; i < h.saetze; i++) saetze.push({ wert: "", kg: "" });
      return { uebungId: h.uebungId, saetze: saetze };
    });
  } else {
    entwurf.sportart = "basketball";
    entwurf.art = "training";
    entwurf.quelle = "selbst";
    entwurf.anstrengung = 5;
    entwurf.notiz = "Drills: " + plan.haupt.map(function (h) { return findeDrill(h.drillId).name; }).join(", ");
  }
}
