(function(){
var d=document,rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function go(){
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
