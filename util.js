// Helpers partagés entre les sources d'offres.
function relativeDate(iso){
  if(!iso) return '';
  const d=new Date(iso); if(isNaN(d.getTime())) return '';
  const days=Math.max(0, Math.round((Date.now()-d.getTime())/86400000));
  if(days===0) return "aujourd'hui";
  if(days===1) return "il y a 1 j";
  return "il y a "+days+" j";
}
// clé de déduplication : titre + employeur + ville, normalisés
function dedupKey(o){
  return ((o.title||'')+'|'+(o.employer||'')+'|'+(o.city||''))
    .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');
}
module.exports = { relativeDate, dedupKey };
