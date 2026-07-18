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
  res.json(Object.entries(PROFILS).map(([id,p])=>({id,label:p.label})));
});

app.get("/api/offres", async (req,res)=>{
  const profil=PROFILS[req.query.profil];
  if(!profil) return res.status(400).json({error:"Profil inconnu"});
  const params={ motsCles:profil.motsCles, dept:req.query.departement||"" };
  try{
    let raw=[]; const usedSources=[];
    if(MOCK_MODE){
      raw=MOCK; usedSources.push("Démo");
    } else {
      const tasks=[
        { name:"France Travail", fn:()=>searchFranceTravail(params) },
        { name:"Adzuna",         fn:()=>searchAdzuna(params) },
        { name:"Jooble",         fn:()=>searchJooble(params) },
      ];
      const settled=await Promise.all(tasks.map(async t=>{
        try{ const r=await t.fn(); if(r&&r.length) usedSources.push(t.name+" ("+r.length+")"); return r||[]; }
        catch(e){ console.error(t.name+" KO :", e.message); return []; }
      }));
      raw=[].concat(...settled);
    }
    // déduplication (garde la 1re occurrence : ordre France Travail, Adzuna, Jooble)
    const seen=new Set();
    raw=raw.filter(o=>{ const k=dedupKey(o); if(!k||seen.has(k)) return false; seen.add(k); return true; });
    const offres=raw.map(o=>enrich(o,profil)).sort((a,b)=>b.match-a.match).slice(0,60);
    res.json({ mode:MOCK_MODE?"demo":"reel", sources:usedSources, count:offres.length, offres });
  }catch(e){
    res.status(502).json({error:e.message});
  }
});

app.listen(PORT,()=>console.log("Tremplin sur http://localhost:"+PORT+"  (mode "+(MOCK_MODE?"DÉMO simulé":"RÉEL multi-sources")+")"));
