// Source Adzuna — activée si ADZUNA_APP_ID et ADZUNA_APP_KEY sont définis.
const { relativeDate } = require('./util');
const { deptToLocation } = require('./depts');

function mapContract(r){
  if(r.contract_type==='permanent') return 'CDI';
  if(r.contract_type==='contract') return 'CDD';
  if(r.contract_time==='part_time') return 'Temps partiel';
  return '';
}
async function searchAdzuna({ motsCles, dept }){
  const id=process.env.ADZUNA_APP_ID, key=process.env.ADZUNA_APP_KEY;
  if(!id || !key) return [];
  const qs=new URLSearchParams({ app_id:id, app_key:key, results_per_page:"50", what:motsCles||"", "content-type":"application/json" });
  const where=deptToLocation(dept); if(where) qs.set("where", where);
  const res=await fetch("https://api.adzuna.com/v1/api/jobs/fr/search/1?"+qs.toString(),{headers:{Accept:"application/json"}});
  if(!res.ok){ const t=await res.text(); throw new Error("Adzuna ("+res.status+") : "+t.slice(0,140)); }
  const json=await res.json();
  return (json.results||[]).map(r=>({
    id:"az_"+r.id,
    title:r.title||"Poste",
    employer:(r.company&&r.company.display_name)||"Entreprise",
    city:(r.location&&r.location.display_name)||"France",
    description:r.description||"",
    contract:mapContract(r),
    applyUrl:r.redirect_url||null,
    contactEmail:null,
    ago:relativeDate(r.created),
    source:"Adzuna",
  }));
}
module.exports = { searchAdzuna };
