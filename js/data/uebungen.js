/* =========================================================
   ÜBUNGSKATALOG (Startwerte)
   Jede Übung ist ein "Objekt" mit diesen Feldern:
   id       – eindeutiger Name ohne Leerzeichen (wird gespeichert, nie ändern!)
   name     – so heißt die Übung in der App
   kategorie– push | pull | beine | core | skill
   messart  – "wdh" (Wiederholungen) oder "sek" (Haltezeit in Sekunden)
   muskeln  – kurze Liste
   anleitung– Schritte
   tipps / fehler – Listen
   hinweis  – optionaler Sicherheitshinweis
   Neue Übung = einfach einen Block kopieren und anpassen.
   ========================================================= */

const KATEGORIEN = {
  push:  { name: "Push",  icon: "🫸" },
  pull:  { name: "Pull",  icon: "🧗" },
  beine: { name: "Beine", icon: "🦵" },
  core:  { name: "Core",  icon: "🎯" },
  skill: { name: "Skills", icon: "⭐" }
};

const SPORTARTEN = {
  basketball:  { name: "Basketball",  icon: "🏀" },
  calisthenics:{ name: "Calisthenics", icon: "💪" },
  sonstiges:   { name: "Sonstiges",   icon: "🏃" }
};

const UEBUNGEN = [
  {
    id: "liegestuetze", name: "Liegestütze", kategorie: "push", messart: "wdh",
    muskeln: "Brust, Schultern, Trizeps, Körpermitte",
    anleitung: [
      "Hände etwa schulterbreit auf den Boden, Finger nach vorn, Schultern direkt über den Händen.",
      "Körper bildet eine gerade Linie von Kopf bis Ferse (Rumpf, Po und Oberschenkel anspannen).",
      "Senke den Körper kontrolliert ab, bis Brust oder Kinn fast den Boden berühren. Die Ellbogen dürfen dabei leicht nach außen zeigen.",
      "Drücke dich hoch, bis die Arme ganz gestreckt sind."
    ],
    tipps: ["Ellbogen eng am Körper beansprucht den Trizeps stärker und ist oft schulterfreundlicher.", "Drücke über Ferse und Außenkante der Handfläche, das gibt Stabilität.", "Zähle nur saubere Wiederholungen mit voller Bewegung."],
    fehler: ["Der untere Rücken hängt durch.", "Die Hüfte wandert nach oben.", "Nur halbe Bewegung."],
    hinweis: ""
  },
  {
    id: "archer", name: "Archer-Liegestütze", kategorie: "push", messart: "wdh",
    muskeln: "Brust, Schultern, Trizeps (einseitig)",
    anleitung: [
      "Starte mit sehr breiten Händen, Finger zeigen etwas nach außen.",
      "Verlagere dein Gewicht auf eine Seite und beuge nur diesen Arm.",
      "Der andere Arm bleibt gestreckt und hilft nur wenig mit.",
      "Hochdrücken, dann Seite wechseln. Eine Wiederholung = jede Seite einmal."
    ],
    tipps: ["Hüfte bleibt ruhig, kein Verdrehen.", "Den gestreckten Arm langsam „leichter“ machen, je stärker du wirst."],
    fehler: ["Zu schnell und mit Schwung.", "Hüfte dreht weg."],
    hinweis: "Ellbogen und Schultern gut aufwärmen."
  },
  {
    id: "pseudo_planche", name: "Pseudo-Planche-Liegestütze", kategorie: "push", messart: "wdh",
    muskeln: "Vordere Schulter, Brust, Trizeps, Handgelenke, Körpermitte",
    anleitung: [
      "Liegestützposition, Hände auf Höhe von Hüfte/unterer Brust, Finger zeigen nach hinten oder seitlich.",
      "Lehne den ganzen Körper weit nach vorn, sodass die Schultern vor den Händen sind.",
      "Halte diese Vorlehne, Rücken leicht rund, Körper stark angespannt.",
      "Beuge die Arme in dieser Position und drücke dich hoch."
    ],
    tipps: ["Je weiter du vorlehnst, desto schwerer.", "Zehen bleiben am Boden."],
    fehler: ["Lehnt nicht vor (dann ist es nur ein normaler Liegestütz).", "Hüfte zu hoch."],
    hinweis: "Belastet die Handgelenke stark: vorher gut aufwärmen, bei Schmerzen abbrechen."
  },
  {
    id: "dips", name: "Dips", kategorie: "push", messart: "wdh",
    muskeln: "Trizeps, Brust, Schultern",
    anleitung: [
      "Stütz auf dem Barren, Arme gestreckt, Schultern nach unten gezogen.",
      "Oberkörper leicht vorlehnen, Ellbogen nah am Körper.",
      "Langsam absenken, bis die Oberarme etwa waagerecht sind.",
      "Kräftig hochdrücken, oben die Arme strecken."
    ],
    tipps: ["Schultern nicht zu den Ohren hochziehen.", "Mit Zusatzgewicht erst steigern, wenn die Technik sauber ist."],
    fehler: ["Zu tief absinken (Schulter!).", "Schwung aus den Beinen."],
    hinweis: "Bei Schulterschmerzen nicht tiefer gehen und Trainer fragen."
  },
  {
    id: "pike_pushups", name: "Pike-Liegestütze", kategorie: "push", messart: "wdh",
    muskeln: "Schultern, Trizeps",
    anleitung: [
      "Hände schulterbreit, Hüfte hoch, Körper bildet ein umgekehrtes „V“.",
      "Beuge die Arme und führe den Kopf zwischen den Händen Richtung Boden.",
      "Drücke dich kräftig zurück nach oben.",
      "Schwerer: Füße auf einen Stuhl oder eine Erhöhung stellen."
    ],
    tipps: ["Je höher die Füße, desto mehr Gewicht liegt auf den Schultern.", "Beine möglichst gestreckt."],
    fehler: ["Hüfte sackt ab (wird zum normalen Liegestütz)."],
    hinweis: ""
  },
  {
    id: "wand_handstand", name: "Wand-Handstand (halten)", kategorie: "skill", messart: "sek",
    muskeln: "Schultern, Arme, Körpermitte, Handgelenke",
    anleitung: [
      "Starte in Liegestützposition mit den Füßen an der Wand, Bauch zeigt zur Wand.",
      "Laufe mit den Füßen die Wand hoch und mit den Händen Richtung Wand, bis nur noch etwa eine Handbreit Abstand ist.",
      "Schiebe die Schultern aktiv hoch („Ohren zwischen die Arme“), Arme bleiben gestreckt.",
      "Körper gerade, Bauch und Po angespannt. Halten, dann Schritt für Schritt zurück."
    ],
    tipps: ["Finger leicht spreizen und mit den Fingern „greifen“.", "Matte oder Teppich nutzen, Raum um dich frei halten."],
    fehler: ["Hohlkreuz (Banane).", "Schultern sinken ab."],
    hinweis: "Handgelenke vorher aufwärmen. Bei Schwindel oder Schmerz sofort runter."
  },
  {
    id: "wand_hspu_negativ", name: "Wand-Handstand-Liegestütz (nur runter)", kategorie: "skill", messart: "wdh",
    muskeln: "Schultern, Trizeps, Körpermitte",
    anleitung: [
      "Gehe in den Wand-Handstand (Bauch zur Wand), Matte oder Kissen unter den Kopf legen.",
      "Senke dich langsam in 3–5 Sekunden ab, bis der Kopf die Matte leicht berührt.",
      "Drücke dich zurück hoch, oder laufe sicher mit den Füßen herunter.",
      "Wenn das gut klappt, drücke dich Schritt für Schritt auch nach oben."
    ],
    tipps: ["Kontrolle ist wichtiger als Tempo.", "Mit wenigen Wiederholungen anfangen."],
    fehler: ["Fällt unkontrolliert nach unten.", "Ellbogen weit zur Seite."],
    hinweis: "Nur machen, wenn der Wand-Handstand sicher steht. Nicht ohne Matte."
  },
  {
    id: "planche_lean", name: "Planche Lean", kategorie: "skill", messart: "sek",
    muskeln: "Vordere Schulter, Handgelenke, Körpermitte",
    anleitung: [
      "Liegestützposition, Arme gestreckt, Finger nach vorn oder leicht nach außen.",
      "Schiebe die Schultern weit nach vorn über die Hände, Zehen bleiben am Boden.",
      "Körper bleibt gerade, Po und Bauch angespannt, Rücken leicht rund.",
      "Halte die Position, dann ruhig zurück."
    ],
    tipps: ["Langsam steigern: kleine Schritte weiter nach vorn.", "Zeit stoppen und im Tracker eintragen."],
    fehler: ["Arme knicken ein.", "Hüfte geht hoch."],
    hinweis: "Belastet Handgelenke und Ellbogen: gut aufwärmen, Pausen zwischen den Trainingstagen. Bei Schmerz stoppen."
  },
  {
    id: "tuck_planche", name: "Tuck Planche", kategorie: "skill", messart: "sek",
    muskeln: "Schultern, Arme, Handgelenke, Körpermitte",
    anleitung: [
      "Hocke dich hin, Hände flach auf den Boden (gern auf Parallettes), Arme gestreckt.",
      "Lehne dich weit nach vorn, Knie ziehen zur Brust.",
      "Hebe die Füße nacheinander vom Boden, Rücken rund, Arme bleiben gestreckt.",
      "Halten, dann sicher wieder absetzen."
    ],
    tipps: ["Erst probieren, wenn Planche Lean sicher klappt.", "Matte unterlegen."],
    fehler: ["Arme angewinkelt.", "Zu wenig Vorlehne."],
    hinweis: "Fortgeschrittene Übung. Technik mit dem Trainer besprechen. Bei Handgelenkschmerz abbrechen."
  },
  {
    id: "klimmzuege", name: "Klimmzüge", kategorie: "pull", messart: "wdh",
    muskeln: "Rücken, Bizeps, Unterarme",
    anleitung: [
      "Obergriff etwa schulterbreit, ruhig hängen.",
      "Ziehe zuerst die Schulterblätter nach unten, dann den Körper nach oben.",
      "Das Kinn kommt über die Stange.",
      "Kontrolliert wieder ganz hinunter, Arme strecken."
    ],
    tipps: ["Beine locker nach vorn oder gekreuzt.", "Ellbogen zeigen nach unten, nicht nach außen."],
    fehler: ["Mit Schwung statt mit Kraft.", "Nicht ganz unten strecken."],
    hinweis: ""
  },
  {
    id: "plank", name: "Plank (Unterarmstütz)", kategorie: "core", messart: "sek",
    muskeln: "Bauch, Rücken, Schultern",
    anleitung: [
      "Unterarme auf den Boden, Ellbogen unter den Schultern.",
      "Körper bildet eine gerade Linie von Kopf bis Ferse.",
      "Bauch und Po fest anspannen, Blick zum Boden.",
      "Halten und ruhig weiteratmen."
    ],
    tipps: ["Lieber kürzer und sauber als lang und durchhängend."],
    fehler: ["Hüfte hängt durch oder ist zu hoch.", "Atem anhalten."],
    hinweis: ""
  },
  {
    id: "hollow_body", name: "Hollow Body Hold", kategorie: "core", messart: "sek",
    muskeln: "Gerade Bauchmuskeln, Hüftbeuger",
    anleitung: [
      "Rückenlage, Arme über dem Kopf gestreckt.",
      "Drücke den unteren Rücken fest in den Boden.",
      "Hebe Schultern und gestreckte Beine knapp vom Boden ab.",
      "Position halten, Spannung im Bauch."
    ],
    tipps: ["Zu schwer? Beine anwinkeln (Tuck) oder Arme neben den Körper."],
    fehler: ["Unterer Rücken hebt vom Boden ab."],
    hinweis: ""
  },
  {
    id: "beinheben_hang", name: "Beinheben im Hang", kategorie: "core", messart: "wdh",
    muskeln: "Bauch, Hüftbeuger, Unterarme",
    anleitung: [
      "An der Stange hängen, Schultern leicht nach unten gezogen.",
      "Ziehe die Beine (erst angewinkelt, später gestreckt) kontrolliert nach oben.",
      "Kippe dabei das Becken leicht ein.",
      "Langsam wieder absenken ohne zu schwingen."
    ],
    tipps: ["Ruhig und kontrolliert statt schnell."],
    fehler: ["Starkes Schwingen.", "Nur die Hüfte beugen, ohne den Bauch zu nutzen."],
    hinweis: ""
  },
  {
    id: "kniebeugen", name: "Kniebeugen", kategorie: "beine", messart: "wdh",
    muskeln: "Oberschenkel, Po, Rumpf",
    anleitung: [
      "Füße etwa schulterbreit, Zehen leicht nach außen.",
      "Hüfte nach hinten-unten schieben, Brust bleibt aufrecht.",
      "Knie zeigen in Richtung der Zehen, Fersen bleiben am Boden.",
      "Kraftvoll hochdrücken. Mit Hantel vor der Brust wird es schwerer."
    ],
    tipps: ["Gewicht auf der ganzen Fußsohle."],
    fehler: ["Knie fallen nach innen.", "Fersen heben ab."],
    hinweis: ""
  },
  {
    id: "ausfallschritte", name: "Ausfallschritte", kategorie: "beine", messart: "wdh",
    muskeln: "Oberschenkel, Po, Gleichgewicht",
    anleitung: [
      "Großer Schritt nach vorn, Oberkörper aufrecht.",
      "Senke das hintere Knie kontrolliert Richtung Boden.",
      "Vorderes Knie bleibt über dem Fuß.",
      "Mit dem vorderen Bein zurück in den Stand drücken, Seite wechseln."
    ],
    tipps: ["Hanteln in den Händen machen es schwerer.", "Gut für Basketball: Stabilität in den Beinen."],
    fehler: ["Knie knickt nach innen.", "Oberkörper kippt nach vorn."],
    hinweis: ""
  },
  {
    id: "chinups", name: "Klimmzüge im Untergriff", kategorie: "pull", messart: "wdh",
    muskeln: "Rücken, Bizeps, Unterarme",
    anleitung: [
      "Untergriff (Handflächen zu dir), Hände etwa schulterbreit.",
      "Aus dem ruhigen Hang Schulterblätter nach unten ziehen und hochziehen.",
      "Kinn über die Stange, Ellbogen nah am Körper.",
      "Kontrolliert ganz hinunter, Arme strecken."
    ],
    tipps: ["Bizeps arbeitet stärker mit als im Obergriff: gut als Abwechslung."],
    fehler: ["Mit Schwung hochreißen.", "Nicht ganz unten strecken."],
    hinweis: ""
  },
  {
    id: "scapula_pulls", name: "Schulterblatt-Klimmzüge", kategorie: "pull", messart: "wdh",
    muskeln: "Unterer Rücken, Schulterblatt-Muskeln, Griffkraft",
    anleitung: [
      "Hänge mit gestreckten Armen an der Stange.",
      "Ziehe nur die Schulterblätter nach unten und hinten, der Körper hebt sich ein paar Zentimeter.",
      "Arme bleiben gestreckt, kurz halten.",
      "Langsam wieder in den Hang lassen."
    ],
    tipps: ["Super für Schulter-Gesundheit und eine stabile Klimmzug-Technik.", "Auch als Aufwärmen vor Pull- und Handstand-Tagen gut."],
    fehler: ["Ellbogen beugen.", "Zu schnell."],
    hinweis: ""
  },
  {
    id: "hantel_rudern", name: "Hantel-Rudern (einarmig)", kategorie: "pull", messart: "wdh",
    muskeln: "Oberer und mittlerer Rücken, Bizeps",
    anleitung: [
      "Stütze Hand und Knie derselben Seite auf einen stabilen Stuhl oder eine Bank, Rücken gerade.",
      "Die andere Hand hält die Hantel, Arm hängt gestreckt nach unten.",
      "Ziehe die Hantel Richtung Hüfte, Ellbogen nah am Körper, Schulterblatt zur Wirbelsäule.",
      "Kontrolliert ablassen. Danach Seite wechseln (Wdh. pro Seite)."
    ],
    tipps: ["Gewicht so wählen, dass der Rücken ruhig bleibt."],
    fehler: ["Oberkörper dreht mit.", "Hantel wird mit Schwung gerissen."],
    hinweis: "Stuhl muss stabil stehen und darf nicht wegrutschen."
  },
  {
    id: "diamant", name: "Diamant-Liegestütze", kategorie: "push", messart: "wdh",
    muskeln: "Trizeps, innere Brust, Schultern",
    anleitung: [
      "Hände eng unter der Brust, Daumen und Zeigefinger bilden eine Raute.",
      "Körper gerade, Bauch und Po angespannt.",
      "Ellbogen nah am Körper nach hinten beugen und die Brust zu den Händen senken.",
      "Kräftig hochdrücken."
    ],
    tipps: ["Bei Handgelenkdruck Hände etwas weiter auseinander."],
    fehler: ["Ellbogen spreizen sich weit ab.", "Hüfte hängt durch."],
    hinweis: ""
  },
  {
    id: "hantel_schulter", name: "Hantel-Schulterdrücken", kategorie: "push", messart: "wdh",
    muskeln: "Schultern, Trizeps",
    anleitung: [
      "Aufrecht stehen oder sitzen, Hanteln auf Schulterhöhe, Handflächen nach vorn.",
      "Bauch anspannen, nicht ins Hohlkreuz fallen.",
      "Drücke die Hanteln gerade nach oben, bis die Arme gestreckt sind.",
      "Kontrolliert wieder auf Schulterhöhe senken."
    ],
    tipps: ["Gewicht so wählen, dass die letzten Wiederholungen noch sauber sind."],
    fehler: ["Hohlkreuz.", "Hanteln werden mit den Beinen hochgeschwungen."],
    hinweis: ""
  },
  {
    id: "bulgarisch", name: "Bulgarische Kniebeugen", kategorie: "beine", messart: "wdh",
    muskeln: "Oberschenkel, Po, Gleichgewicht",
    anleitung: [
      "Hinterer Fuß (Fußrücken) liegt auf einem stabilen Stuhl, vorderer Fuß einen großen Schritt davor.",
      "Oberkörper aufrecht, senke das hintere Knie kontrolliert Richtung Boden.",
      "Vorderes Knie bleibt über dem Fuß und fällt nicht nach innen.",
      "Hochdrücken, nach allen Wiederholungen Seite wechseln (Wdh. pro Seite)."
    ],
    tipps: ["Hanteln in den Händen machen es schwerer.", "Gut für einbeinige Stabilität beim Basketball."],
    fehler: ["Fuß zu nah am Stuhl.", "Knie knickt nach innen."],
    hinweis: "Stuhl muss stabil stehen."
  },
  {
    id: "wadenheben", name: "Wadenheben", kategorie: "beine", messart: "wdh",
    muskeln: "Waden, Sprunggelenk",
    anleitung: [
      "Stell dich auf eine Stufe oder den Boden, Fersen frei (an der Wand abstützen).",
      "Drücke dich auf die Zehenspitzen, so hoch wie möglich.",
      "Oben kurz halten, dann langsam absenken.",
      "Schwerer: einbeinig oder mit Hantel."
    ],
    tipps: ["Stärkt Waden und Sprunggelenke, gut für Sprünge und Antritte."],
    fehler: ["Zu schnell, kein Halten oben."],
    hinweis: ""
  },
  {
    id: "glute_bridge", name: "Glute Bridge (Beckenheben)", kategorie: "beine", messart: "wdh",
    muskeln: "Po, hintere Oberschenkel, unterer Rücken",
    anleitung: [
      "Rückenlage, Füße aufgestellt, Arme neben dem Körper.",
      "Hebe das Becken, bis Schultern, Hüfte und Knie eine Linie bilden.",
      "Po oben fest anspannen und kurz halten.",
      "Kontrolliert ablassen. Schwerer: einbeinig."
    ],
    tipps: ["Gut als Ausgleich nach viel Basketball."],
    fehler: ["Hohlkreuz oben.", "Schwung statt Spannung."],
    hinweis: ""
  },
  {
    id: "l_sit", name: "L-Sit (Barren)", kategorie: "core", messart: "sek",
    muskeln: "Bauch, Hüftbeuger, Trizeps, Schultern",
    anleitung: [
      "Stütze dich auf dem Barren, Arme gestreckt, Schultern nach unten gedrückt.",
      "Hebe die Beine vor dem Körper an. Anfänger: Knie angewinkelt, später gestreckt.",
      "Halte den Oberkörper aufrecht, Beine möglichst waagerecht.",
      "Halten, dann kontrolliert absetzen."
    ],
    tipps: ["Schultern aktiv nach unten schieben, nicht hängen lassen."],
    fehler: ["Schultern ziehen hoch zu den Ohren.", "Rücken rund und Beine hängen."],
    hinweis: ""
  },
  {
    id: "seitstuetz", name: "Seitstütz", kategorie: "core", messart: "sek",
    muskeln: "Seitliche Bauchmuskeln, Hüfte, Schulter",
    anleitung: [
      "Seitlich auf den Unterarm stützen, Ellbogen unter der Schulter.",
      "Hebe die Hüfte, bis der Körper eine gerade Linie bildet.",
      "Halten, ruhig atmen.",
      "Dann Seite wechseln (Sekunden pro Seite)."
    ],
    tipps: ["Wichtig für Stabilität bei Richtungswechseln im Basketball."],
    fehler: ["Hüfte sackt ab.", "Oberkörper dreht nach vorn."],
    hinweis: ""
  }
];

/* Hilfsfunktion: Übung per id finden */
function findeUebung(id) {
  return UEBUNGEN.find(function (u) { return u.id === id; });
}

/* Übungen für den Skill-Pfad "Handstand / Planche" */
const PFAD_IDS = ["wand_handstand", "pike_pushups", "wand_hspu_negativ", "pseudo_planche", "planche_lean", "tuck_planche"];

/* Übungen mit hoher Handgelenk-/Sehnenbelastung: nicht an aufeinanderfolgenden Tagen, höchstens 3 Tage pro Woche */
const HOHE_BELASTUNG = ["pseudo_planche", "planche_lean", "tuck_planche"];
