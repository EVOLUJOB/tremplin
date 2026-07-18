// Source Jooble — activée si JOOBLE_KEY est défini.
const { relativeDate } = require('./util');
const { deptToLocation } = require('./depts');

async function searchJooble({ motsCles, dept }){
  const key=process.env.JOOBLE_KEY;
  if(!key) return [];
  const body={ keywords:motsCles||"", location:deptToLocation(dept)||"" };
  const res=await fetch("https://jooble.org/api/"+key,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
  if(!res.ok){ const t=await res.text(); throw new Error("Jooble ("+res.status+") : "+t.slice(0,140)); }
  const json=await res.json();
  return (json.jobs||[]).map(j=>({
    id:"jb_"+(j.id||((j.link||"").slice(-14))),
    title:j.title||"Poste",
    employer:j.company||"Entreprise",
    city:j.location||"France",
    description:j.snippet||"",
    contract:j.type||"",
    applyUrl:j.link||null,
    contactEmail:null,
    ago:j.updated?relativeDate(j.updated):"",
    source:"Jooble",
  }));
}
module.exports = { searchJooble };
