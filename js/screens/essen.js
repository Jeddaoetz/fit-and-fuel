/* =========================================================
   SCREEN: ESSEN – Orientierung nach Situation, Rezepte mit Mengen
   Keine Kalorien, keine Gewichtsziele.
   ========================================================= */

let essenSituation = "nach";
let essenSeed = 1;
let essenPortionen = 2;

/* Kleine, wiederholbare "Zufalls"-Zahl pro Idee (damit "Mehr Ideen" neu mischt) */
function zufallswert(text, seed) {
  let h = 2166136261 ^ seed;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return (h >>> 0) % 1000;
}

function zeichneEssen() {
  const s = SITUATIONEN[essenSituation];
  let h = "<h1>Essen &amp; Energie</h1><p class=\"leise\">Einfache Rezepte für Training, Spiel und Erholung. Ohne Kalorienzählen.</p><div class=\"gruppe\">";
  Object.keys(SITUATIONEN).forEach(function (k) {
    h += '<button class="chip' + (essenSituation === k ? " aktiv" : "") + '" data-action="essen-situation" data-wert="' + k + '">' + SITUATIONEN[k].icon + " " + SITUATIONEN[k].name + "</button>";
  });
  h += "</div>";

  h += '<div class="karte"><h3>' + s.icon + " " + esc(s.name) + "</h3><p>" + esc(s.text) + '</p><p class="leise">Quelle: ' + esc(s.quelle) + "</p></div>";

  const ideen = IDEEN.filter(function (i) { return i.anlass.indexOf(essenSituation) >= 0; })
    .sort(function (a, b) { return zufallswert(a.id, essenSeed) - zufallswert(b.id, essenSeed); })
    .slice(0, 3);

  h += "<h2>Rezepte</h2>";
  ideen.forEach(function (i) {
    h += '<div class="karte klick" data-action="idee-info" data-id="' + i.id + '"><div class="zeile"><b>' + esc(i.titel) +
      '</b><span class="badge">' + i.zeit + " Min.</span></div><p class=\"leise\">" +
      i.tags.map(function (t) { return esc(t); }).join(" · ") + "</p></div>";
  });
  h += '<button class="btn zweit" data-action="essen-mehr">🔄 Mehr Rezepte</button>';

  h += "<h2>💧 Trinken &amp; Energie</h2><div class=\"karte\"><ul>" +
    "<li>Der Gesamtbedarf liegt bei Erwachsenen bei etwa 2–2,5 Litern pro Tag, davon rund 1,5 Liter als Getränke. Wasser oder Saftschorle (1 Teil Saft, 2 Teile Wasser) reicht den meisten Freizeitsportlern.</li>" +
    "<li>Bei vielen Einheiten pro Woche brauchst du genug Energie: lieber regelmäßig essen als zu wenig.</li>" +
    "<li>Energydrinks sind für Sport nicht nötig. Das Bundesinstitut für Risikobewertung (BfR) warnt bei hohem Konsum vor Gesundheitsrisiken für Kinder und Jugendliche, vor allem für Herz und Kreislauf. Körperliche Anstrengung verstärkt die Wirkung.</li></ul></div>";

  h += "<h2>Quellen</h2><div class=\"karte\"><ul>" +
    ESSEN_QUELLEN.map(function (q) { return '<li><a href="' + esc(q.url) + '" target="_blank" rel="noopener">' + esc(q.titel) + '</a><br><span class="leise">Genutzt für: ' + esc(q.fuer) + "</span></li>"; }).join("") +
    '</ul><p class="leise">Die Rezepte selbst sind allgemeine Hausmannskost. Ihre Mengen sind Richtwerte für eine normale Portion und keine Ernährungsberatung.</p></div>';

  h += '<div class="hinweis">Das ist eine allgemeine Orientierung, keine individuelle Ernährungsberatung. Wenn dich Gewicht, Essen oder dein Körper stark beschäftigen oder du dich ständig erschöpft fühlst, sprich mit einem Arzt, einer Ärztin oder einer Ernährungsfachkraft.</div>';
  return h;
}

function zeichneIdeeDetail(id) {
  const i = findeIdee(id);
  if (!i) return "";
  let h = "<h1>" + esc(i.titel) + '</h1><p><span class="badge">ca. ' + i.zeit + " Min.</span>" +
    i.tags.map(function (t) { return '<span class="badge">' + esc(t) + "</span>"; }).join("") + "</p>";

  h += "<h2>Portionen</h2><div class=\"gruppe\">" + [1, 2, 3, 4].map(function (n) {
    return '<button class="chip' + (essenPortionen === n ? " aktiv" : "") + '" data-action="portionen" data-wert="' + n + '" data-id="' + i.id + '">' + n + "</button>";
  }).join("") + "</div>";

  h += "<h2>Zutaten für " + essenPortionen + (essenPortionen === 1 ? " Portion" : " Portionen") + "</h2><ul>" +
    i.zutaten.map(function (z) { return "<li>" + esc(formatZutat(z, essenPortionen)) + "</li>"; }).join("") + "</ul>";

  if (i.hinweis) h += '<div class="hinweis">⚠️ ' + esc(i.hinweis) + "</div>";

  h += "<h2>Zubereitung</h2><ol>" + i.schritte.map(function (z) { return "<li>" + esc(z) + "</li>"; }).join("") + "</ol>" +
    '<div class="karte">💡 ' + esc(i.tipp) + "</div>" +
    '<p class="leise">Mengen sind Richtwerte, passe sie an deinen Hunger an. Bei Allergien oder Unverträglichkeiten Zutaten ersetzen. Garzeiten gelten für normale Herde und können abweichen. Bei 3–4 Portionen größere Töpfe und Pfannen nehmen.</p>';
  return h;
}
