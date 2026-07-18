// Profils candidats types (métiers administratifs).
// motsCles : envoyés à l'API France Travail. Chaque mot RESTREINT la recherche
//            (comportement cumulatif) : on reste sur 1-2 mots qui définissent le
//            métier, pour maximiser le volume d'offres.
// codeROME : laissé vide volontairement (le combiner aux mots-clés filtrait deux
//            fois et faisait chuter les résultats).
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
    pitch: "Organisé(e) et polyvalent(e), je fais gagner du temps à une direction au quotidien.",
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
    pitch: "Rigoureux(se) sur les procédures et les délais, je sécurise la gestion des dossiers.",
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
    pitch: "À l'aise sur le cycle de commande et la relation client, je fluidifie le back-office.",
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
    pitch: "Accueil patient soigné et gestion des dossiers sans faille, même sous pression.",
  },
  accueil: {
    label: "Accueil / standard",
    motsCles: "accueil",
    codeROME: "",
    atouts: [
      "Accueil physique et téléphonique",
      "Gestion du courrier, des accès et du standard",
      "Première image de l'entreprise, sens du service",
    ],
    pitch: "Souriant(e) et organisé(e), je fais de l'accueil un vrai moment de qualité.",
  },
  comptable: {
    label: "Assistanat comptable",
    motsCles: "assistant comptable",
    codeROME: "",
    atouts: [
      "Saisie et rapprochements comptables",
      "Suivi des factures clients et fournisseurs",
      "Préparation des éléments pour l'expert-comptable",
    ],
    pitch: "Rigoureux(se) avec les chiffres, je fiabilise le suivi comptable au quotidien.",
  },
  paie: {
    label: "Gestionnaire de paie / RH",
    motsCles: "gestionnaire paie",
    codeROME: "",
    atouts: [
      "Établissement des bulletins de paie",
      "Déclarations sociales et gestion des variables",
      "Administration du personnel et suivi des dossiers",
    ],
    pitch: "Précis(e) et à jour des règles sociales, je sécurise la paie de A à Z.",
  },
  office: {
    label: "Office manager",
    motsCles: "office manager",
    codeROME: "",
    atouts: [
      "Coordination administrative et logistique du bureau",
      "Interface fournisseurs, services généraux et équipes",
      "Polyvalence RH, comptable et organisationnelle",
    ],
    pitch: "Couteau suisse du bureau, je fais tourner l'administratif sans accroc.",
  },
  secretaire: {
    label: "Secrétaire polyvalent·e",
    motsCles: "secrétaire",
    codeROME: "",
    atouts: [
      "Secrétariat général et gestion du courrier",
      "Frappe, mise en forme et classement de documents",
      "Accueil, agenda et suivi administratif",
    ],
    pitch: "Polyvalent(e) et fiable, je prends en charge tout le quotidien administratif.",
  },
  gestion: {
    label: "Gestion administrative",
    motsCles: "gestionnaire administratif",
    codeROME: "",
    atouts: [
      "Traitement des dossiers adhérents / clients",
      "Saisie, contrôle et mise à jour des données",
      "Réponses aux courriers et aux mails",
    ],
    pitch: "Méthodique et rigoureux(se), je traite les dossiers avec fiabilité et rapidité.",
  },
};

module.exports = { PROFILS };
