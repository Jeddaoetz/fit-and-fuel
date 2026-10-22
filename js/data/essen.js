/* =========================================================
   ERNÄHRUNG (Startwerte) – allgemeine Orientierung, keine Beratung
   Keine Kalorienziele, keine Gewichtsziele, keine Supplement-Empfehlungen.

   Zutaten sind pro 1 PORTION angegeben und werden in der App auf 1–4 Portionen umgerechnet.
   Zutat: { n: Name, pl: Mehrzahl (nur bei "Stk"), m: Menge pro Portion (null = nach Geschmack), e: Einheit }
   Einheiten: g, ml, EL, TL, Stk, Scheiben, Zehe
   ========================================================= */

/* Geprüfte Quellen (Stand: Oktober 2026) */
const ESSEN_QUELLEN = [
  { titel: "Ernährung für Sporttreibende, Institut für Ernährungsmedizin, TU München (Stand 2016)",
    url: "https://mri.tum.de/sites/default/files/2023-07/ernaehrung_fuer_sporttreibende.pdf",
    fuer: "Protein und Kohlenhydrate nach dem Training, Trinken, Hinweis zu Energydrinks" },
  { titel: "Bundesinstitut für Risikobewertung (BfR): Energy-Drinks bei Kindern und Jugendlichen",
    url: "https://www.bfr.bund.de/presseinformation/uebermaessiger-konsum-von-energy-drinks-erhoeht-gesundheitsrisiko-bei-kindern-und-jugendlichen/",
    fuer: "Energydrinks und Koffein" }
];

const SITUATIONEN = {
  fruehstueck: { name: "Frühstück", icon: "🌅",
    text: "Starte mit Kohlenhydraten und etwas Protein, dann hast du Energie für Schule und Training.",
    quelle: "Erfahrungswert" },
  vor:      { name: "Vor dem Training", icon: "⚡",
    text: "Iss etwas mit Kohlenhydraten und wenig Protein, das du gut verträgst und das nicht mehr schwer im Magen liegt. Viele planen dafür 1–3 Stunden ein. Kurz vorher höchstens einen kleinen, leichten Snack wie eine Banane. Nicht zu fettig oder ballaststoffreich.",
    quelle: "Erfahrungswert, nicht aus einer geprüften Quelle" },
  nach:     { name: "Nach dem Training", icon: "🔋",
    text: "Nach intensivem Training helfen 15–25 g Protein zusammen mit Kohlenhydraten, zum Beispiel ½ Liter Milch oder Kakao, ein Brötchen mit zwei Scheiben Käse oder 200 g Quark mit Früchten. Normales Essen reicht, Riegel und Shakes sind nicht nötig.",
    quelle: "TU München, Institut für Ernährungsmedizin" },
  spieltag: { name: "Spieltag", icon: "🏀",
    text: "Frühstück und Mittag mit Kohlenhydraten, eine Hauptmahlzeit (z. B. Nudeln oder Reis) mit genug Abstand zum Spiel, kurz vorher höchstens einen leichten Snack. Über den Tag genug trinken. Probiere vor einem Spiel nichts Neues aus.",
    quelle: "Erfahrungswert, nicht aus einer geprüften Quelle" },
  ruhetag:  { name: "Ruhetag", icon: "😴",
    text: "Iss normal weiter und nicht weniger. Gemüse, Protein und Vollkorn unterstützen die Erholung. Der Körper regeneriert genau jetzt.",
    quelle: "Erfahrungswert" },
  snack:    { name: "Snack / Unterwegs", icon: "🎒",
    text: "Praktisch für Schule und Wege: leicht zu transportieren, ohne Kühlschrank, sättigend.",
    quelle: "Erfahrungswert" }
};

const HYGIENE_FLEISCH = "Hähnchen immer vollständig durchgaren (innen kein rosa Fleisch mehr). Danach Hände, Brett und Messer mit heißem Wasser und Spülmittel waschen.";

const IDEEN = [
  { id: "oats_banane", titel: "Haferflocken mit Banane & Honig", anlass: ["fruehstueck", "vor"], zeit: 8, tags: ["vegetarisch"],
    zutaten: [
      { n: "Haferflocken (zart)", m: 50, e: "g" }, { n: "Milch oder Pflanzendrink", m: 200, e: "ml" },
      { n: "Banane", pl: "Bananen", m: 1, e: "Stk" }, { n: "Honig", m: 1, e: "TL" }, { n: "Zimt", m: null, e: "" } ],
    schritte: [
      "Haferflocken und Milch in einen Topf geben.",
      "Bei mittlerer Hitze 3–4 Minuten unter Rühren köcheln, bis der Brei cremig ist. Bei Bedarf einen Schuss Milch nachgießen.",
      "Banane in Scheiben schneiden und auf den Brei legen.",
      "Mit Honig und etwas Zimt abschließen."],
    tipp: "Ohne Kochen: Haferflocken mit kalter Milch 10 Minuten quellen lassen." },
  { id: "overnight", titel: "Overnight Oats mit Quark & Beeren", anlass: ["fruehstueck", "ruhetag", "snack"], zeit: 5, tags: ["vegetarisch", "proteinreich"],
    zutaten: [
      { n: "Haferflocken (zart)", m: 50, e: "g" }, { n: "Magerquark", m: 100, e: "g" }, { n: "Milch", m: 100, e: "ml" },
      { n: "Beeren (frisch oder TK)", m: 80, e: "g" }, { n: "Honig (optional)", m: 1, e: "TL" } ],
    schritte: [
      "Haferflocken, Quark und Milch in einem Glas oder einer Dose gut verrühren.",
      "Beeren darauf verteilen. TK-Beeren können direkt gefroren drauf, sie tauen über Nacht auf.",
      "Abdecken und mindestens 4 Stunden, am besten über Nacht, in den Kühlschrank stellen.",
      "Morgens umrühren und direkt essen."],
    tipp: "Hält sich im Kühlschrank 1–2 Tage. Du kannst gleich mehrere Gläser vorbereiten." },
  { id: "reiswaffeln", titel: "Reiswaffeln mit Erdnussmus & Banane", anlass: ["vor", "snack", "spieltag"], zeit: 3, tags: ["vegetarisch"],
    zutaten: [
      { n: "Reiswaffel", pl: "Reiswaffeln", m: 3, e: "Stk" }, { n: "Erdnussmus (ohne Zucker)", m: 1.5, e: "EL" },
      { n: "Banane", pl: "Bananen", m: 1, e: "Stk" } ],
    schritte: [
      "Erdnussmus dünn auf die Reiswaffeln streichen.",
      "Banane in Scheiben schneiden und auflegen."],
    tipp: "Leicht verdaulich. Bei Erdnussallergie anderes Mus oder Honig nehmen." },
  { id: "toast_ei", titel: "Vollkornbrot mit Spiegelei & Tomate", anlass: ["fruehstueck", "nach"], zeit: 10, tags: ["vegetarisch", "proteinreich"],
    zutaten: [
      { n: "Vollkornbrot", m: 2, e: "Scheiben" }, { n: "Ei", pl: "Eier", m: 2, e: "Stk" },
      { n: "Tomate", pl: "Tomaten", m: 1, e: "Stk" }, { n: "Öl oder Butter", m: 1, e: "TL" }, { n: "Salz und Pfeffer", m: null, e: "" } ],
    schritte: [
      "Öl oder Butter in einer Pfanne bei mittlerer Hitze erwärmen.",
      "Eier vorsichtig aufschlagen und hineingleiten lassen. 3–4 Minuten braten, bis das Eiweiß fest ist.",
      "Währenddessen das Brot toasten und die Tomate in Scheiben schneiden.",
      "Brot mit Tomate und Eiern belegen, mit Salz und Pfeffer würzen."],
    tipp: "Für 3–4 Portionen die Eier in zwei Durchgängen braten, damit sie in der Pfanne nicht zusammenkleben." },
  { id: "nudeln_haehnchen", titel: "Nudeln mit Tomatensoße & Hähnchen", anlass: ["spieltag", "nach", "vor"], zeit: 30, tags: ["proteinreich"],
    zutaten: [
      { n: "Nudeln (Vollkorn oder normal)", m: 90, e: "g" }, { n: "Hähnchenbrust", m: 130, e: "g" },
      { n: "Passierte Tomaten", m: 150, e: "ml" }, { n: "Zwiebel", pl: "Zwiebeln", m: 0.5, e: "Stk" },
      { n: "Knoblauch", m: 0.5, e: "Zehe" }, { n: "Öl", m: 1, e: "EL" }, { n: "Oregano (getrocknet)", m: 0.5, e: "TL" },
      { n: "Salz und Pfeffer", m: null, e: "" } ],
    schritte: [
      "Einen großen Topf mit Wasser aufsetzen (ca. 1 Liter pro 100 g Nudeln), salzen und zum Kochen bringen.",
      "Zwiebel und Knoblauch fein würfeln. Hähnchen in dünne Streifen schneiden.",
      "Öl in einer großen Pfanne bei mittlerer bis hoher Hitze erhitzen. Hähnchen 6–8 Minuten rundum braten, bis es durchgegart ist.",
      "Zwiebel und Knoblauch 2 Minuten mitbraten. Passierte Tomaten und Oregano dazugeben, 8–10 Minuten leicht köcheln lassen, mit Salz und Pfeffer abschmecken.",
      "Währenddessen die Nudeln nach Packungsangabe (meist 8–10 Minuten) bissfest kochen und abgießen.",
      "Nudeln unter die Soße mischen und servieren."],
    hinweis: HYGIENE_FLEISCH,
    tipp: "Etwas Nudelwasser macht die Soße cremiger. Für 4 Portionen die Soße in einer großen Pfanne oder einem Topf zubereiten." },
  { id: "quark_obst", titel: "Quark mit Obst & Haferflocken", anlass: ["nach", "snack", "ruhetag"], zeit: 5, tags: ["vegetarisch", "proteinreich"],
    zutaten: [
      { n: "Magerquark", m: 200, e: "g" }, { n: "Milch", m: 2, e: "EL" }, { n: "Obst (Banane, Beeren oder Apfel)", m: 150, e: "g" },
      { n: "Haferflocken", m: 2, e: "EL" }, { n: "Honig (optional)", m: 1, e: "TL" } ],
    schritte: [
      "Quark mit der Milch in einer Schüssel glatt rühren.",
      "Obst waschen und klein schneiden.",
      "Obst und Haferflocken auf den Quark geben, nach Wunsch mit Honig süßen."],
    tipp: "Schnell gemacht und proteinreich, gut nach dem Training." },
  { id: "wrap", titel: "Wrap mit Hähnchen & Gemüse", anlass: ["nach", "snack", "ruhetag"], zeit: 20, tags: ["proteinreich"],
    zutaten: [
      { n: "Vollkorn-Tortilla", pl: "Vollkorn-Tortillas", m: 2, e: "Stk" }, { n: "Hähnchenbrust", m: 120, e: "g" },
      { n: "Frischkäse", m: 30, e: "g" }, { n: "Salat", m: 40, e: "g" }, { n: "Gurke", m: 80, e: "g" },
      { n: "Paprika", m: 60, e: "g" }, { n: "Öl", m: 1, e: "TL" }, { n: "Salz, Pfeffer, Paprikapulver", m: null, e: "" } ],
    schritte: [
      "Hähnchen in dünne Streifen schneiden und mit Salz, Pfeffer und Paprikapulver würzen.",
      "Öl in einer Pfanne bei mittlerer bis hoher Hitze erhitzen und das Hähnchen 6–8 Minuten braten, bis es durchgegart ist. Kurz abkühlen lassen.",
      "Gurke und Paprika in Streifen schneiden, Salat waschen und trocknen.",
      "Tortillas dünn mit Frischkäse bestreichen, Salat, Gemüse und Hähnchen darauf verteilen.",
      "Seiten einklappen und eng einrollen, bei Bedarf halbieren."],
    hinweis: HYGIENE_FLEISCH,
    tipp: "In Backpapier oder Folie gewickelt gut zum Mitnehmen." },
  { id: "reispfanne", titel: "Reis-Gemüse-Pfanne mit Ei", anlass: ["nach", "ruhetag", "spieltag"], zeit: 25, tags: ["vegetarisch", "proteinreich"],
    zutaten: [
      { n: "Reis (roh, Langkorn)", m: 70, e: "g" }, { n: "Wasser für den Reis", m: 140, e: "ml" },
      { n: "TK-Gemüse", m: 150, e: "g" }, { n: "Ei", pl: "Eier", m: 2, e: "Stk" },
      { n: "Öl", m: 1, e: "EL" }, { n: "Sojasoße", m: 1, e: "EL" } ],
    schritte: [
      "Reis in einem Topf mit der doppelten Menge Wasser (Reis : Wasser = 1 : 2) und einer Prise Salz aufkochen. Deckel drauf, auf kleinster Stufe 12–15 Minuten quellen lassen, dann 5 Minuten ohne Hitze stehen lassen.",
      "Öl in einer großen Pfanne bei mittlerer Hitze erhitzen. TK-Gemüse 5–6 Minuten braten.",
      "Reis zum Gemüse geben und 2 Minuten mitbraten.",
      "Reis und Gemüse an den Rand schieben, Eier in die Mitte schlagen und unter Rühren 2–3 Minuten stocken lassen, dann alles vermischen.",
      "Mit Sojasoße abschmecken."],
    tipp: "Mit gekochtem Reis vom Vortag geht es noch schneller: ca. 150 g gekochter Reis pro Portion statt rohem Reis." },
  { id: "nudelsalat", titel: "Nudelsalat mit Thunfisch & Mais", anlass: ["snack", "nach"], zeit: 25, tags: ["proteinreich"],
    zutaten: [
      { n: "Nudeln", m: 80, e: "g" }, { n: "Thunfisch (Dose, abgetropft)", m: 60, e: "g" }, { n: "Mais (Dose, abgetropft)", m: 50, e: "g" },
      { n: "Paprika", m: 60, e: "g" }, { n: "Gurke", m: 60, e: "g" }, { n: "Naturjoghurt", m: 3, e: "EL" },
      { n: "Zitronensaft oder Essig", m: 1, e: "TL" }, { n: "Salz und Pfeffer", m: null, e: "" } ],
    schritte: [
      "Nudeln in Salzwasser nach Packungsangabe kochen, abgießen und kalt abspülen.",
      "Paprika und Gurke klein würfeln. Thunfisch und Mais abtropfen lassen.",
      "Joghurt mit Zitronensaft, Salz und Pfeffer zu einem Dressing verrühren.",
      "Alles in einer Schüssel mischen und mindestens 15 Minuten durchziehen lassen."],
    tipp: "Im Kühlschrank 1–2 Tage haltbar. Zum Mitnehmen in eine verschlossene Dose und kühl halten." },
  { id: "kartoffel_quark", titel: "Pellkartoffeln mit Kräuterquark & Ei", anlass: ["ruhetag", "nach"], zeit: 30, tags: ["vegetarisch", "proteinreich"],
    zutaten: [
      { n: "Kartoffeln (festkochend, mittelgroß)", m: 300, e: "g" }, { n: "Magerquark", m: 150, e: "g" },
      { n: "Ei", pl: "Eier", m: 1, e: "Stk" }, { n: "Milch", m: 1, e: "EL" },
      { n: "Schnittlauch oder Kräuter", m: 1, e: "EL" }, { n: "Salz und Pfeffer", m: null, e: "" } ],
    schritte: [
      "Kartoffeln gründlich waschen und ungeschält in einen Topf geben. Mit kaltem Wasser bedecken, salzen und aufkochen.",
      "Bei mittlerer Hitze 20–25 Minuten kochen, bis eine Gabel leicht eindringt.",
      "Parallel die Eier in einem kleinen Topf 9–10 Minuten hart kochen und kalt abschrecken.",
      "Quark mit Milch, Kräutern, Salz und Pfeffer verrühren.",
      "Kartoffeln und Eier pellen und mit dem Kräuterquark servieren."],
    tipp: "Ein Klassiker, der satt macht und viel Eiweiß liefert." },
  { id: "kakao_banane", titel: "Kakao-Milch & Banane", anlass: ["nach", "snack"], zeit: 3, tags: ["vegetarisch"],
    zutaten: [
      { n: "Milch", m: 300, e: "ml" }, { n: "Kakaopulver (ungesüßt)", m: 1, e: "EL" },
      { n: "Honig (optional)", m: 1, e: "TL" }, { n: "Banane", pl: "Bananen", m: 1, e: "Stk" } ],
    schritte: [
      "Kakao mit einem Schluck Milch zu einer glatten Paste verrühren, damit es keine Klümpchen gibt.",
      "Restliche Milch zugießen und gut verrühren. Nach Wunsch kalt trinken oder erwärmen und mit Honig süßen.",
      "Die Banane dazu essen."],
    tipp: "Milch oder Kakao nennt auch die TU München als Beispiel für Protein plus Kohlenhydrate nach dem Training." },
  { id: "chili", titel: "Bohnen-Linsen-Chili", anlass: ["ruhetag", "nach"], zeit: 35, tags: ["vegetarisch", "proteinreich"],
    zutaten: [
      { n: "Rote Linsen", m: 40, e: "g" }, { n: "Kidneybohnen (Dose, abgetropft)", m: 100, e: "g" }, { n: "Mais (Dose, abgetropft)", m: 50, e: "g" },
      { n: "Gehackte Tomaten (Dose)", m: 150, e: "g" }, { n: "Paprika", m: 80, e: "g" }, { n: "Zwiebel", pl: "Zwiebeln", m: 0.5, e: "Stk" },
      { n: "Knoblauch", m: 0.5, e: "Zehe" }, { n: "Öl", m: 1, e: "EL" }, { n: "Wasser oder Gemüsebrühe", m: 150, e: "ml" },
      { n: "Kreuzkümmel", m: 0.5, e: "TL" }, { n: "Paprikapulver", m: 0.5, e: "TL" }, { n: "Chili, Salz, Pfeffer", m: null, e: "" } ],
    schritte: [
      "Zwiebel, Knoblauch und Paprika klein würfeln. Bohnen und Mais in einem Sieb abspülen und abtropfen lassen. Linsen kurz abspülen.",
      "Öl in einem großen Topf bei mittlerer Hitze erhitzen. Zwiebel, Knoblauch und Paprika 4–5 Minuten anbraten.",
      "Gewürze kurz mitrösten (ca. 30 Sekunden), dann Tomaten, Wasser oder Brühe und Linsen zugeben.",
      "Aufkochen und zugedeckt 15 Minuten köcheln lassen, dabei gelegentlich umrühren. Wenn es zu dick wird, etwas Wasser nachgießen.",
      "Bohnen und Mais zugeben und weitere 5 Minuten erhitzen. Mit Salz, Pfeffer und Chili abschmecken.",
      "Mit Reis oder Brot servieren."],
    hinweis: "Nur gegarte Bohnen aus der Dose oder dem Glas verwenden. Rohe Kidneybohnen sind ungenießbar.",
    tipp: "Lässt sich gut in größeren Mengen kochen und portionsweise einfrieren." },
  { id: "brot_snack", titel: "Käse- oder Putenbrot mit Gemüsesticks", anlass: ["snack"], zeit: 5, tags: ["proteinreich"],
    zutaten: [
      { n: "Vollkornbrot", m: 2, e: "Scheiben" }, { n: "Käse oder Putenbrust (Aufschnitt)", m: 40, e: "g" },
      { n: "Frischkäse (optional)", m: 1, e: "EL" }, { n: "Gurke", m: 80, e: "g" }, { n: "Paprika", m: 60, e: "g" }, { n: "Karotte", pl: "Karotten", m: 0.5, e: "Stk" } ],
    schritte: [
      "Brot nach Wunsch mit Frischkäse bestreichen und mit Käse oder Pute belegen.",
      "Gurke, Paprika und Karotte waschen und in Stifte schneiden.",
      "Alles in eine Brotdose packen."],
    tipp: "Passt in jede Brotdose. Bei warmem Wetter kühl halten." },
  { id: "mix_apfel", titel: "Apfel mit Nüssen & Trockenobst", anlass: ["snack", "vor"], zeit: 3, tags: ["vegetarisch"],
    zutaten: [ { n: "Apfel", pl: "Äpfel", m: 1, e: "Stk" }, { n: "Nüsse (ungesalzen)", m: 20, e: "g" }, { n: "Trockenobst (z. B. Rosinen, Datteln)", m: 20, e: "g" } ],
    schritte: [
      "Apfel waschen und in Spalten schneiden.",
      "Zusammen mit den Nüssen und dem Trockenobst essen oder in einer Dose mitnehmen."],
    tipp: "Nüsse in kleinen Mengen. Bei Nussallergie weglassen und durch Haferkekse oder Reiswaffeln ersetzen." },
  { id: "joghurt_muesli", titel: "Joghurt mit Müsli & Obst", anlass: ["fruehstueck", "snack"], zeit: 3, tags: ["vegetarisch"],
    zutaten: [
      { n: "Naturjoghurt", m: 200, e: "g" }, { n: "Müsli (ohne viel Zucker)", m: 40, e: "g" },
      { n: "Obst nach Wahl", m: 100, e: "g" }, { n: "Honig (optional)", m: 1, e: "TL" } ],
    schritte: [
      "Joghurt in eine Schale geben.",
      "Obst waschen und klein schneiden.",
      "Müsli und Obst darauf verteilen, nach Wunsch mit Honig süßen."],
    tipp: "Frisches Obst macht es süß genug." },
  { id: "pfannkuchen", titel: "Bananen-Haferflocken-Pfannkuchen", anlass: ["fruehstueck", "spieltag", "vor"], zeit: 20, tags: ["vegetarisch"],
    zutaten: [
      { n: "Banane (reif)", pl: "Bananen (reif)", m: 1, e: "Stk" }, { n: "Ei", pl: "Eier", m: 2, e: "Stk" },
      { n: "Haferflocken (zart)", m: 40, e: "g" }, { n: "Öl zum Braten", m: 1, e: "TL" }, { n: "Zimt", m: null, e: "" } ],
    schritte: [
      "Banane in einer Schüssel mit einer Gabel fein zerdrücken.",
      "Eier, Haferflocken und etwas Zimt zugeben und zu einem Teig verrühren. 5 Minuten quellen lassen.",
      "Etwas Öl in einer Pfanne bei mittlerer Hitze erhitzen. Pro Pfannkuchen 2–3 Esslöffel Teig hineingeben.",
      "Je 2–3 Minuten pro Seite backen, bis sie goldgelb sind. Vorsichtig wenden, sie sind weich.",
      "Warm servieren, z. B. mit Beeren oder etwas Honig."],
    tipp: "Für 3–4 Portionen in mehreren Durchgängen backen und im Ofen bei ca. 80 °C warm halten." },
  { id: "reis_haehnchen", titel: "Reis mit Hähnchen & Brokkoli", anlass: ["spieltag", "nach", "ruhetag"], zeit: 30, tags: ["proteinreich"],
    zutaten: [
      { n: "Reis (roh, Langkorn)", m: 75, e: "g" }, { n: "Wasser für den Reis", m: 150, e: "ml" },
      { n: "Hähnchenbrust", m: 130, e: "g" }, { n: "Brokkoli", m: 150, e: "g" },
      { n: "Öl", m: 1, e: "EL" }, { n: "Sojasoße", m: 1, e: "EL" }, { n: "Pfeffer", m: null, e: "" } ],
    schritte: [
      "Reis mit der doppelten Menge Wasser und einer Prise Salz aufkochen. Deckel drauf, auf kleinster Stufe 12–15 Minuten quellen lassen, dann 5 Minuten ohne Hitze stehen lassen.",
      "Brokkoli in kleine Röschen teilen. Hähnchen in dünne Streifen schneiden.",
      "Öl in einer Pfanne bei mittlerer bis hoher Hitze erhitzen, Hähnchen 6–8 Minuten rundum braten, bis es durchgegart ist.",
      "Brokkoli und 3 Esslöffel Wasser zugeben, Deckel drauf und 4–5 Minuten garen, bis er bissfest ist.",
      "Mit Sojasoße und Pfeffer würzen und mit dem Reis servieren."],
    hinweis: HYGIENE_FLEISCH,
    tipp: "Einfach, sättigend und gut vorzubereiten." },
  { id: "gemuesesuppe", titel: "Gemüsesuppe mit Brot", anlass: ["ruhetag"], zeit: 35, tags: ["vegetarisch"],
    zutaten: [
      { n: "Kartoffeln", m: 100, e: "g" }, { n: "Möhren", m: 100, e: "g" }, { n: "Lauch", m: 60, e: "g" },
      { n: "Öl", m: 1, e: "TL" }, { n: "Wasser", m: 350, e: "ml" }, { n: "Gemüsebrühe (Pulver)", m: 1, e: "TL" },
      { n: "Vollkornbrot", m: 2, e: "Scheiben" }, { n: "Salz, Pfeffer, Petersilie", m: null, e: "" } ],
    schritte: [
      "Möhren und Kartoffeln schälen und in kleine Würfel schneiden. Lauch waschen und in Ringe schneiden.",
      "Öl in einem Topf erhitzen, Lauch 2 Minuten bei mittlerer Hitze anschwitzen.",
      "Möhren, Kartoffeln, Wasser und Brühepulver zugeben und aufkochen.",
      "Zugedeckt 15–20 Minuten köcheln lassen, bis das Gemüse weich ist.",
      "Mit Salz, Pfeffer und Petersilie abschmecken und mit dem Brot servieren."],
    tipp: "Mit etwas Linsen oder Nudeln wird sie noch sättigender." },
  { id: "ruehrei", titel: "Rührei mit Vollkornbrot", anlass: ["fruehstueck", "nach"], zeit: 10, tags: ["vegetarisch", "proteinreich"],
    zutaten: [
      { n: "Ei", pl: "Eier", m: 3, e: "Stk" }, { n: "Milch", m: 1, e: "EL" }, { n: "Vollkornbrot", m: 2, e: "Scheiben" },
      { n: "Tomate", pl: "Tomaten", m: 1, e: "Stk" }, { n: "Butter oder Öl", m: 1, e: "TL" },
      { n: "Schnittlauch", m: 1, e: "TL" }, { n: "Salz und Pfeffer", m: null, e: "" } ],
    schritte: [
      "Eier mit Milch, Salz und Pfeffer in einer Schüssel verquirlen.",
      "Butter oder Öl in einer Pfanne bei mittlerer Hitze erwärmen.",
      "Eimasse hineingeben und bei niedriger bis mittlerer Hitze mit einem Pfannenwender langsam rühren, 2–3 Minuten, bis sie cremig gestockt ist.",
      "Mit Schnittlauch bestreuen und mit Brot und Tomate servieren."],
    tipp: "Nicht zu heiß braten, dann bleibt das Rührei schön weich." },
  { id: "smoothie", titel: "Smoothie: Banane, Joghurt, Haferflocken & Beeren", anlass: ["nach", "snack", "fruehstueck"], zeit: 5, tags: ["vegetarisch"],
    zutaten: [
      { n: "Banane", pl: "Bananen", m: 1, e: "Stk" }, { n: "Naturjoghurt", m: 150, e: "g" }, { n: "Milch", m: 100, e: "ml" },
      { n: "Haferflocken", m: 30, e: "g" }, { n: "Beeren (frisch oder TK)", m: 80, e: "g" } ],
    schritte: [
      "Banane in Stücke brechen und mit allen anderen Zutaten in einen Mixer oder hohen Becher geben.",
      "30–60 Sekunden fein pürieren. Bei Bedarf einen Schuss Milch ergänzen.",
      "Direkt trinken."],
    tipp: "Gut, wenn nach dem Training wenig Hunger da ist. Mit TK-Beeren wird er schön kalt." }
];

function findeIdee(id) {
  return IDEEN.find(function (i) { return i.id === id; });
}

/* Menge für n Portionen schön formatieren, z. B. "1½ EL", "250 g", "1,2 kg" */
function formatZutat(z, portionen) {
  if (z.m === null || z.m === undefined) return z.n + " (nach Geschmack)";
  const roh = z.m * portionen;

  function halbe(x) {                       // auf halbe Einheiten runden, mindestens ½
    const r = Math.max(0.5, Math.round(x * 2) / 2);
    const ganz = Math.floor(r);
    return ganz === 0 ? "½" : (r % 1 ? ganz + "½" : String(ganz));
  }

  if (z.e === "g") {
    const g = roh < 30 ? Math.round(roh) : Math.round(roh / 5) * 5;
    return (g >= 1000 ? String(g / 1000).replace(".", ",") + " kg " : g + " g ") + z.n;
  }
  if (z.e === "ml") {
    const ml = roh < 30 ? Math.round(roh) : Math.round(roh / 5) * 5;
    return (ml >= 1000 ? String(ml / 1000).replace(".", ",") + " l " : ml + " ml ") + z.n;
  }
  if (z.e === "EL" || z.e === "TL") return halbe(roh) + " " + z.e + " " + z.n;
  if (z.e === "Zehe") { const t = halbe(roh); return t + (t === "1" || t === "½" ? " Zehe " : " Zehen ") + z.n; }
  if (z.e === "Scheiben") { const t = halbe(roh); return t + (t === "1" ? " Scheibe " : " Scheiben ") + z.n; }
  if (z.e === "Stk") { const t = halbe(roh); return t + " " + (t === "1" ? z.n : (z.pl || z.n)); }
  return roh + " " + z.e + " " + z.n;
}
