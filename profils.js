// Profils candidats types (métiers administratifs).
// motsCles  : envoyés à l'API France Travail (recherche large et robuste)
// codeROME  : optionnel, pour affiner en production. À CONFIRMER via l'endpoint
//             référentiel de l'API (/referentiel/metiers) — ne pas se fier
//             aveuglément aux codes ci-dessous, ils servent d'amorce.
// atouts    : points forts réutilisés dans la candidature préparée
// pitch     : phrase d'accroche insérée dans le message au recruteur

const PROFILS = {
  direction: {
    label: "Assistanat de direction / RH",
    motsCles: "assistant direction ressources humaines",
    codeROME: "M1604", // Assistanat de direction (à confirmer)
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
    motsCles: "assistant juridique secrétaire juridique",
    codeROME: "", // s'appuyer sur les mots-clés
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
    motsCles: "assistant administration des ventes commercial ADV",
    codeROME: "D1401", // Assistanat commercial (à confirmer)
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
    motsCles: "secrétaire médicale médico-administratif",
    codeROME: "M1609", // Secrétariat et assistanat médical (à confirmer)
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
