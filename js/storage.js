/* =========================================================
   SPEICHER – alles, was gespeichert oder geladen wird, passiert NUR hier.
   Die Daten liegen im localStorage deines Browsers (nur auf diesem Gerät!).
   ========================================================= */

const Speicher = (function () {
  const SCHLUESSEL = "fitapp.daten";
  let speichernKlappt = true;

  function leer() { return { schemaVersion: 1, einheiten: [], profil: { name: "" }, checks: {} }; }

  /* Fehlende Teile ergänzen (z. B. bei Daten aus älteren Versionen) */
  function ergaenze(d) {
    if (!d.profil || typeof d.profil !== "object") d.profil = { name: "" };
    if (!d.checks || typeof d.checks !== "object") d.checks = {};
    return d;
  }

  function laden() {
    try {
      const roh = localStorage.getItem(SCHLUESSEL);
      if (!roh) return leer();
      const d = JSON.parse(roh);
      if (!d || !Array.isArray(d.einheiten)) return leer();
      return ergaenze(d);
    } catch (e) {
      speichernKlappt = false;
      return leer();
    }
  }

  let daten = laden();

  function sichern() {
    try {
      localStorage.setItem(SCHLUESSEL, JSON.stringify(daten));
    } catch (e) {
      speichernKlappt = false;
    }
  }

  function neueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  return {
    alleEinheiten: function () {
      // neueste zuerst
      return daten.einheiten.slice().sort(function (a, b) {
        return a.datum < b.datum ? 1 : a.datum > b.datum ? -1 : (b.erstellt || 0) - (a.erstellt || 0);
      });
    },
    einheitHinzufuegen: function (einheit) {
      einheit.id = neueId();
      einheit.erstellt = Date.now();
      daten.einheiten.push(einheit);
      sichern();
    },
    einheitLoeschen: function (id) {
      daten.einheiten = daten.einheiten.filter(function (e) { return e.id !== id; });
      sichern();
    },
    alleLoeschen: function () {
      daten = leer();
      sichern();
    },
    exportText: function () { return JSON.stringify(daten, null, 2); },
    importText: function (text) {
      const d = JSON.parse(text);
      if (!d || !Array.isArray(d.einheiten)) throw new Error("Datei passt nicht zur App");
      daten = ergaenze(d);
      sichern();
    },
    name: function () { return daten.profil.name || ""; },
    setzeName: function (n) { daten.profil.name = String(n || "").trim().slice(0, 30); sichern(); },
    check: function (datum) { return daten.checks[datum] || {}; },
    setzeCheck: function (datum, feld, wert) {
      daten.checks[datum] = daten.checks[datum] || {};
      daten.checks[datum][feld] = wert;
      sichern();
    },
    klappt: function () { return speichernKlappt; }
  };
})();
