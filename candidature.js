// Enrichit une offre déjà normalisée : score d'affinité + candidature préparée.
function affinity(offre, profil){
  const hay=((offre.title||'')+' '+(offre.description||'')).toLowerCase();
  const words=(profil.motsCles||'').toLowerCase().split(/\s+/);
  const hits=words.filter(w=>w.length>2 && hay.includes(w)).length;
  return Math.round(62 + (hits/Math.max(1,words.length))*35);
}
function buildCandidature(offre, profil){
  const hook="votre besoin de « "+offre.title+" » chez "+offre.employer+" correspond à mon profil";
  const message="Bonjour,\n\nJe vous écris car "+hook+". "+profil.pitch+
    "\n\nJe serais ravi(e) d'échanger sur ce poste. Vous trouverez mon CV en pièce jointe.\n\nBien à vous,";
  return { atouts: profil.atouts, message };
}
function enrich(offre, profil){
  return { ...offre, match: affinity(offre, profil), candidature: buildCandidature(offre, profil) };
}
module.exports = { enrich };
