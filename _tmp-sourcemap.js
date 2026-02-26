const fs = require('fs'); 
const tm = require('@jridgewell/trace-mapping'); 
const raw = fs.readFileSync('.next/server/chunks/ssr/_c56b3d5a._.js.map', 'utf8'); 
const map = new tm.TraceMap(raw); 
[47294,58894].forEach(function(column) { 
  const p = tm.originalPositionFor(map, { line: 3, column: column }); 
  console.log('col ' + column + ' src ' + p.source + ':' + p.line + ':' + p.column + ' name=' + p.name); 
}); 
