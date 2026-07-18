// Transforme une offre brute France Travail en offre "prête pour la démo/prod" :
// champs normalisés + score d'affinité + candidature préparée (atouts + message).

function normalizeOffre(raw) {
  return {
    id: raw.id,
    title: raw.intitule || "Poste administratif",
    employer:
      (raw.entreprise && raw.entreprise.nom) ||
      raw.nomEntreprise ||
      "Entreprise",
    city: (raw.lieuTravail && raw.lieuTravail.libelle) || "France",
    contract:
      raw.typeContratLibelle || raw.typeContrat || "Contrat",
    description: raw.description || "",
    // Lien de candidature réel (postulat humain, conforme) ou email de contact
    applyUrl:
      (raw.origineOffre && raw.origineOffre.urlOrigine) || null,
    contactEmail: (raw.contact && raw.contact.courriel) || null,
    ago: relativeDate(raw.dateCreation),
  };
}

function relativeDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const days = Math.max(0, Math.round((Date.now() - d.getTime()) / 86400000));
  if (days === 0) return "aujourd'hui";
  if (days === 1) return "il y a 1 j";
  return `il y a ${days} j`;
}

// Score d'affinité simple et honnête : recouvrement de mots-clés entre le profil
// et l'intitulé/description de l'offre. Remplaçable par un vrai modèle plus tard.
function affinity(offre, profil) {
  const hay = `${offre.title} ${offre.description}`.toLowerCase();
  const words = profil.motsCles.toLowerCase().split(/\s+/);
  const hits = words.filter((w) => w.length > 2 && hay.includes(w)).length;
  const ratio = hits / Math.max(1, words.length);
  // borne l'échelle entre 62 et 97 pour rester lisible côté produit
  return Math.round(62 + ratio * 35);
}

function buildCandidature(offre, profil) {
  const hook = `votre besoin de « ${offre.title} » chez ${offre.employer} correspond à mon profil`;
  const message = `Bonjour,

Je vous écris car ${hook}. ${profil.pitch}

Je serais ravi(e) d'échanger sur ce poste. Vous trouverez mon CV en pièce jointe.

Bien à vous,`;
  return { atouts: profil.atouts, message };
}

function prepareOffre(raw, profil) {
  const offre = normalizeOffre(raw);
  return {
    ...offre,
    match: affinity(offre, profil),
    candidature: buildCandidature(offre, profil),
  };
}

module.exports = { prepareOffre };
