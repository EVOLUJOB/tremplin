// Source France Travail — OAuth2 + recherche, renvoie des offres normalisées.
const { relativeDate } = require('./util');
const TOKEN_URL = "https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=/partenaire";
const SEARCH_URL = "https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search";

let cachedToken=null, tokenExpiresAt=0;
async function getToken(){
  const now=Date.now();
  if(cachedToken && now < tokenExpiresAt-30000) return cachedToken;
  const body=new URLSearchParams({
    grant_type:"client_credentials",
    client_id:process.env.FT_CLIENT_ID,
    client_secret:process.env.FT_CLIENT_SECRET,
    scope:process.env.FT_SCOPE||"api_offresdemploiv2 o2dsoffre",
  });
  const res=await fetch(TOKEN_URL,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body});
  if(!res.ok){ const t=await res.text(); throw new Error("Auth France Travail ("+res.status+") : "+t.slice(0,140)); }
  const json=await res.json();
  cachedToken=json.access_token; tokenExpiresAt=now+(json.expires_in||1500)*1000;
  return cachedToken;
}

async function searchFranceTravail({ motsCles, dept }){
  if(!process.env.FT_CLIENT_ID) return [];
  const token=await getToken();
  const qs=new URLSearchParams();
  if(motsCles) qs.set("motsCles", motsCles);
  if(dept) qs.set("departement", dept);
  qs.set("range","0-49");
  const res=await fetch(SEARCH_URL+"?"+qs.toString(),{headers:{Authorization:"Bearer "+token, Accept:"application/json"}});
  if(res.status===204) return [];
  if(!res.ok){ const t=await res.text(); throw new Error("France Travail ("+res.status+") : "+t.slice(0,140)); }
  const json=await res.json();
  return (json.resultats||[]).map(r=>({
    id:"ft_"+r.id,
    title:r.intitule||"Poste administratif",
    employer:(r.entreprise&&r.entreprise.nom)||"Entreprise",
    city:(r.lieuTravail&&r.lieuTravail.libelle)||"France",
    description:r.description||"",
    contract:r.typeContratLibelle||r.typeContrat||"",
    applyUrl:(r.origineOffre&&r.origineOffre.urlOrigine)||null,
    contactEmail:(r.contact&&r.contact.courriel)||null,
    ago:relativeDate(r.dateCreation),
    source:"France Travail",
  }));
}
module.exports = { searchFranceTravail };
