const fs = require('fs'); 
const s = fs.readFileSync('.next/server/chunks/ssr/_c56b3d5a._.js', 'utf8'); 
const arr = ['a.i(12034)','a.i(71764)','var L=a.i(71764)']; 
arr.forEach(function(needle){ const idx=s.indexOf(needle); const before=s.slice(0,idx); const line=before.split('\n').length; const col=idx-before.lastIndexOf('\n')-1; console.log(needle + ' line=' + line + ' col=' + col); }); 
