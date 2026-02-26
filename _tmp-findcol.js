const fs = require('fs'); 
const s = fs.readFileSync('.next/server/chunks/ssr/_c56b3d5a._.js', 'utf8'); 
const needle = 'a.i(71764)'; 
const idx = s.indexOf(needle); 
const before = s.slice(0, idx); 
const line = before.split('\n').length; 
const lastNl = before.lastIndexOf('\n'); 
const col = idx - lastNl - 1; 
console.log('idx=' + idx + ' line=' + line + ' col=' + col); 
