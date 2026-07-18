require("dotenv").config();
const express=require("express");
const path=require("path");
const { PROFILS }=require("./profils");
const { enrich }=require("./candidature");
const { searchFranceTravail }=require("./francetravail");
const { searchAdzuna }=require("./adzuna");
const { searchJooble }=require("./jooble");
const { dedupKey }=require("./util");
const { MOCK }=require("./mock");

const app=express();
const PORT=process.env.PORT||4059;
const MOCK_MODE = process.env.MOCK_MODE==="1" || !process.env.FT_CLIENT_ID;

app.use(express.static(path.join(__dirname,"public")));

app.get("/api/profils",(_q,res)=>{
  res.json(Object.entries(PROFILS).map(([id,p])=>({id,label:p.label,motsCles:p.motsCles})));
});

app.get("/api/offres", async (req,res)=>{
  const profil=PROFILS[req.query.profil];
  if(!profil) return res.status(400).json({error:"Profil inconnu"});
  const params={ motsCles:profil.motsCles, dept:req.query.departement||"" };
  try{
    let raw=[]; let statuses=[];
    if(MOCK_MODE){
      raw=MOCK; statuses=["Démo : "+MOCK.length+" offres"];
    } else {
      const tasks=[
        { name:"France Travail", enabled:!!process.env.FT_CLIENT_ID, fn:()=>searchFranceTravail(params) },
        { name:"Adzuna",         enabled:!!(process.env.ADZUNA_APP_ID&&process.env.ADZUNA_APP_KEY), fn:()=>searchAdzuna(params) },
        { name:"Jooble",         enabled:!!process.env.JOOBLE_KEY, fn:()=>searchJooble(params) },
      ];
      const results=await Promise.all(tasks.map(async t=>{
        if(!t.enabled) return { name:t.name, offers:[], status:"clé absente" };
        try{ const r=await t.fn(); return { name:t.name, offers:r||[], status:((r&&r.length)||0)+" offres" }; }
        catch(e){ console.error(t.name+" KO :", e.message); return { name:t.name, offers:[], status:"erreur — "+String(e.message).slice(0,90) }; }
      }));
      statuses=results.map(r=>r.name+" : "+r.status);
      raw=[].concat(...results.map(r=>r.offers));
    }
    const seen=new Set();
    raw=raw.filter(o=>{ const k=dedupKey(o); if(!k||seen.has(k)) return false; seen.add(k); return true; });
    const offres=raw.map(o=>enrich(o,profil)).sort((a,b)=>b.match-a.match).slice(0,60);
    res.json({ mode:MOCK_MODE?"demo":"reel", sources:statuses, count:offres.length, offres });
  }catch(e){
    res.status(502).json({error:e.message});
  }
});

app.listen(PORT,()=>console.log("Tremplin sur http://localhost:"+PORT+"  (mode "+(MOCK_MODE?"DÉMO simulé":"RÉEL multi-sources")+")"));
