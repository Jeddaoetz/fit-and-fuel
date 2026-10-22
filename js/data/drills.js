/* =========================================================
   BASKETBALL-DRILLS (Startwerte)
   braucht : "korb" (Ball + Korb) | "ball" (nur Ball) | "nichts" (ohne Ball, auch zuhause)
   partner : "nein" (allein) | "ja" (Partner nötig)
   fokus   : wurf | ball | abschluss | athletik | spiel
   min     : ungefähre Dauer in Minuten
   ========================================================= */

const DRILL_FOKUS = {
  wurf:      { name: "Wurf",               icon: "🎯" },
  ball:      { name: "Ballhandling",       icon: "🏀" },
  abschluss: { name: "Abschlüsse",         icon: "🏃" },
  athletik:  { name: "Athletik & Fußarbeit", icon: "⚡" },
  spiel:     { name: "Spielformen",        icon: "🤝" }
};

const DRILLS = [
  { id: "form_shooting", name: "Form Shooting nah am Korb", fokus: "wurf", braucht: "korb", partner: "nein", min: 6,
    anleitung: ["Stell dich 1–2 m vor den Korb, eine Wurfhand.", "Ellbogen unter dem Ball, Wurf nur aus Ellbogen und Handgelenk.", "Beende jeden Wurf mit gestrecktem Arm und „hängender“ Hand.", "Je 5 Würfe aus 3 Positionen, dann etwas weiter weg."],
    ziel: "Ziel: 10 von 12 treffen, bevor du weiter weggehst.", tipp: "Gleiche Routine bei jedem Wurf: Füße, Ball, Blick auf den Ring." },
  { id: "five_spots", name: "5-Positionen-Wurf", fokus: "wurf", braucht: "korb", partner: "nein", min: 8,
    anleitung: ["Fünf Positionen im Halbkreis um den Korb markieren.", "Von jeder Position 5 Würfe, danach weiter.", "Treffer notieren, Rebound selbst holen und wieder zurück."],
    ziel: "Ziel: jede Woche 1–2 Treffer mehr als beim letzten Mal.", tipp: "Nach jedem Fehlwurf kurz überlegen: zu kurz, zu lang, links oder rechts?" },
  { id: "freiwuerfe", name: "Freiwürfe mit Puls", fokus: "wurf", braucht: "korb", partner: "nein", min: 6,
    anleitung: ["Vor jeder Serie 20 Sekunden hohe Knie oder Hampelmann, damit der Puls hoch ist.", "Dann 10 Freiwürfe mit immer gleicher Routine (2× prellen, tief atmen, werfen).", "Zwei Serien."],
    ziel: "Ziel: 7 von 10 oder besser, auch wenn du außer Atem bist.", tipp: "Im Spiel wirfst du auch müde, deshalb trainieren wir es so." },
  { id: "catch_shoot", name: "Catch & Shoot mit Partner", fokus: "wurf", braucht: "korb", partner: "ja", min: 8,
    anleitung: ["Partner passt, du stehst bereits in Wurfhaltung (Knie leicht gebeugt, Hände bereit).", "Ball fangen, Füße ausrichten, direkt werfen.", "4 Positionen × 5 Würfe, dann Wechsel."],
    ziel: "Ziel: schneller Wurf ohne Zwischenprellen.", tipp: "Hände schon vor dem Pass als Ziel anbieten." },
  { id: "figure8", name: "Achter durch die Beine", fokus: "ball", braucht: "ball", partner: "nein", min: 4,
    anleitung: ["Beine etwas breiter als schulterbreit, leicht in die Knie.", "Ball in Achtern um die Beine führen, 30 Sekunden.", "Erst langsam, dann schneller werden, Richtung wechseln.", "3 Runden mit 20 Sekunden Pause."],
    ziel: "Ziel: Blick nach vorn, nicht auf den Ball.", tipp: "Fingerspitzen statt Handfläche." },
  { id: "crossover_stand", name: "Crossover aus dem Stand", fokus: "ball", braucht: "ball", partner: "nein", min: 5,
    anleitung: ["Ball tief (unter Kniehöhe) schnell von Hand zu Hand prellen.", "4 × 30 Sekunden, dazwischen 20 Sekunden Pause.", "Variante: kurz tief, kurz hoch im Wechsel."],
    ziel: "Ziel: Ball bleibt tief, Kopf bleibt oben.", tipp: "Schnelle, kurze Bewegungen." },
  { id: "zigzag", name: "Zickzack-Dribbling", fokus: "ball", braucht: "ball", partner: "nein", min: 6,
    anleitung: ["5 Markierungen (Flaschen) im Abstand von ca. 2 m aufstellen.", "Dribble im Zickzack und wechsle an jeder Markierung die Technik (Crossover, durch die Beine, hinter dem Rücken).", "4 Durchgänge hin und zurück."],
    ziel: "Ziel: saubere Technik, dann Tempo erhöhen.", tipp: "Tief bleiben und aus den Beinen starten." },
  { id: "schwache_hand", name: "Schwache-Hand-Training", fokus: "ball", braucht: "ball", partner: "nein", min: 5,
    anleitung: ["Dribble nur mit deiner schwächeren Hand.", "Linie hin und zurück: erst langsam, dann Tempo, dann mit Richtungswechsel.", "6 Durchgänge."],
    ziel: "Ziel: gleiche Sicherheit wie mit der starken Hand.", tipp: "Kopf hoch und Ball seitlich vom Körper." },
  { id: "mikan", name: "Mikan-Drill", fokus: "abschluss", braucht: "korb", partner: "nein", min: 4,
    anleitung: ["Unter dem Korb starten.", "Abwechselnd links und rechts mit Brett-Layup abschließen, Ball vor dem nächsten Schritt fangen.", "Zwei Runden à 1 Minute."],
    ziel: "Ziel: möglichst viele Treffer in einer Minute, ohne den Rhythmus zu verlieren.", tipp: "Absprung vom Bein gegenüber der Wurfhand." },
  { id: "layups_tempo", name: "Layups beidseitig mit Tempo", fokus: "abschluss", braucht: "korb", partner: "nein", min: 6,
    anleitung: ["Starte an der Dreierlinie, 2–3 Dribblings, Layup.", "8 von rechts, 8 von links.", "Danach mit der schwächeren Hand abschließen."],
    ziel: "Ziel: gleiche Trefferquote auf beiden Seiten.", tipp: "Ball hoch ans Brett legen, nicht werfen." },
  { id: "euro_step", name: "Ausweichschritt-Abschlüsse", fokus: "abschluss", braucht: "korb", partner: "nein", min: 7,
    anleitung: ["Dribble Richtung Korb, stelle dir einen Verteidiger vor.", "Mache den ersten Schritt zur einen Seite, dann den zweiten Schritt in die andere Richtung.", "Schließe mit einem Layup ab.", "6 Wiederholungen pro Seite."],
    ziel: "Ziel: weiche Schritte, ruhiger Abschluss.", tipp: "Ball schützen und weit vom Verteidiger weg halten." },
  { id: "sprints", name: "Antritte (Sprints)", fokus: "athletik", braucht: "nichts", partner: "nein", min: 6,
    anleitung: ["Gut aufwärmen, vor allem Waden, Hüfte, Sprunggelenke.", "Starte aus der Basketball-Haltung (Knie gebeugt).", "6 × 10–15 m mit voller Geschwindigkeit.", "Zwischen den Antritten 45–60 Sekunden gehen oder locker traben."],
    ziel: "Ziel: jeder Antritt so schnell wie der erste.", tipp: "Erste Schritte kurz und kraftvoll." },
  { id: "spruenge_landung", name: "Sprünge mit weicher Landung", fokus: "athletik", braucht: "nichts", partner: "nein", min: 5,
    anleitung: ["Aus dem Stand in die Hocke, dann kraftvoll hochspringen.", "Weich auf den Fußballen landen, Knie federn und fallen nicht nach innen.", "3 Serien × 6 Sprünge, 60 Sekunden Pause."],
    ziel: "Ziel: leise landen, Position 2 Sekunden stabil halten.", tipp: "Qualität vor Höhe." },
  { id: "einbein_landung", name: "Einbein-Landung stabil", fokus: "athletik", braucht: "nichts", partner: "nein", min: 5,
    anleitung: ["Kleiner Sprung von einem Bein auf dasselbe Bein.", "Landung 3 Sekunden ruhig halten (Knie über Fuß).", "3 × 5 pro Bein."],
    ziel: "Ziel: kein Wackeln im Sprunggelenk.", tipp: "Gut zur Vorbeugung von Umknicken." },
  { id: "slides", name: "Defensive Slides", fokus: "athletik", braucht: "nichts", partner: "nein", min: 5,
    anleitung: ["Tiefe Verteidigungshaltung: Knie gebeugt, Brust aufrecht, Hände hoch.", "Seitwärts schieben, Füße nicht kreuzen.", "4 × 20 Sekunden, 30 Sekunden Pause."],
    ziel: "Ziel: Kopf bleibt auf gleicher Höhe, nicht auf und ab.", tipp: "Drücke dich mit dem hinteren Bein ab." },
  { id: "pivot", name: "Pivot & Passfinten", fokus: "athletik", braucht: "ball", partner: "nein", min: 5,
    anleitung: ["Halte den Ball, ein Standbein bleibt am Boden.", "Drehe dich vorwärts und rückwärts um das Standbein, Ball immer schützen.", "Wechsle zwischen Passfinten und Abschirmen.", "3 × 1 Minute."],
    ziel: "Ziel: nicht wandern (kein Schrittfehler).", tipp: "Körper zwischen Ball und Gegner halten." },
  { id: "wandpaesse", name: "Wandpässe", fokus: "athletik", braucht: "ball", partner: "nein", min: 5,
    anleitung: ["Stell dich ca. 3 m vor eine Wand.", "Brustpässe, dann Prellpässe gegen die Wand, Ball schnell wieder fangen.", "3 × 20 Pässe."],
    ziel: "Ziel: harte, genaue Pässe auf einen Punkt.", tipp: "Daumen zeigen nach unten beim Abwurf." },
  { id: "eins_gegen_eins", name: "1-gegen-1 bis 5", fokus: "spiel", braucht: "korb", partner: "ja", min: 10,
    anleitung: ["Spiel bis 5 Punkte, Ballwechsel nach jedem Korb.", "Fokus: ein Trick, den du gerade übst, einmal im Spiel anwenden.", "Danach Seitenwechsel oder neue Runde."],
    ziel: "Ziel: bewusst einen Move ausprobieren, nicht nur gewinnen.", tipp: "Fair spielen, kein Körperkontakt-Chaos." }
];

const DRILL_BRAUCHT = { nichts: 0, ball: 1, korb: 2 };

function findeDrill(id) {
  return DRILLS.find(function (d) { return d.id === id; });
}
