(function(){
var d=document,rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function go(){
// Auto-hooks: the board-built components get entrance motion from their own class, no extra Webflow classes needed.
// Repeated cards rise (staggered per parent); product reps and phone crops slide. An element inside another hooked element is skipped (no double motion).
var AUTO={'ts-rise':'.ts-step-card,.ts-aud-card,.ts-postcard,.ts-mix-card,.ts-row,.ts-price-card,.ts-faq-item,.ts-kind,.ts-pay-card,.ts-route-stop,.ts-yb-card,.ts-team-card,.ts-index-card,.ts-field-plate,.ts-feature,.ts-route-card,.ts-help','ts-slide':'.ts-ui,.ts-screen'};
var ALL=AUTO['ts-rise']+','+AUTO['ts-slide'];
Object.keys(AUTO).forEach(function(cls){[].forEach.call(d.querySelectorAll(AUTO[cls]),function(el){
if(el.closest('.ts-hero,.ts-ahero'))return;
if(el.parentElement&&el.parentElement.closest(ALL+',.ts-rise,.ts-slide'))return;
el.classList.add(cls)})});
var els=[].slice.call(d.querySelectorAll('.ts-section .ts-item,.ts-rise,.ts-fade,.ts-slide,.ts-character')),g=new Map();
els.forEach(function(el){var p=el.parentElement,n=g.get(p)||0;el.style.setProperty('--i',Math.min(n,7));g.set(p,n+1);
el.addEventListener('transitionend',function h(e){if(e.propertyName==='transform'||e.propertyName==='opacity'){el.style.setProperty('--i',0);el.removeEventListener('transitionend',h)}})});
function show(el){el.classList.add('is-in')}
if(rm||!('IntersectionObserver' in window)){els.forEach(show);return}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){show(e.target);io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:0.1});
els.forEach(function(el){io.observe(el)});
setTimeout(function(){els.forEach(function(el){var r=el.getBoundingClientRect();if(r.top<innerHeight)show(el)})},1500);
}
window.tsToast=function(el){if(!el)return;var t,left=parseInt(getComputedStyle(d.documentElement).getPropertyValue('--motion-toast'))||2800,start;
function hide(){el.classList.remove('is-in')}
function run(){start=Date.now();t=setTimeout(hide,left)}
function pause(){clearTimeout(t);left-=Date.now()-start}
el.classList.add('is-in');run();
el.onmouseenter=el.onfocusin=pause;el.onmouseleave=el.onfocusout=function(){if(!el.matches(':hover,:focus-within'))run()}};
if(d.readyState!=='loading')go();else d.addEventListener('DOMContentLoaded',go);
})();
