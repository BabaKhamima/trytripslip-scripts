// Concatenate src/ into one file per page: dist/tripslip.js (motion CSS injected + motion + hero pile + UTM capture).
// No dependencies. Run: node build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const css = (readFileSync('src/motion.css', 'utf8') + '\n' + readFileSync('src/components.css', 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '');
const parts = ['motion.js', 'hero-pile.js', 'utm-capture.js', 'role-prefill.js', 'label-fix.js', 'legal.js', 'blob-in.js', 'egg.js'].map(f => `/* ---- ${f} ---- */\n` + readFileSync(`src/${f}`, 'utf8'));

const cssInject = `(function(){if(document.getElementById('ts-motion-css'))return;var s=document.createElement('style');s.id='ts-motion-css';s.textContent=${JSON.stringify(css)};document.head.appendChild(s)})();`;

const out = `/*! trytripslip-scripts v${pkg.version} | motion-specs v2.1 + hero pile + UTM capture + role prefill | github.com/BabaKhamima/trytripslip-scripts */
document.documentElement.classList.add('ts-js');
${cssInject}
${parts.join('\n')}
`;
writeFileSync('dist/tripslip.js', out);
const sri = 'sha384-' + createHash('sha384').update(out).digest('base64');
writeFileSync('dist/tripslip.js.sri', sri + '\n');
console.log(`dist/tripslip.js  ${out.length} bytes\n${sri}`);
