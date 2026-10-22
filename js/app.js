/* =========================================================
   APP – Start, Navigation und alle Klicks laufen hier zusammen
   ========================================================= */

let aktiverTab = "heute";

const SCREENS = {
  heute: zeichneHeute,
  tracken: zeichneTracken,
  training: zeichneTraining,
  essen: zeichneEssen,
  fortschritt: zeichneFortschritt
};

function zeige(tab) {
  aktiverTab = tab;
  document.getElementById("screen").innerHTML = SCREENS[tab]();
  document.querySelectorAll("#nav button").forEach(function (b) {
    b.classList.toggle("aktiv", b.dataset.tab === tab);
  });
}

/* Alle Klicks auf Elemente mit data-action */
document.addEventListener("click", function (ev) {
  const el = ev.target.closest("[data-action], #nav button");
  if (!el) return;

  if (el.dataset.tab && !el.dataset.action) { window.scrollTo(0, 0); zeige(el.dataset.tab); return; }

  const d = el.dataset;
  switch (d.action) {
    case "tab": window.scrollTo(0, 0); zeige(d.tab); break;

    case "setze": {   // Auswahl-Buttons im Eintrag
      entwurf[d.feld] = isNaN(Number(d.wert)) ? d.wert : Number(d.wert);
      zeige("tracken"); break;
    }
    case "uebung-waehlen": oeffneSheet(zeichneUebungsAuswahl()); break;
    case "uebung-nehmen":
      entwurf.uebungen.push({ uebungId: d.id, saetze: [{ wert: "", kg: "" }, { wert: "", kg: "" }, { wert: "", kg: "" }] });
      schliesseSheet(); zeige("tracken"); break;
    case "uebung-weg": entwurf.uebungen.splice(Number(d.ui), 1); zeige("tracken"); break;
    case "satz-neu": entwurf.uebungen[Number(d.ui)].saetze.push({ wert: "", kg: "" }); zeige("tracken"); break;
    case "satz-weg": entwurf.uebungen[Number(d.ui)].saetze.splice(Number(d.satz), 1); zeige("tracken"); break;
    case "uebung-info": oeffneSheet(zeichneUebungDetail(d.id)); break;

    case "speichern":
      if (speichereEntwurf()) { zeigeToast("Gespeichert ✓"); window.scrollTo(0, 0); zeige("heute"); }
      break;

    case "name-speichern": {
      const eingabe = document.getElementById("name-eingabe");
      if (eingabe && eingabe.value.trim()) { Speicher.setzeName(eingabe.value); zeigeToast("Gespeichert ✓"); zeige(aktiverTab); }
      else zeigeToast("Bitte einen Namen eintragen");
      break;
    }
    case "check": Speicher.setzeCheck(heuteText(), d.feld, Number(d.wert)); zeige("heute"); break;

    case "ansicht": trainingAnsicht = d.wert; zeige("training"); break;
    case "v-setze": {
      vorschlag[d.feld] = d.feld === "minuten" ? Number(d.wert) : d.wert;
      if (d.feld === "sportart") vorschlag.fokus = d.wert === "calisthenics" ? "auto" : "mix";
      vorschlag.plan = null; zeige("training"); break;
    }
    case "v-erstellen": vorschlag.plan = erstellePlan(vorschlag); zeige("training"); break;
    case "v-uebernehmen": uebernehmePlan(vorschlag.plan); window.scrollTo(0, 0); zeige("tracken"); zeigeToast("Übernommen: trage die Werte ein"); break;
    case "drill-info": oeffneSheet(zeichneDrillDetail(d.id)); break;

    case "essen-situation": essenSituation = d.wert; essenSeed++; zeige("essen"); break;
    case "essen-mehr": essenSeed++; zeige("essen"); break;
    case "idee-info": oeffneSheet(zeichneIdeeDetail(d.id)); break;
    case "portionen": essenPortionen = Number(d.wert); oeffneSheet(zeichneIdeeDetail(d.id)); break;

    case "filter": trainingFilter = d.wert; zeige("training"); break;
    case "sheet-zu": schliesseSheet(); break;

    case "einheit-weg":
      if (confirm("Diese Einheit löschen?")) { Speicher.einheitLoeschen(d.id); zeige("fortschritt"); }
      break;
    case "export": exportiere(); break;
    case "import": document.getElementById("import-datei").click(); break;
    case "alles-weg":
      if (confirm("Wirklich ALLE Daten löschen? Das geht nicht rückgängig.")) { Speicher.alleLoeschen(); zeige("fortschritt"); }
      break;
  }
});

/* Eingaben in Formularfeldern (ohne den Screen neu zu zeichnen, damit die Tastatur offen bleibt) */
document.addEventListener("input", function (ev) {
  const el = ev.target;
  if (el.dataset.feld) {
    entwurf[el.dataset.feld] = el.dataset.zahl ? Number(el.value) : el.value;
    if (el.dataset.live === "anstr") {
      document.getElementById("anstr-text").textContent = el.value + "/10 (" + anstrengungText(Number(el.value)) + ")";
    }
  }
  if (el.dataset.teil) {
    entwurf.uebungen[Number(el.dataset.ui)].saetze[Number(el.dataset.satz)][el.dataset.teil] = el.value;
  }
});

/* Sicherung einspielen (Datei gewählt) */
document.addEventListener("change", function (ev) {
  if (ev.target.id !== "import-datei") return;
  const datei = ev.target.files[0];
  if (!datei) return;
  const leser = new FileReader();
  leser.onload = function () {
    try {
      if (!confirm("Die aktuellen Daten werden durch die Sicherung ersetzt. Fortfahren?")) return;
      Speicher.importText(leser.result);
      zeigeToast("Sicherung eingespielt ✓"); zeige("fortschritt");
    } catch (e) { alert("Das hat nicht geklappt: " + e.message); }
  };
  leser.readAsText(datei);
});

function exportiere() {
  const blob = new Blob([Speicher.exportText()], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "fitapp-sicherung-" + heuteText() + ".json";
  document.body.appendChild(link); link.click(); link.remove();
}

/* Los geht’s */
zeige("heute");
