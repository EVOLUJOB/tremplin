// Offres simulées au format brut France Travail, pour faire tourner l'appli
// SANS identifiants (MOCK_MODE=1). Permet de tester toute la chaîne, puis de
// basculer en réel en ajoutant la clé.

const RAW = [
  { id: "o1", intitule: "Assistant(e) juridique", entreprise: { nom: "Cabinet Berthier & Associés" },
    lieuTravail: { libelle: "Lyon 3e" }, typeContratLibelle: "CDI",
    description: "Gestion des dossiers contentieux, actes courants, suivi des échéances et audiences pour un cabinet d'avocats.",
    dateCreation: iso(2), origineOffre: { urlOrigine: "https://candidat.francetravail.fr/offres/recherche" } },
  { id: "o2", intitule: "Assistant(e) ADV", entreprise: { nom: "Groupe Valorine" },
    lieuTravail: { libelle: "Villeurbanne" }, typeContratLibelle: "CDI",
    description: "Administration des ventes : traitement des commandes, interface clients et logistique, tableaux de suivi sur ERP.",
    dateCreation: iso(1), origineOffre: { urlOrigine: "https://candidat.francetravail.fr/offres/recherche" } },
  { id: "o3", intitule: "Secrétaire médicale", entreprise: { nom: "Centre d'imagerie Part-Dieu" },
    lieuTravail: { libelle: "Lyon 3e" }, typeContratLibelle: "CDD 6 mois",
    description: "Accueil patients, prise de rendez-vous, gestion du dossier médical et télétransmission, coordination praticiens.",
    dateCreation: iso(3), origineOffre: { urlOrigine: "https://candidat.francetravail.fr/offres/recherche" } },
  { id: "o4", intitule: "Chargé(e) d'accueil", entreprise: { nom: "Résidence Novélia" },
    lieuTravail: { libelle: "Lyon 6e" }, typeContratLibelle: "Intérim 3 mois",
    description: "Accueil physique et téléphonique, gestion du courrier et des accès, première image de l'entreprise.",
    dateCreation: iso(4), origineOffre: { urlOrigine: "https://candidat.francetravail.fr/offres/recherche" } },
  { id: "o5", intitule: "Assistant(e) RH", entreprise: { nom: "Néosens" },
    lieuTravail: { libelle: "Lyon 7e" }, typeContratLibelle: "CDI",
    description: "Administration du personnel et contrats, suivi des entrées/sorties, appui recrutement et onboarding, ressources humaines.",
    dateCreation: iso(1), origineOffre: { urlOrigine: "https://candidat.francetravail.fr/offres/recherche" } },
  { id: "o6", intitule: "Secrétaire de direction", entreprise: { nom: "Mairie de Bron" },
    lieuTravail: { libelle: "Bron" }, typeContratLibelle: "CDD 12 mois",
    description: "Gestion d'agendas et d'instances, préparation de dossiers et comptes rendus, interface élus et services, assistant direction.",
    dateCreation: iso(5), origineOffre: { urlOrigine: "https://candidat.francetravail.fr/offres/recherche" } },
  { id: "o7", intitule: "Assistant(e) commercial(e)", entreprise: { nom: "Distri-Pro" },
    lieuTravail: { libelle: "Vénissieux" }, typeContratLibelle: "CDI",
    description: "Devis, relances et suivi clients, soutien à l'équipe commerciale terrain, reporting et mise à jour CRM, administration des ventes.",
    dateCreation: iso(2), origineOffre: { urlOrigine: "https://candidat.francetravail.fr/offres/recherche" } },
  { id: "o8", intitule: "Gestionnaire administratif(ve)", entreprise: { nom: "Mutuelle Rhôdania" },
    lieuTravail: { libelle: "Lyon 9e" }, typeContratLibelle: "CDI",
    description: "Traitement des dossiers adhérents, saisie et contrôle de données, réponses courriers et mails, médico-administratif.",
    dateCreation: iso(3), origineOffre: { urlOrigine: "https://candidat.francetravail.fr/offres/recherche" } },
];

function iso(daysAgo) {
  return new Date(Date.now() - daysAgo * 86400000).toISOString();
}

module.exports = { RAW };
