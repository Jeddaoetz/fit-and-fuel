/* =========================================================
   SCREEN: EINTRAGEN – Basketball, Calisthenics, Sonstiges
   "entwurf" ist die Einheit, die du gerade ausfüllst.
   ========================================================= */

let entwurf = neuerEntwurf();

function neuerEntwurf() {
  return { datum: heuteText(), sportart: "basketball", art: "training", quelle: "trainer",
           sonstigesName: "", dauer: 60, anstrengung: 6, notiz: "", uebungen: [] };
}

function wahl(feld, wert, text) {
  const aktiv = entwurf[feld] === wert ? " aktiv" : "";
  return '<button class="chip' + aktiv + '" data-action="setze" data-feld="' + feld + '" data-wert="' + wert + '">' + text + "</button>";
}

function zeichneTracken() {
  let h = "<h1>Einheit eintragen</h1>";

  h += "<label>Sportart</label><div class=\"gruppe\">";
  Object.keys(SPORTARTEN).forEach(function (k) { h += wahl("sportart", k, SPORTARTEN[k].icon + " " + SPORTARTEN[k].name); });
  h += "</div>";

  if (entwurf.sportart === "basketball") {
    h += "<label>Art</label><div class=\"gruppe\">" + wahl("art", "training", "Training") + wahl("art", "spiel", "Spiel") + wahl("art", "frei", "Freies Spiel") + "</div>";
    h += "<label>Wer gibt vor?</label><div class=\"gruppe\">" + wahl("quelle", "trainer", "Trainer") + wahl("quelle", "selbst", "Wir selbst") + "</div>";
  }
  if (entwurf.sportart === "sonstiges") {
    h += '<label>Was hast du gemacht?</label><input type="text" data-feld="sonstigesName" value="' + esc(entwurf.sonstigesName) + '" placeholder="z. B. Joggen, Schwimmen">';
  }

  h += '<label>Datum</label><input type="date" data-feld="datum" value="' + esc(entwurf.datum) + '" max="' + heuteText() + '">';

  h += "<label>Dauer (Minuten)</label><div class=\"gruppe\">";
  [30, 45, 60, 90].forEach(function (m) { h += wahl("dauer", m, m + ""); });
  h += '</div><input type="number" inputmode="numeric" min="1" max="300" data-feld="dauer" data-zahl="1" value="' + entwurf.dauer + '">';

  h += '<label>Anstrengung: <span id="anstr-text">' + entwurf.anstrengung + "/10 (" + anstrengungText(entwurf.anstrengung) + ")</span></label>" +
       '<input type="range" min="1" max="10" data-feld="anstrengung" data-zahl="1" data-live="anstr" value="' + entwurf.anstrengung + '">';

  if (entwurf.sportart === "calisthenics") h += zeichneUebungsListe();

  h += '<label>Notiz (optional)</label><textarea data-feld="notiz" placeholder="Wie war es? Was lief gut?">' + esc(entwurf.notiz) + "</textarea>";
  h += '<button class="btn" data-action="speichern">Speichern</button>';
  return h;
}

function zeichneUebungsListe() {
  let h = "<h2>Übungen</h2>";
  entwurf.uebungen.forEach(function (eintrag, ui) {
    const u = findeUebung(eintrag.uebungId);
    const einheit = u.messart === "sek" ? "Sek." : "Wdh.";
    h += '<div class="karte"><div class="zeile"><b>' + esc(u.name) + '</b><button class="btn klein zweit" data-action="uebung-weg" data-ui="' + ui + '">Entfernen</button></div>';
    eintrag.saetze.forEach(function (s, si) {
      h += '<div class="satz"><span class="leise">' + (si + 1) + '</span>' +
        '<input type="number" inputmode="numeric" min="0" placeholder="' + einheit + '" data-ui="' + ui + '" data-satz="' + si + '" data-teil="wert" value="' + (s.wert === "" ? "" : s.wert) + '">' +
        '<input type="number" inputmode="decimal" min="0" step="0.5" placeholder="+ kg" data-ui="' + ui + '" data-satz="' + si + '" data-teil="kg" value="' + (s.kg === "" ? "" : s.kg) + '">' +
        '<button class="x" data-action="satz-weg" data-ui="' + ui + '" data-satz="' + si + '" aria-label="Satz löschen">✕</button></div>';
    });
    h += '<button class="btn klein zweit" data-action="satz-neu" data-ui="' + ui + '">+ Satz</button>';
    h += '<button class="btn klein zweit" style="margin-left:8px" data-action="uebung-info" data-id="' + u.id + '">Anleitung</button></div>';
  });
  h += '<button class="btn zweit" data-action="uebung-waehlen">+ Übung hinzufügen</button>';
  return h;
}

function zeichneUebungsAuswahl() {
  let h = "<h2>Übung wählen</h2>";
  Object.keys(KATEGORIEN).forEach(function (k) {
    const liste = UEBUNGEN.filter(function (u) { return u.kategorie === k; });
    if (!liste.length) return;
    h += '<p class="leise" style="margin-top:14px">' + KATEGORIEN[k].icon + " " + KATEGORIEN[k].name + "</p>";
    liste.forEach(function (u) {
      h += '<div class="karte klick" data-action="uebung-nehmen" data-id="' + u.id + '">' + esc(u.name) + "</div>";
    });
  });
  return h;
}

/* Beim Speichern prüfen und aufräumen */
function speichereEntwurf() {
  const dauer = Number(entwurf.dauer);
  if (!dauer || dauer < 1) { zeigeToast("Bitte eine Dauer eintragen"); return false; }
  if (!entwurf.datum) { zeigeToast("Bitte ein Datum wählen"); return false; }

  const einheit = {
    datum: entwurf.datum, sportart: entwurf.sportart, dauer: dauer,
    anstrengung: Number(entwurf.anstrengung), notiz: entwurf.notiz.trim()
  };
  if (entwurf.sportart === "basketball") { einheit.art = entwurf.art; einheit.quelle = entwurf.quelle; }
  if (entwurf.sportart === "sonstiges") einheit.sonstigesName = entwurf.sonstigesName.trim();
  if (entwurf.sportart === "calisthenics") {
    einheit.uebungen = entwurf.uebungen.map(function (eintrag) {
      return {
        uebungId: eintrag.uebungId,
        saetze: eintrag.saetze
          .filter(function (s) { return s.wert !== "" && Number(s.wert) > 0; })
          .map(function (s) { return { wert: Number(s.wert), kg: s.kg === "" ? 0 : Number(s.kg) }; })
      };
    }).filter(function (eintrag) { return eintrag.saetze.length > 0; });
  }
  Speicher.einheitHinzufuegen(einheit);
  entwurf = neuerEntwurf();
  return true;
}
