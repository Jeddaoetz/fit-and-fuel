/* =========================================================
   SCREEN: FORTSCHRITT – Woche, Rekorde, Verlauf, Daten
   ========================================================= */

function zeichneFortschritt() {
  const einheiten = Speicher.alleEinheiten();
  const heute = heuteText();
  const wochentag = (textZuDatum(heute).getDay() + 6) % 7;
  const montag = tageVerschieben(heute, -wochentag);

  const dieseWoche = einheiten.filter(function (e) { return e.datum >= montag && e.datum <= heute; });
  let minuten = 0;
  dieseWoche.forEach(function (e) { minuten += e.dauer; });

  let h = "<h1>Fortschritt</h1>" +
    '<div class="kennzahlen"><div class="karte"><b>' + dieseWoche.length + '</b><span class="leise">Einheiten diese Woche</span></div>' +
    '<div class="karte"><b>' + (Math.round(minuten / 6) / 10) + ' h</b><span class="leise">Zeit diese Woche</span></div></div>';

  // Rekorde
  const mitDaten = UEBUNGEN.filter(function (u) { return rekordFuer(u.id); });
  h += "<h2>🏆 Rekorde</h2>";
  if (!mitDaten.length) h += '<p class="leise">Noch keine Rekorde. Trage Calisthenics-Einheiten mit Übungen ein, dann erscheinen sie hier.</p>';
  mitDaten.forEach(function (u) {
    h += '<div class="karte klick" data-action="uebung-info" data-id="' + u.id + '"><div class="zeile"><b>' + esc(u.name) + "</b></div><p class=\"leise\">" + esc(rekordFuer(u.id)) + "</p></div>";
  });

  // Verlauf
  h += "<h2>Verlauf</h2>";
  if (!einheiten.length) h += '<p class="leise">Noch nichts eingetragen.</p>';
  einheiten.slice(0, 15).forEach(function (e) {
    h += '<div class="karte"><div class="zeile"><b>' + esc(einheitTitel(e)) + '</b><span class="leise">' + datumKurz(e.datum) + "</span></div>" +
      '<p class="leise">' + e.dauer + " min · Anstrengung " + e.anstrengung + "/10";
    if (e.quelle) h += " · " + (e.quelle === "trainer" ? "mit Trainer" : "selbst gestaltet");
    h += "</p>";
    (e.uebungen || []).forEach(function (eintrag) {
      const u = findeUebung(eintrag.uebungId);
      if (!u) return;
      const teile = eintrag.saetze.map(function (s) { return s.wert + (s.kg ? "×+" + s.kg + "kg" : ""); }).join(" · ");
      h += "<p>" + esc(u.name) + ': <span class="leise">' + esc(teile) + "</span></p>";
    });
    if (e.notiz) h += '<p class="leise">„' + esc(e.notiz) + "“</p>";
    h += '<button class="btn klein zweit" data-action="einheit-weg" data-id="' + e.id + '">Löschen</button></div>';
  });

  // Profil
  h += "<h2>👤 Profil</h2>" +
    '<div class="karte"><label style="margin-top:0">Dein Name</label><input type="text" id="name-eingabe" maxlength="30" value="' + esc(Speicher.name()) + '">' +
    '<button class="btn zweit" data-action="name-speichern">Name speichern</button></div>';

  // Daten & Datenschutz
  h += "<h2>🔒 Deine Daten</h2>" +
    '<div class="karte"><p>Alles bleibt <b>nur auf diesem Gerät, in diesem Browser</b>. Nichts wird ins Internet geschickt.</p>' +
    '<p class="leise">Wenn du Browserdaten löschst oder das Handy wechselst, sind sie weg. Sichere sie deshalb ab und zu.</p>' +
    (Speicher.klappt() ? "" : '<div class="hinweis">⚠️ Speichern klappt in diesem Browser gerade nicht (z. B. privater Modus).</div>') +
    '<button class="btn zweit" data-action="export">⬇️ Sicherung herunterladen</button>' +
    '<button class="btn zweit" data-action="import">⬆️ Sicherung einspielen</button>' +
    '<input type="file" id="import-datei" accept="application/json,.json" hidden>' +
    '<button class="btn gefahr" data-action="alles-weg">Alle Daten löschen</button></div>' +
    '<div class="hinweis">Diese App ist kein medizinisches Hilfsmittel und stellt keine Diagnosen. Bei Schmerzen, Verletzungen, Essproblemen oder ständiger Erschöpfung sprich mit einem Arzt oder einer Ärztin.</div>';
  h += '<h2>ℹ️ Über die Inhalte</h2><div class="karte"><p>Übungen, Drills und Pläne sind <b>teilweise</b> durch Fachquellen gestützt, vieles ist Praxiswissen. Was genau, steht im Tab Training unter „Quellen“. Bei Technik, vor allem bei Handstand und Planche, frage deinen Trainer.</p>' +
    '<p>Die <b>Ernährungsinfos</b> nennen ihre Quellen im Tab Essen. Aussagen ohne Quelle sind als Erfahrungswert gekennzeichnet.</p></div>';
  return h;
}
