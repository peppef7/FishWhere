// Costruisce: artifact.html (anteprima su Claude, dati simulati) e dist/ (web app per iPhone, dati reali)
const fs=require('fs');let s=fs.readFileSync('app.html','utf8');
const css=fs.readFileSync('node_modules/leaflet/dist/leaflet.css','utf8').replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s+/g,' ');
s=s.replace('/*LEAFLETCSS*/',()=>css).replace('/*COAST*/',()=>fs.readFileSync('coast.json','utf8'));
fs.writeFileSync('artifact.html',s.replace('/*PREVIEW*/true','true'));
const head=`<!doctype html>
<html lang="it"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="Dove andare a pescare in apnea: condizioni ora per ora su mappa satellitare.">
<meta name="theme-color" content="#0e2a3b">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Dove Pescare">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="icons/icon-180.png">
<link rel="icon" href="icons/icon-192.png">
<style>html{box-sizing:border-box}:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);background:#0e2a3b}body{margin:0}</style>
</head><body>
`;
fs.mkdirSync('dist',{recursive:true});// in un clone del repository basta scrivere index.html nella radice
fs.writeFileSync('dist/index.html',head+s.replace('/*PREVIEW*/true','false')+'\n</body></html>\n');
console.log('ok',s.length);
