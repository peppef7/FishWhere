const g=JSON.parse(require('fs').readFileSync('package/map.geo.json','utf8'));
const boxes=[[16.9,40.75,17.6,41.2],[19.2,39.7,19.65,40.0]];
const out=[];
const geoms=g.features?g.features.map(f=>f.geometry):g.geometries||[g];
for(const gm of geoms){const polys=gm.type==='Polygon'?[gm.coordinates]:gm.coordinates;
 for(const p of polys){const ring=p[0];let a=1e9,b=1e9,c=-1e9,d=-1e9;for(const [x,y] of ring){a=Math.min(a,x);b=Math.min(b,y);c=Math.max(c,x);d=Math.max(d,y);}
  for(const B of boxes){if(c<B[0]||a>B[2]||d<B[1]||b>B[3])continue;
   // simplify: keep point if >30m from last kept
   const r=[];let last=null;for(const [x,y] of ring){const cx=Math.min(Math.max(x,B[0]),B[2]),cy=Math.min(Math.max(y,B[1]),B[3]);if(last&&Math.hypot((cx-last[0])*0.77,cy-last[1])<0.0003)continue;last=[+cx.toFixed(5),+cy.toFixed(5)];r.push(last);}
   if(r.length>3)out.push(r);}}}
const s=JSON.stringify(out);require('fs').writeFileSync('detail.json',s);console.log(out.length,s.length,out.map(r=>r.length).sort((a,b)=>b-a).slice(0,5));
