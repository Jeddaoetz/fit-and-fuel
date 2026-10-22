/* =========================================================
   ERHOLUNGS-AMPEL – einfache Regeln, keine Medizin!
   Idee: Wie viele harte Tage hintereinander? Gab es Ruhetage?
   Das ist nur eine grobe Orientierung. Dein Körpergefühl zählt mehr.
   ========================================================= */

/* Belastungszahl einer Einheit = Minuten x Anstrengung (1-10) */
function belastung(e) { return (e.dauer || 0) * (e.anstrengung || 0); }

/* Ist ein Tag "hart"? (Anstrengung 7+ oder viel Belastung) */
function istHarterTag(einheitenDesTages) {
  if (einheitenDesTages.length === 0) return false;
  let summe = 0, maxAnstrengung = 0;
  einheitenDesTages.forEach(function (e) {
    summe += belastung(e);
    if ((e.anstrengung || 0) > maxAnstrengung) maxAnstrengung = e.anstrengung;
  });
  return maxAnstrengung >= 7 || summe >= 420;
}

function berechneAmpel(einheiten, check) {
  check = check || {};
  const heute = heuteText();

  // Einheiten pro Tag sammeln
  const proTag = {};
  einheiten.forEach(function (e) {
    (proTag[e.datum] = proTag[e.datum] || []).push(e);
  });

  // Harte Tage in Folge (von heute rückwärts; ist heute noch leer, ab gestern)
  let start = proTag[heute] ? 0 : 1;
  let folge = 0;
  for (let i = start; i < 30; i++) {
    const tag = tageVerschieben(heute, -i);
    if (istHarterTag(proTag[tag] || [])) folge++; else break;
  }

  // Ruhetage in den letzten 6 abgeschlossenen Tagen
  let ruhetage = 0;
  for (let i = 1; i <= 6; i++) {
    if (!proTag[tageVerschieben(heute, -i)]) ruhetage++;
  }

  // Belastung der letzten 7 Tage (nur zur Info)
  let woche = 0;
  for (let i = 0; i <= 6; i++) {
    (proTag[tageVerschieben(heute, -i)] || []).forEach(function (e) { woche += belastung(e); });
  }

  let ergebnis;
  if (folge >= 3) {
    ergebnis = { farbe: "rot", punkt: "🔴", titel: "Zeit für eine Pause",
      text: folge + " harte Tage hintereinander. Heute lieber Ruhetag oder nur locker bewegen (Spaziergang, Mobility). Dein Körper baut in der Pause Kraft auf." };
  } else if (folge === 2 || ruhetage === 0) {
    ergebnis = { farbe: "gelb", punkt: "🟡", titel: "Achte auf Erholung",
      text: ruhetage === 0
        ? "In den letzten 6 Tagen hattest du keinen freien Tag. Plane bald einen lockeren oder freien Tag ein."
        : "Zwei harte Tage in Folge. Heute eher locker, Technik oder Beweglichkeit." };
  } else {
    ergebnis = { farbe: "gruen", punkt: "🟢", titel: "Gute Balance",
      text: "Du bist gut erholt. Trainiere so, wie du Lust hast, und hör auf deinen Körper." };
  }

  // Dein heutiger Check kann die Ampel verschlechtern (nie verbessern)
  if (ergebnis.farbe === "gruen" && (check.energie === 1 || check.kater === 3)) {
    ergebnis = { farbe: "gelb", punkt: "🟡", titel: "Dein Körper meldet sich",
      text: check.kater === 3 ? "Starker Muskelkater: heute eher locker oder Technik." : "Du fühlst dich müde: heute eher locker, schlaf dich gut aus." };
  }
  return ergebnis;
}
