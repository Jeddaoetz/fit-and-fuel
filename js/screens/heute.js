/* =========================================================
   SCREEN: HEUTE – Name, Check, Ampel, Wochenleiste, letzte Einheit
   ========================================================= */

function checkChips(feld, optionen) {
  const aktuell = Speicher.check(heuteText())[feld];
  return '<div class="gruppe">' + optionen.map(function (o) {
    return '<button class="chip' + (aktuell === o[0] ? " aktiv" : "") + '" data-action="check" data-feld="' + feld + '" data-wert="' + o[0] + '">' + o[1] + "</button>";
  }).join("") + "</div>";
}

function zeichneHeute() {
  const einheiten = Speicher.alleEinheiten();
  const heute = heuteText();
  const ampel = berechneAmpel(einheiten, Speicher.check(heute));
  const name = Speicher.name();

  // Beim ersten Start: nach dem Namen fragen
  if (!name) {
    return "<h1>Willkommen 👋</h1><p>Schön, dass du da bist! Wie heißt du?</p>" +
      '<input type="text" id="name-eingabe" maxlength="30" placeholder="Dein Name">' +
      '<button class="btn" data-action="name-speichern">Los geht’s</button>' +
      '<div class="hinweis">Dein Name bleibt nur auf diesem Gerät gespeichert.</div>';
  }

  // Montag dieser Woche finden
  const wochentag = (textZuDatum(heute).getDay() + 6) % 7;   // Mo=0 ... So=6
  const montag = tageVerschieben(heute, -wochentag);
  const namen = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  let leiste = "";
  for (let i = 0; i < 7; i++) {
    const tag = tageVerschieben(montag, i);
    const dran = einheiten.filter(function (e) { return e.datum === tag; });
    const symbol = dran.length ? (dran.length > 1 ? dran.length : "✓") : "";
    leiste += '<div class="tag' + (tag === heute ? " heute" : "") + '">' + namen[i] +
      '<div class="kreis' + (dran.length ? " voll" : "") + '">' + symbol + "</div></div>";
  }

  let letzte = "";
  if (einheiten.length) {
    const e = einheiten[0];
    letzte = '<h2>Zuletzt</h2><div class="karte"><div class="zeile"><b>' + esc(einheitTitel(e)) + "</b>" +
      '<span class="leise">' + datumKurz(e.datum) + "</span></div>" +
      '<p class="leise">' + e.dauer + " min · Anstrengung " + e.anstrengung + "/10 (" + anstrengungText(e.anstrengung) + ")</p></div>";
  }

  return "<h1>Hey " + esc(name) + " 👋</h1>" +
    '<p class="leise">' + datumKurz(heute) + " – was steht heute an?</p>" +
    '<div class="karte ampel ' + ampel.farbe + '"><div class="punkt">' + ampel.punkt + "</div><div><h3>" +
    esc(ampel.titel) + "</h3><p>" + esc(ampel.text) + '</p><p class="leise">Grobe Orientierung, kein Ersatz für dein Körpergefühl.</p></div></div>' +
    '<div class="karte"><h3>Wie fühlst du dich heute?</h3>' +
    checkChips("energie", [[1, "😴 müde"], [2, "🙂 okay"], [3, "💪 fit"]]) +
    '<p class="leise" style="margin-top:10px">Muskelkater?</p>' +
    checkChips("kater", [[1, "keiner"], [2, "etwas"], [3, "stark"]]) + "</div>" +
    '<button class="btn" data-action="tab" data-tab="training">💡 Trainingsvorschlag holen</button>' +
    '<button class="btn zweit" data-action="tab" data-tab="tracken">➕ Einheit eintragen</button>' +
    "<h2>Diese Woche</h2>" + '<div class="karte"><div class="woche">' + leiste + "</div></div>" +
    letzte;
}
