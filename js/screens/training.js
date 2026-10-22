/* =========================================================
   SCREEN: TRAINING – Vorschlag, Übungen, Drills
   ========================================================= */

let trainingAnsicht = "vorschlag";     // vorschlag | uebungen | drills
let trainingFilter = "alle";
let vorschlag = { sportart: "calisthenics", minuten: 30, fokus: "auto", ort: "korb", partner: "allein", plan: null };

function vchip(feld, wert, text) {
  const aktiv = vorschlag[feld] === wert ? " aktiv" : "";
  return '<button class="chip' + aktiv + '" data-action="v-setze" data-feld="' + feld + '" data-wert="' + wert + '">' + text + "</button>";
}

function zeichneTraining() {
  const ansichten = [["vorschlag", "💡 Vorschlag"], ["uebungen", "💪 Übungen"], ["drills", "🏀 Drills"], ["quellen", "📚 Quellen"]];
  let h = "<h1>Training</h1><div class=\"gruppe\">" + ansichten.map(function (a) {
    return '<button class="chip' + (trainingAnsicht === a[0] ? " aktiv" : "") + '" data-action="ansicht" data-wert="' + a[0] + '">' + a[1] + "</button>";
  }).join("") + "</div>";

  if (trainingAnsicht === "vorschlag") return h + zeichneVorschlag();
  if (trainingAnsicht === "drills") return h + zeichneDrillListe();
  if (trainingAnsicht === "quellen") return h + zeichneQuellen();
  return h + zeichneUebungsBibliothek();
}

/* ---------- Vorschlag ---------- */
function zeichneVorschlag() {
  const v = vorschlag;
  let h = '<h2>Was möchtest du trainieren?</h2><div class="gruppe">' +
    vchip("sportart", "calisthenics", "💪 Calisthenics") + vchip("sportart", "basketball", "🏀 Basketball-Skills") + "</div>";

  h += "<label>Zeit</label><div class=\"gruppe\">" + [20, 30, 45, 60].map(function (m) { return vchip("minuten", m, m + " Min."); }).join("") + "</div>";

  const fokusListe = v.sportart === "calisthenics" ? CALI_FOKUS : BASKET_FOKUS;
  h += "<label>Fokus</label><div class=\"gruppe\">" + Object.keys(fokusListe).map(function (k) { return vchip("fokus", k, fokusListe[k]); }).join("") + "</div>";

  if (v.sportart === "basketball") {
    h += "<label>Was hast du zur Verfügung?</label><div class=\"gruppe\">" +
      vchip("ort", "korb", "Ball + Korb") + vchip("ort", "ball", "Nur Ball") + vchip("ort", "nichts", "Ohne Ball (zuhause)") + "</div>";
    h += "<label>Mit wem?</label><div class=\"gruppe\">" + vchip("partner", "allein", "Allein") + vchip("partner", "partner", "Mit Partner") + "</div>";
  }
  h += '<button class="btn" data-action="v-erstellen">' + (v.plan ? "🔄 Anderen Vorschlag" : "Plan erstellen") + "</button>";

  if (v.plan) h += zeichnePlan(v.plan);
  return h;
}

function zeichnePlan(plan) {
  let h = "<h2>" + esc(plan.titel) + '</h2><p class="leise">Fokus: ' + esc(plan.fokusText) + "</p>";
  plan.hinweise.forEach(function (t) { h += '<div class="hinweis">⚠️ ' + esc(t) + "</div>"; });

  h += '<div class="karte"><div class="zeile"><b>1 · Aufwärmen</b><span class="badge">' + plan.warm.min + " Min.</span></div><ul>" +
    plan.warm.punkte.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></div>";

  h += '<div class="zeile" style="margin-top:14px"><b>2 · Hauptteil</b></div>';
  if (plan.typ === "cali") {
    plan.haupt.forEach(function (x) {
      const u = findeUebung(x.uebungId);
      const rekord = rekordFuer(u.id);
      const ziel = u.messart === "sek"
        ? x.saetze + " × Halten, ca. 70 % deiner Bestzeit"
        : x.saetze + " × sauber, ca. 2 Wdh. vor dem Limit";
      h += '<div class="karte klick" data-action="uebung-info" data-id="' + u.id + '"><div class="zeile"><b>' + esc(u.name) +
        '</b><span class="badge">' + KATEGORIEN[u.kategorie].name + "</span></div><p>" + esc(ziel) + "</p>" +
        (rekord ? '<p class="leise">🏆 ' + esc(rekord) + "</p>" : "") + '<p class="leise">Tippen für Anleitung</p></div>';
    });
  } else {
    plan.haupt.forEach(function (x) {
      const d = findeDrill(x.drillId);
      h += '<div class="karte klick" data-action="drill-info" data-id="' + d.id + '"><div class="zeile"><b>' + esc(d.name) +
        '</b><span class="badge">' + x.min + " Min.</span></div><p class=\"leise\">" + esc(DRILL_FOKUS[d.fokus].icon + " " + DRILL_FOKUS[d.fokus].name) + "</p><p>" + esc(d.ziel) + '</p><p class="leise">Tippen für Anleitung</p></div>';
    });
    if (plan.frei) h += '<div class="karte"><div class="zeile"><b>Freies Spielen / Lieblingsübung</b><span class="badge">' + plan.frei + " Min.</span></div></div>";
  }

  h += '<div class="karte"><div class="zeile"><b>3 · Abschluss</b><span class="badge">' + plan.cool.min + " Min.</span></div><ul>" +
    plan.cool.punkte.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></div>";

  h += '<p class="leise">Aufbau (dynamisch aufwärmen, danach leichter dehnen) nach AAP 2020. Satzzahlen und Zielwerte sind Praxis-Faustwerte, keine Studienwerte.</p>';
  h += '<button class="btn" data-action="v-uebernehmen">✅ Als Einheit eintragen</button>';
  return h;
}

/* ---------- Drill-Liste und Detail ---------- */
function zeichneDrillListe() {
  let h = '<p class="leise">Basketball-Übungen zum Selbermachen. Tippe für die Anleitung.</p>';
  Object.keys(DRILL_FOKUS).forEach(function (k) {
    const liste = DRILLS.filter(function (d) { return d.fokus === k; });
    if (!liste.length) return;
    h += "<h2>" + DRILL_FOKUS[k].icon + " " + DRILL_FOKUS[k].name + "</h2>";
    liste.forEach(function (d) {
      h += '<div class="karte klick" data-action="drill-info" data-id="' + d.id + '"><div class="zeile"><b>' + esc(d.name) +
        '</b><span class="badge">' + d.min + ' Min.</span></div><p class="leise">' + esc(drillBraucht(d)) + "</p></div>";
    });
  });
  return h;
}

function drillBraucht(d) {
  const b = { korb: "Ball + Korb", ball: "Ball", nichts: "ohne Ball" }[d.braucht];
  return b + (d.partner === "ja" ? " · mit Partner" : " · auch allein");
}

function zeichneDrillDetail(id) {
  const d = findeDrill(id);
  if (!d) return "";
  return "<h1>" + esc(d.name) + '</h1><p><span class="badge">' + esc(DRILL_FOKUS[d.fokus].name) + '</span><span class="badge">' + d.min + ' Min.</span><span class="badge">' + esc(drillBraucht(d)) + "</span></p>" +
    "<h2>So geht’s</h2><ol>" + d.anleitung.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>" +
    '<div class="karte">🎯 ' + esc(d.ziel) + "</div>" +
    '<p class="leise">Tipp: ' + esc(d.tipp) + "</p>" +
    '<p class="leise">' + esc(quellenZeile(DRILL_QUELLE[d.id])) + "</p>" +
    '<p class="leise" style="margin-top:18px">Bei Schmerzen abbrechen. Sprints und Sprünge nur gut aufgewärmt.</p>';
}

/* ---------- Übungsbibliothek ---------- */
function zeichneUebungsBibliothek() {
  let h = '<p class="leise">Tippe eine Übung an für die Anleitung.</p><div class="gruppe">';
  h += '<button class="chip' + (trainingFilter === "alle" ? " aktiv" : "") + '" data-action="filter" data-wert="alle">Alle</button>';
  Object.keys(KATEGORIEN).forEach(function (k) {
    h += '<button class="chip' + (trainingFilter === k ? " aktiv" : "") + '" data-action="filter" data-wert="' + k + '">' + KATEGORIEN[k].name + "</button>";
  });
  h += "</div>";

  UEBUNGEN.filter(function (u) { return trainingFilter === "alle" || u.kategorie === trainingFilter; })
    .forEach(function (u) {
      h += '<div class="karte klick" data-action="uebung-info" data-id="' + u.id + '"><div class="zeile"><b>' + esc(u.name) +
        '</b><span class="badge">' + KATEGORIEN[u.kategorie].name + "</span></div>" +
        '<p class="leise">' + esc(u.muskeln) + "</p></div>";
    });
  return h;
}

function zeichneUebungDetail(id) {
  const u = findeUebung(id);
  if (!u) return "";
  const rekord = rekordFuer(id);

  let h = "<h1>" + esc(u.name) + '</h1><p><span class="badge">' + KATEGORIEN[u.kategorie].name + '</span><span class="badge">' +
    (u.messart === "sek" ? "Haltezeit" : "Wiederholungen") + "</span></p>" +
    '<p class="leise">Trainiert: ' + esc(u.muskeln) + "</p>";
  if (rekord) h += '<div class="karte">🏆 Dein Rekord: <b>' + esc(rekord) + "</b></div>";
  if (u.hinweis) h += '<div class="hinweis">⚠️ ' + esc(u.hinweis) + "</div>";

  h += "<h2>So geht’s</h2><ol>" + u.anleitung.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>";
  if (u.tipps.length) h += "<h2>Tipps</h2><ul>" + u.tipps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>";
  if (u.fehler.length) h += "<h2>Typische Fehler</h2><ul>" + u.fehler.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>";
  h += '<p class="leise">' + esc(quellenZeile(UEBUNG_QUELLE[u.id])) + "</p>";
  h += '<p class="leise" style="margin-top:18px">Bei Schmerzen (nicht Muskelbrennen) abbrechen und Trainer oder Arzt fragen. Diese Anleitung ersetzt keine persönliche Einweisung.</p>';
  return h;
}

/* Bester Wert für eine Übung aus allen gespeicherten Einheiten */
function rekordFuer(id) {
  const u = findeUebung(id);
  let besterWert = 0, besteMitGewicht = null;
  Speicher.alleEinheiten().forEach(function (e) {
    (e.uebungen || []).forEach(function (eintrag) {
      if (eintrag.uebungId !== id) return;
      eintrag.saetze.forEach(function (s) {
        if (s.wert > besterWert) besterWert = s.wert;
        if (s.kg > 0 && (!besteMitGewicht || s.kg > besteMitGewicht.kg || (s.kg === besteMitGewicht.kg && s.wert > besteMitGewicht.wert))) {
          besteMitGewicht = { kg: s.kg, wert: s.wert };
        }
      });
    });
  });
  if (!besterWert) return "";
  const einheit = u.messart === "sek" ? " Sek." : " Wdh.";
  let text = besterWert + einheit;
  if (besteMitGewicht) text += " · mit +" + besteMitGewicht.kg + " kg: " + besteMitGewicht.wert + einheit;
  return text;
}

/* ---------- Quellen ---------- */
function zeichneQuellen() {
  let h = "<h2>📚 Quellen &amp; Stand</h2>" +
    '<div class="karte"><p><b>Was ist geprüft?</b></p><ul>' +
    "<li>Allgemeine Grundsätze für Training mit Jugendlichen (Aufsicht, Technik, Aufwärmen, Erholung).</li>" +
    "<li>Landetraining und Gleichgewicht gegen Sprunggelenk- und Knieverletzungen.</li>" +
    "<li>Die Ausführung von Liegestütz und Glute Bridge.</li>" +
    "<li>Hinweis auf häufige Handgelenkschmerzen bei Handstütz-Sportarten.</li></ul>" +
    "<p><b>Was ist Praxiswissen, nicht geprüft?</b></p><ul>" +
    "<li>Die meisten Übungsbeschreibungen und alle Basketball-Drills.</li>" +
    "<li>Satzzahlen, Zielwerte (z. B. „2 Wdh. vor dem Limit“) und die Zeiten im Plan.</li>" +
    "<li>Die Regel „Planche-Übungen nicht an aufeinanderfolgenden Tagen und höchstens 3 Tage pro Woche“ ist eine vorsichtige Eigenregel, keine Studienvorgabe.</li>" +
    "<li>Der Skill-Pfad zum 90°-Handstand-Liegestütz.</li></ul></div>";
  Object.keys(TRAINING_QUELLEN).forEach(function (k) {
    const q = TRAINING_QUELLEN[k];
    h += '<div class="karte"><b><a href="' + esc(q.url) + '" target="_blank" rel="noopener">' + esc(q.titel) + "</a></b><p>" + esc(q.inhalt) + "</p></div>";
  });
  h += '<div class="hinweis">Bei Technik, vor allem bei Handstand und Planche, ist dein Trainer die beste Quelle.</div>';
  return h;
}
