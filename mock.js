// Offres simulées (normalisées) pour le mode démo (MOCK_MODE=1, sans clé).
const { relativeDate } = require('./util');
function iso(d){ return new Date(Date.now()-d*86400000).toISOString(); }
const MOCK = [
  {id:"m1",title:"Assistant(e) de direction",employer:"Cabinet Berthier",city:"Lyon 3e",description:"assistant direction agenda dossiers comptes rendus ressources humaines",contract:"CDI",applyUrl:"https://candidat.francetravail.fr/offres/recherche",contactEmail:null,ago:relativeDate(iso(2)),source:"Démo"},
  {id:"m2",title:"Assistant(e) ADV",employer:"Groupe Valorine",city:"Villeurbanne",description:"administration des ventes commandes clients ERP commercial",contract:"CDI",applyUrl:"https://candidat.francetravail.fr/offres/recherche",contactEmail:null,ago:relativeDate(iso(1)),source:"Démo"},
  {id:"m3",title:"Secrétaire médicale",employer:"Centre d'imagerie",city:"Lyon 3e",description:"secrétaire médicale accueil patients rendez-vous dossier médical",contract:"CDD 6 mois",applyUrl:"https://candidat.francetravail.fr/offres/recherche",contactEmail:null,ago:relativeDate(iso(3)),source:"Démo"},
  {id:"m4",title:"Assistant(e) comptable",employer:"Fiduciaire Léman",city:"Lyon 6e",description:"assistant comptable saisie factures rapprochements expert-comptable",contract:"CDI",applyUrl:"https://candidat.francetravail.fr/offres/recherche",contactEmail:null,ago:relativeDate(iso(4)),source:"Démo"},
  {id:"m5",title:"Chargé(e) d'accueil",employer:"Résidence Novélia",city:"Lyon 6e",description:"accueil physique téléphonique courrier standard",contract:"Intérim",applyUrl:"https://candidat.francetravail.fr/offres/recherche",contactEmail:null,ago:relativeDate(iso(5)),source:"Démo"},
];
module.exports = { MOCK };
