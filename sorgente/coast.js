const topo=require('world-atlas/land-10m.json');const tc=require('topojson-client');
const g=tc.feature(topo,topo.objects.land);
const B=[5.5,35.5,20.5,47.2];
const polys=[];
for(const f of g.features){const gs=f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates;
 for(const p of gs){const ring=p[0];let inb=ring.some(([x,y])=>x>=B[0]&&x<=B[2]&&y>=B[1]&&y<=B[3]);if(!inb)continue;
  // clip crude: keep points, clamp to expanded bbox
  const out=[];let prev=null;for(const [x,y] of ring){const cx=Math.min(Math.max(x,B[0]-1),B[2]+1),cy=Math.min(Math.max(y,B[1]-1),B[3]+1);const pt=[+cx.toFixed(4),+cy.toFixed(4)];if(prev&&prev[0]===pt[0]&&prev[1]===pt[1])continue;out.push(pt);prev=pt;}
  if(out.length>3)polys.push(out);}}
const s=JSON.stringify(polys);require('fs').writeFileSync('coast.json',s);console.log(polys.length,s.length);
