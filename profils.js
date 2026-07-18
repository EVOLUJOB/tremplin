// Profils candidats types (métiers administratifs).
// motsCles : envoyés à l'API France Travail. IMPORTANT : chaque mot RESTREINT
//            la recherche (comportement cumulatif), donc on reste sur 1-2 mots
//            qui définissent le métier, pour maximiser le volume d'offres.
// codeROME : laissé vide volontairement — le combiner aux mots-clés filtrait
//            deux fois et faisait chuter les résultats. On s'appuie sur les
//            mots-clés + le score d'affinité pour la pertinence.
// atouts   : points forts réutilisés dans la candidature préparée
// pitch    : phrase d'accroche insérée dans le message au recruteur

const PROFILS = {
  direction: {
    label: "Assistanat de direction / RH",
    motsCles: "assistant direction",
    codeROME: "",
    atouts: [
      "Gestion d'agendas, d'instances et de déplacements",
      "Préparation de dossiers et de comptes rendus",
      "Administration du personnel et suivi RH",
    ],
    pitch:
      "Organisé(e) et polyvalent(e), je fais gagner du temps à une direction au quotidien.",
  },
  juridique: {
    label: "Assistanat juridique",
    motsCles: "assistant juridique",
    codeROME: "",
    atouts: [
      "Gestion des dossiers et actes courants",
      "Rédaction, relecture et mise en forme juridique",
      "Suivi rigoureux des échéances et des audiences",
    ],
    pitch:
      "Rigoureux(se) sur les procédures et les délais, je sécurise la gestion des dossiers.",
  },
  adv: {
    label: "Assistanat ADV / commercial",
    motsCles: "assistant commercial",
    codeROME: "",
    atouts: [
      "Traitement des commandes de A à Z",
      "Interface clients, devis et relances",
      "Maîtrise ERP/CRM et tableaux de suivi",
    ],
    pitch:
      "À l'aise sur le cycle de commande et la relation client, je fluidifie le back-office.",
  },
  medical: {
    label: "Secrétariat médical",
    motsCles: "secrétaire médicale",
    codeROME: "",
    atouts: [
      "Accueil patients et prise de rendez-vous",
      "Gestion du dossier médical et télétransmission",
      "Coordination avec les praticiens",
    ],
    pitch:
      "Accueil patient soigné et gestion des dossiers sans faille, même sous pression.",
  },
};

module.exports = { PROFILS };
