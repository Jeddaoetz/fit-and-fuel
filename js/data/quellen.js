/* =========================================================
   QUELLEN für Übungen und Drills (Stand: Oktober 2026)
   Ehrlich getrennt in: durch Quellen gestützt / Praxiswissen / Eigenregel.
   ========================================================= */

const TRAINING_QUELLEN = {
  aap: {
    kurz: "AAP 2020",
    titel: "American Academy of Pediatrics (AAP): Resistance Training for Children and Adolescents (Pediatrics, 2020)",
    url: "https://www.healthychildren.org/English/news/Pages/Guidance-on-Resistance-Training-for-Children.aspx",
    inhalt: "Krafttraining ist mit Aufsicht und korrekter Technik geeignet. Vor dem Training dynamisch aufwärmen, danach weniger intensiv dehnen. Vor dem Wiedereinstieg nach Verletzung oder Überlastung abklären lassen. Trinken und gutes Essen helfen der Erholung. Zahlen zu Sätzen, Wiederholungen oder Ruhetagen nennt diese Zusammenfassung nicht."
  },
  huebscher: {
    kurz: "Hübscher et al. 2010",
    titel: "Hübscher M. et al.: Neuromuscular training for sports injury prevention: a systematic review (Med Sci Sports Exerc 2010; 42(3): 413–421)",
    url: "https://pubmed.ncbi.nlm.nih.gov/19952811/",
    inhalt: "In Ballsportarten mit Richtungswechseln (u. a. Basketball) senkte neuromuskuläres Training (Balance, Landung, Kraft) Sprunggelenk- und Knieverletzungen deutlich. Auch reines Gleichgewichtstraining senkte Sprunggelenkverletzungen. Geprüft wurde der Abstract."
  },
  kox: {
    kurz: "Kox et al. 2015",
    titel: "Kox L. S. et al.: Prevalence, incidence and risk factors for overuse injuries of the wrist in young athletes: a systematic review (Br J Sports Med 2015; 49)",
    url: "https://bjsm.bmj.com/content/49/18/1189",
    inhalt: "Handgelenkschmerzen sind bei jungen Sportlern in handbelasteten Sportarten häufig (beim Turnen 32–73 %). Als Risikofaktor wird höhere Trainingsintensität genannt. Konkrete Pausenregeln nennt der Artikel nicht."
  },
  ace: {
    kurz: "ACE",
    titel: "American Council on Exercise (ACE): Exercise Library (Liegestütz, Glute Bridge)",
    url: "https://www.acefitness.org/resources/everyone/exercise-library/41/push-up/",
    inhalt: "Beschreibung der Ausführung von Liegestütz (Hände etwa schulterbreit, Körper gerade, Brust oder Kinn zum Boden, Arme ganz strecken) und Glute Bridge (Körper von Knie bis Kopf in einer Linie)."
  },
  nsca: {
    kurz: "NSCA",
    titel: "NSCA: Long-Term Athletic Development Position Statement",
    url: "https://www.nsca.com/about-us/position-statements/youth-training-and-long-term-athletic-development/long-term-athletic-development-position-statement/",
    inhalt: "Junge Sportler, die körperlich schlecht vorbereitet sind und viel Sport machen, haben ein höheres Risiko für Überlastungsschäden. Konkrete Trainingszahlen stehen auf dieser Seite nicht."
  }
};

/* Welche Übung/Drill stützt sich auf welche Quelle? */
const UEBUNG_QUELLE = {
  liegestuetze: "ace",
  glute_bridge: "ace",
  pseudo_planche: "kox",
  planche_lean: "kox",
  tuck_planche: "kox",
  wand_handstand: "kox"
};
const DRILL_QUELLE = {
  einbein_landung: "huebscher",
  spruenge_landung: "huebscher"
};

/* Kurzer Quellenhinweis für Detailansichten */
function quellenZeile(schluessel) {
  if (schluessel && TRAINING_QUELLEN[schluessel]) {
    const q = TRAINING_QUELLEN[schluessel];
    return "Quelle: " + q.kurz + " (Details im Tab „Quellen“). Die genauen Schritte sind Praxiswissen.";
  }
  return "Quelle: Praxiswissen, nicht durch eine Studie oder Fachquelle geprüft. Technik bitte mit dem Trainer besprechen.";
}
