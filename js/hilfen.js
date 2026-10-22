/* =========================================================
   HILFSFUNKTIONEN – kleine Helfer, die überall gebraucht werden
   ========================================================= */

/* Sonderzeichen entschärfen, bevor Text in die Seite kommt (Sicherheit!) */
function esc(text) {
  return String(text == null ? "" : text)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* Datum als Text "2026-10-22" (nach lokaler Zeit, nicht UTC) */
function datumText(d) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const t = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + m + "-" + t;
}
function heuteText() { return datumText(new Date()); }

/* Text "2026-10-22" zurück in ein Datum (Mittag, damit Zeitumstellung nicht stört) */
function textZuDatum(text) {
  const t = text.split("-");
  return new Date(Number(t[0]), Number(t[1]) - 1, Number(t[2]), 12, 0, 0);
}

/* Datum verschieben: tageVerschieben("2026-10-22", -1) → "2026-10-21" */
function tageVerschieben(text, tage) {
  const d = textZuDatum(text);
  d.setDate(d.getDate() + tage);
  return datumText(d);
}

/* Schön anzeigen: "Do, 22.10." */
function datumKurz(text) {
  const tage = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const d = textZuDatum(text);
  return tage[d.getDay()] + ", " + String(d.getDate()).padStart(2, "0") + "." + String(d.getMonth() + 1).padStart(2, "0") + ".";
}

/* Kurze Meldung unten einblenden */
function zeigeToast(text) {
  const t = document.getElementById("toast");
  t.textContent = text;
  t.hidden = false;
  setTimeout(function () { t.hidden = true; }, 1800);
}

/* Aufklapp-Fenster */
function oeffneSheet(html) {
  document.getElementById("sheet-inhalt").innerHTML = html;
  document.getElementById("sheet").hidden = false;
  document.querySelector(".sheet-box").scrollTop = 0;   // immer oben starten
}
function schliesseSheet() { document.getElementById("sheet").hidden = true; }

/* Beschriftung für die Anstrengung */
function anstrengungText(n) {
  if (n <= 3) return "locker";
  if (n <= 6) return "mittel";
  if (n <= 8) return "hart";
  return "am Limit";
}

/* Kurzbeschreibung einer Einheit für Listen */
function einheitTitel(e) {
  const s = SPORTARTEN[e.sportart] || SPORTARTEN.sonstiges;
  let name = s.name;
  if (e.sportart === "sonstiges" && e.sonstigesName) name = e.sonstigesName;
  if (e.sportart === "basketball") {
    const art = { training: "Training", spiel: "Spiel", frei: "Freies Spiel" }[e.art];
    if (art) name += " · " + art;
  }
  return s.icon + " " + name;
}
