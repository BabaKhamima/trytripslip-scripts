/*! trytripslip-scripts v0.1.9 | motion-specs v2.1 + hero pile + UTM capture + role prefill | github.com/BabaKhamima/trytripslip-scripts */
document.documentElement.classList.add('ts-js');
(function(){if(document.getElementById('ts-motion-css'))return;var s=document.createElement('style');s.id='ts-motion-css';s.textContent=":root{--motion-press:120ms;--ease-press:ease;--motion-fade:200ms;--ease-fade:ease-out;--motion-move:280ms;--ease-move:cubic-bezier(0.2,0.8,0.2,1);--motion-sheet-in:300ms;--motion-exit:220ms;--ease-exit:cubic-bezier(0.4,0,1,1);--motion-skeleton:1200ms;--ease-skeleton:linear;--motion-toast:2800ms;--motion-toast-enter:300ms;--motion-toast-exit:300ms;--motion-stagger:50ms;--motion-press-scale:0.97;--motion-backdrop-opacity:0.42;--motion-bob:5px;--motion-slide-x:24px;--motion-rise-y:8px;--motion-wave-angle:20deg;}:where(a,button,input,select,textarea,summary,[tabindex]):focus-visible{outline:2px solid #0364FF;outline-offset:2px}.ts-btn,.ts-press{transition:background-color var(--motion-press) var(--ease-press),transform var(--motion-press) var(--ease-press)}.button{transition:background-color 200ms ease,color 200ms ease,transform var(--motion-press) var(--ease-press)}.ts-btn:active,.ts-press:active,.button:active{transform:scale(var(--motion-press-scale))}.ts-js .ts-fade{opacity:0;transition:opacity var(--motion-fade) var(--ease-fade)}.ts-js .ts-fade.is-in{opacity:1}.ts-js .ts-section .ts-item,.ts-js .ts-rise{opacity:.6;translate:0 var(--motion-rise-y)}.ts-js .ts-slide{opacity:.6;translate:var(--motion-slide-x) 0}.ts-js .ts-slide.is-back{translate:calc(var(--motion-slide-x)*-1) 0}.ts-js .ts-section .ts-item,.ts-js .ts-rise,.ts-js .ts-slide{transition:opacity var(--motion-move) var(--ease-move),translate var(--motion-move) var(--ease-move),transform var(--motion-move) var(--ease-move),box-shadow var(--motion-move) var(--ease-move);transition-delay:calc(var(--motion-stagger)*var(--i,0))}.ts-js .ts-section .ts-item.is-in,.ts-js .ts-rise.is-in,.ts-js .ts-slide.is-in{opacity:1;translate:none}.ts-js .ts-section .ts-item.is-in:hover{transform:translate(-2px,-2px);transition-delay:0s}.ts-sheet{position:fixed;inset:auto 0 0 0;max-height:90dvh;overflow-y:auto;transform:translateY(100%);visibility:hidden;pointer-events:none;transition:transform var(--motion-exit) var(--ease-exit),visibility 0s linear var(--motion-exit)}.ts-sheet.is-open{transform:none;visibility:visible;pointer-events:auto;transition:transform var(--motion-sheet-in) var(--ease-move),visibility 0s}.ts-backdrop{position:fixed;inset:0;background:#000;opacity:0;visibility:hidden;pointer-events:none;transition:opacity var(--motion-exit) var(--ease-exit),visibility 0s linear var(--motion-exit)}.ts-backdrop.is-open{opacity:var(--motion-backdrop-opacity);visibility:visible;pointer-events:auto;transition:opacity var(--motion-sheet-in) var(--ease-move),visibility 0s}@keyframes ts-shimmer{from{transform:translateX(-100%)}to{transform:translateX(250%)}}.ts-skeleton{position:relative;overflow:hidden}.ts-skeleton::after{content:\"\";position:absolute;inset:0 auto 0 0;width:40%;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.7),rgba(255,255,255,0));animation:ts-shimmer var(--motion-skeleton) var(--ease-skeleton) infinite}.ts-toast{position:fixed;opacity:0;transform:translateY(var(--motion-rise-y));visibility:hidden;pointer-events:none;transition:opacity var(--motion-toast-exit) var(--ease-exit),transform var(--motion-toast-exit) var(--ease-exit),visibility 0s linear var(--motion-toast-exit)}.ts-toast.is-in{opacity:1;transform:none;visibility:visible;pointer-events:auto;transition:opacity var(--motion-toast-enter) var(--ease-move),transform var(--motion-toast-enter) var(--ease-move),visibility 0s}.ts-character .ts-arm-l,.ts-character .ts-arm-r{transform-box:view-box;transform-origin:var(--pivot-x) var(--pivot-y)}@keyframes ts-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(calc(var(--motion-bob)*-1))}}.ts-character.is-in .ts-arm-l{animation:ts-wave-l 900ms var(--ease-move) 2}.ts-character.is-in .ts-arm-r{animation:ts-wave-r 900ms var(--ease-move) 120ms 2}.ts-character.is-in .ts-body{animation:ts-bob 900ms var(--ease-move) 2}.ts-character.is-arms-down.is-in .ts-arm-l{animation-name:ts-wave-r}.ts-character.is-arms-down.is-in .ts-arm-r{animation-name:ts-wave-l}@keyframes ts-wave-l{0%,100%{transform:rotate(0)}30%{transform:rotate(calc(var(--motion-wave-angle)*-1))}70%{transform:rotate(calc(var(--motion-wave-angle)*0.5))}}@keyframes ts-wave-r{0%,100%{transform:rotate(0)}30%{transform:rotate(var(--motion-wave-angle))}70%{transform:rotate(calc(var(--motion-wave-angle)*-0.5))}}.ts-switch-thumb,.ts-check,.ts-chip{transition:background-color var(--motion-fade) var(--ease-fade),border-color var(--motion-fade) var(--ease-fade),transform var(--motion-fade) var(--ease-fade)}.ts-progress-fill{transform-origin:left;transition:transform var(--motion-move) var(--ease-move)}@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important}.ts-js .ts-section .ts-item,.ts-js .ts-rise,.ts-js .ts-slide{translate:none!important}.ts-sheet,.ts-toast{transform:none!important}.ts-js .ts-section .ts-item,.ts-js .ts-rise,.ts-js .ts-slide,.ts-sheet,.ts-toast{transition:opacity var(--motion-fade) var(--ease-fade)!important}.ts-js .ts-section .ts-item,.ts-js .ts-rise,.ts-js .ts-slide{opacity:1!important}.ts-skeleton::after{animation:none!important}.ts-sheet{opacity:0}.ts-sheet.is-open{opacity:1}.ts-character,.ts-character *{animation:none!important}}.ts-split .ts-split-label,.ts-split .ts-split-arrow{transition:transform var(--motion-move,280ms) var(--ease-move,cubic-bezier(.2,.8,.2,1)),background-color var(--motion-fade,200ms) var(--ease-fade,ease-out)}.ts-split:hover .ts-split-arrow,.ts-split:focus-visible .ts-split-arrow{transform:translateX(4px)}.ts-split:hover .ts-split-label:not(.is-outline),.ts-split:hover .ts-split-arrow:not(.is-outline){background-color:#0052D6}.ts-split:hover .ts-split-arrow.is-outline,.ts-split:focus-visible .ts-split-arrow.is-outline{background-color:#FCC551}.ts-split:focus-visible{outline:none}.ts-split:focus-visible .ts-split-label{outline:2px solid #0364FF;outline-offset:2px}.ts-step-card{transition:transform var(--motion-move,280ms) var(--ease-move,cubic-bezier(.2,.8,.2,1)),box-shadow var(--motion-move,280ms) var(--ease-move,cubic-bezier(.2,.8,.2,1))}.ts-step-card:hover,.ts-step-card:focus-within{transform:translate(-2px,-2px) rotate(0deg)!important;box-shadow:4px 4px 0 0 #0A0A0A;z-index:5}.ts-aud-card{transition:transform var(--motion-move,280ms) var(--ease-move,cubic-bezier(.2,.8,.2,1)),box-shadow var(--motion-move,280ms) var(--ease-move,cubic-bezier(.2,.8,.2,1))}.ts-aud-card:hover,.ts-aud-card:focus-visible{transform:translate(-2px,-2px);box-shadow:4px 4px 0 0 #0A0A0A,inset 0 0 0 2px #0A0A0A}.ts-aud-card:hover .ts-aud-arrow,.ts-aud-card:focus-visible .ts-aud-arrow{background-color:#0A0A0A;color:#fff}.ts-row{transition:box-shadow var(--motion-move,280ms) var(--ease-move,cubic-bezier(.2,.8,.2,1))}.ts-row .ts-row-crop{transition:transform var(--motion-move,280ms) var(--ease-move,cubic-bezier(.2,.8,.2,1))}.ts-row:hover{box-shadow:inset 0 3px 0 0 #0A0A0A}.ts-row:hover .ts-row-crop{transform:rotate(-3deg)}.ts-chip-text{transition:background-color var(--motion-fade,200ms) var(--ease-fade,ease-out),border-color var(--motion-fade,200ms) var(--ease-fade,ease-out)}.ts-chip:hover .ts-chip-text{background-color:#F4F1EA}.ts-chip-input:checked+.ts-chip-text{background-color:#E8F0FF;border-color:#0364FF;color:#0052D6}.ts-chip-input:checked+.ts-chip-text::before{content:\"\\2713\";margin-right:.4em;font-weight:700}.ts-chip-input:focus-visible+.ts-chip-text{outline:2px solid #0364FF;outline-offset:2px}.ts-input:focus{outline:none;border-color:#0364FF;box-shadow:0 0 0 3px rgba(3,100,255,.18)}.ts-input:user-invalid{border-color:#B42318}.ts-submit:hover{background-color:#0052D6}.ts-submit:focus-visible{outline:2px solid #0364FF;outline-offset:3px}.ts-blob-pre{opacity:0!important;scale:.85}.ts-blob-anim{transition:opacity 480ms cubic-bezier(.2,.8,.2,1),scale 480ms cubic-bezier(.2,.8,.2,1)}.ts-price-item::before{content:\"\";position:absolute;left:.125rem;top:.4em;width:.8rem;height:.45rem;border-left:2px solid #0A0A0A;border-bottom:2px solid #0A0A0A;transform:rotate(-45deg)}.ts-faq-q::-webkit-details-marker{display:none}.ts-faq-q::marker{content:\"\"}.ts-faq-q::after{content:\"\";position:absolute;right:.5rem;top:50%;width:1.25rem;height:1.25rem;margin-top:-.625rem;background:linear-gradient(#0A0A0A,#0A0A0A) center/100% 2px no-repeat,linear-gradient(#0A0A0A,#0A0A0A) center/2px 100% no-repeat;transition:transform var(--motion-move,280ms) var(--ease-move,cubic-bezier(.2,.8,.2,1))}.ts-faq-item[open]>.ts-faq-q::after{transform:rotate(45deg)}.ts-faq-q:hover{text-decoration:underline;text-underline-offset:4px}.ts-faq-q:focus-visible{outline:2px solid #0364FF;outline-offset:2px}@media (prefers-reduced-motion: reduce){.ts-faq-q::after{transition:none}}@media (prefers-reduced-motion: reduce){.ts-split:hover .ts-split-arrow,.ts-split:focus-visible .ts-split-arrow{transform:none}.ts-step-card:hover,.ts-step-card:focus-within,.ts-aud-card:hover,.ts-aud-card:focus-visible{transform:none!important}.ts-row:hover .ts-row-crop{transform:none}}.ts-egg{appearance:none;-webkit-appearance:none;cursor:pointer}.ts-js .ts-egg:not(.is-active){display:none!important}.ts-egg .ts-egg-tile{background:none!important;border:0!important;border-radius:50%!important;box-shadow:none!important;display:flex;align-items:center;justify-content:center}.ts-egg .ts-egg-face,.ts-egg .ts-egg-tile img{width:100%!important;max-width:none;height:auto;display:block;clip-path:circle(50%)}.ts-egg .ts-egg-tile img,.ts-egg-toast-tile img{animation:ts-face-idle 4.8s ease-in-out var(--idle-delay,0s) infinite}@keyframes ts-face-idle{0%,100%{translate:0 0;rotate:0deg}30%{translate:0 -2px;rotate:-3deg}60%{translate:0 -1px;rotate:2.5deg}}.ts-egg:hover .ts-egg-tile img{animation-play-state:paused}.ts-egg .ts-egg-tile{transition:transform 560ms cubic-bezier(.34,1.56,.64,1)}.ts-js .ts-egg.is-pre .ts-egg-tile{transform:translateY(110%)}.ts-egg.is-wiggle .ts-egg-tile{animation:ts-egg-wiggle 7s ease-in-out var(--egg-delay,2s) infinite}.ts-egg.is-wiggle:hover .ts-egg-tile,.ts-egg.is-wiggle:focus-visible .ts-egg-tile{animation-play-state:paused}@keyframes ts-egg-wiggle{0%,84%,100%{transform:translateY(14px) rotate(0)}87%{transform:translateY(4px) rotate(-10deg)}90%{transform:translateY(4px) rotate(9deg)}93%{transform:translateY(6px) rotate(-6deg)}96%{transform:translateY(10px) rotate(3deg)}}.ts-egg:focus-visible{outline:2px solid #0364FF;outline-offset:2px;border-radius:50%}.ts-egg[hidden],.ts-egg.is-found{display:none!important}.ts-eggs-done .ts-egg .ts-egg-tile{animation:none!important;transition:none!important}.ts-egg-pill{position:fixed;left:16px;bottom:16px;z-index:60;display:flex;align-items:center;gap:10px;padding:6px 8px 6px 6px;background:#FFFDF7;border:1.5px solid #0A0A0A;border-radius:999px;box-shadow:2px 2px 0 #0A0A0A;color:#0A0A0A;font:inherit}.ts-egg-pill[hidden]{display:none}.ts-egg-pill.is-done{background:#FCC551}.ts-egg-pill-tile,.ts-egg-toast-tile{display:flex;align-items:center;justify-content:center;flex:none;background:none;border:0}.ts-egg-pill-tile img,.ts-egg-toast-tile img{clip-path:circle(50%);display:block}.ts-egg-pill-tile{width:32px;height:32px;border-radius:50%}.ts-egg-pill-tile img{width:100%;height:auto}.ts-egg-pill-tile.is-hop img{animation:ts-face-hop 520ms cubic-bezier(.34,1.56,.64,1)}@keyframes ts-face-hop{0%,100%{translate:0 0;rotate:0deg}40%{translate:0 -5px;rotate:-8deg}70%{translate:0 1px;rotate:4deg}}.ts-egg-pill-text{display:flex;flex-direction:column;gap:4px}.ts-egg-pill-label{font-size:14px;font-weight:700;line-height:1.1}.ts-egg-pill-dots{display:flex;gap:4px}.ts-egg-pill-dots i{width:6px;height:6px;border-radius:50%;border:1px solid #0A0A0A}.ts-egg-pill-dots i.is-on{background:#0A0A0A}.ts-egg-pill-close,.ts-egg-toast-close{appearance:none;border:0;background:none;color:#0A0A0A;font:inherit;font-size:20px;line-height:1;width:32px;height:32px;cursor:pointer;border-radius:50%}.ts-egg-pill-close:focus-visible,.ts-egg-toast-close:focus-visible{outline:2px solid #0364FF;outline-offset:1px}.ts-egg-toast{position:fixed;left:16px;bottom:72px;z-index:61;display:flex;align-items:center;gap:14px;width:min(340px,calc(100vw - 32px));padding:14px 10px 14px 14px;background:#FFFDF7;border:2px solid #0A0A0A;border-radius:14px;box-shadow:4px 4px 0 #0A0A0A;color:#0A0A0A;opacity:0;transform:translateY(8px);pointer-events:none;transition:opacity 280ms ease-out,transform 280ms cubic-bezier(.2,.8,.2,1)}.ts-egg-toast.is-in{opacity:1;transform:none;pointer-events:auto}.ts-egg-toast-tile{width:52px;height:52px;border-radius:50%}.ts-egg-toast-tile img{width:100%;height:auto}.ts-egg-toast-body{display:flex;flex-direction:column;gap:2px;flex:1}.ts-egg-toast-title{font-size:18px;font-weight:700;line-height:1.2}.ts-egg-toast-sub{font-size:13.5px;line-height:1.35;color:#5E5A52}@media (max-width:479px){.ts-egg-pill{left:50%;transform:translateX(-50%)}.ts-egg-toast{left:16px;bottom:76px}}@media (prefers-reduced-motion: reduce){.ts-egg .ts-egg-tile,.ts-egg .ts-egg-tile img,.ts-egg-toast-tile img,.ts-egg-pill-tile img{animation:none!important;transition:none!important}.ts-egg-toast{transform:none;transition:opacity 200ms ease-out}}";document.head.appendChild(s)})();
/* ---- motion.js ---- */
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

/* ---- hero-pile.js ---- */
/* TripSlip hero pile (expressive-layer §7/7a).
   Markup: <div data-ts-pile> containing children with class .ts-pile-face (img or inline svg),
   each positioned by the page's own CSS (the resting pile). The script only animates.
   Optional: a button with [data-ts-pile-pause] toggles idle motion (WCAG 2.2.2).
   - Drop-in plays once per browser session (sessionStorage), <= 1.8s, 60ms stagger, bottom row first.
   - Idle: every 12–18s, 3–5 random faces wiggle (±3–6°, 1s), some bounce 9px. 80ms stagger.
   - Paused when the hero is off-screen or the tab is hidden.
   - Hover/focus a face: one wiggle.
   - prefers-reduced-motion: static settled pile, no drop, no idle. */
(function () {
  var KEY = 'ts-pile-played';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var css =
    '[data-ts-pile] .ts-pile-face{transform-origin:50% 100%;will-change:transform}' +
    '@keyframes ts-fall-in{0%{transform:translateY(calc(var(--from,240px)*-1)) rotate(var(--spin,0deg));opacity:0}' +
    '8%{opacity:1}62%{transform:translateY(0) scale(1.06,.9)}74%{transform:translateY(calc(var(--hop,16px)*-1)) scale(.97,1.04)}' +
    '88%{transform:translateY(0) scale(1.02,.98)}100%{transform:none;opacity:1}}' +
    '@keyframes ts-wiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(var(--wig,4deg))}50%{transform:rotate(calc(var(--wig,4deg)*-1))}75%{transform:rotate(calc(var(--wig,4deg)*.5))}}' +
    '@keyframes ts-bounce{0%,100%{transform:translateY(0)}40%{transform:translateY(-9px)}70%{transform:translateY(0) scale(1.03,.97)}}' +
    '[data-ts-pile].is-dropping .ts-pile-face{opacity:0;animation:ts-fall-in 720ms cubic-bezier(.2,.8,.2,1) var(--d,0ms) both}' +
    '[data-ts-pile] .ts-pile-face.is-wiggle{animation:ts-wiggle 1s ease-in-out}' +
    '[data-ts-pile] .ts-pile-face.is-bounce{animation:ts-bounce 700ms cubic-bezier(.2,.8,.2,1)}' +
    '@media (prefers-reduced-motion: reduce){[data-ts-pile] .ts-pile-face{animation:none!important;opacity:1!important}}';

  function inject() {
    if (document.getElementById('ts-pile-css')) return;
    var s = document.createElement('style');
    s.id = 'ts-pile-css';
    s.textContent = css;
    document.head.appendChild(s);
  }

  function played() { try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function markPlayed() { try { sessionStorage.setItem(KEY, '1'); } catch (e) {} }

  function rand(a, b) { return a + Math.random() * (b - a); }

  function wiggle(el, bounce) {
    var cls = bounce ? 'is-bounce' : 'is-wiggle';
    el.style.setProperty('--wig', (rand(3, 6) * (Math.random() < 0.5 ? -1 : 1)).toFixed(1) + 'deg');
    el.classList.remove('is-wiggle', 'is-bounce');
    void el.offsetWidth;
    el.classList.add(cls);
    el.addEventListener('animationend', function done() { el.classList.remove(cls); el.removeEventListener('animationend', done); });
  }

  function setup(pile) {
    var faces = [].slice.call(pile.querySelectorAll('.ts-pile-face'));
    if (!faces.length) return;
    faces.forEach(function (f) { f.setAttribute('aria-hidden', 'true'); });
    if (reduce) return;

    // drop-in: bottom row first (largest offsetTop + height lands first)
    if (!played()) {
      var order = faces.slice().sort(function (a, b) {
        return (b.offsetTop + b.offsetHeight) - (a.offsetTop + a.offsetHeight);
      });
      var stagger = Math.min(60, Math.floor(1080 / Math.max(1, order.length)));
      order.forEach(function (f, i) {
        f.style.setProperty('--d', (i * stagger) + 'ms');
        f.style.setProperty('--from', Math.round(rand(180, 320)) + 'px');
        f.style.setProperty('--hop', Math.round(rand(10, 26)) + 'px');
        f.style.setProperty('--spin', Math.round(rand(-12, 12)) + 'deg');
      });
      pile.classList.add('is-dropping');
      var total = (order.length - 1) * stagger + 720;
      setTimeout(function () { pile.classList.remove('is-dropping'); }, total + 50);
      markPlayed();
    }

    // hover / focus easter egg
    faces.forEach(function (f) {
      f.addEventListener('mouseenter', function () { wiggle(f, false); });
    });

    // idle wiggle with pause conditions
    var visible = true, paused = false, timer = null;
    function schedule() {
      clearTimeout(timer);
      if (!visible || paused || document.hidden) return;
      timer = setTimeout(function () {
        var n = Math.round(rand(3, 5)), pool = faces.slice();
        for (var i = 0; i < n && pool.length; i++) {
          var f = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
          (function (f, i) { setTimeout(function () { wiggle(f, Math.random() < 0.25); }, i * 80); })(f, i);
        }
        schedule();
      }, rand(12000, 18000));
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; schedule(); }, { threshold: 0.15 }).observe(pile);
    }
    document.addEventListener('visibilitychange', schedule);

    var btn = document.querySelector('[data-ts-pile-pause]');
    if (btn) {
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', function () {
        paused = !paused;
        btn.setAttribute('aria-pressed', String(paused));
        schedule();
      });
    }
    schedule();
  }

  function go() {
    var piles = document.querySelectorAll('[data-ts-pile]');
    if (!piles.length) return;
    inject();
    [].forEach.call(piles, setup);
  }
  if (document.readyState !== 'loading') go(); else document.addEventListener('DOMContentLoaded', go);
})();

/* ---- utm-capture.js ---- */
/* TripSlip UTM capture (zoho-funnel-plan §2).
   Fills hidden form fields named source-page, utm-source, utm-medium, utm-campaign, utm-content.
   First touch in a browser session wins: UTMs from the landing URL are kept in sessionStorage,
   so a visitor who lands on /schools?utm_source=x and submits on /contact still carries them.
   No cookies, no third parties, nothing about the visitor beyond what's in the URL. */
(function () {
  var KEY = 'ts-utm';
  var FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];

  function read() { try { return JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
  function write(v) { try { sessionStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }

  var params = new URLSearchParams(location.search);
  var fromUrl = {};
  var hasAny = false;
  FIELDS.forEach(function (k) {
    var v = params.get(k);
    if (v) { fromUrl[k] = v.slice(0, 200); hasAny = true; }
  });
  var stored = read();
  var utm = stored || (hasAny ? fromUrl : null);
  if (!stored && hasAny) write(fromUrl);

  // Webflow has no native hidden field: forms marked data-ts-utm get the five hidden inputs added here.
  function ensureHidden() {
    [].forEach.call(document.querySelectorAll('form[data-ts-utm]'), function (f) {
      ['source-page', 'utm-source', 'utm-medium', 'utm-campaign', 'utm-content'].forEach(function (n) {
        if (f.querySelector('input[name="' + n + '"]')) return;
        var i = document.createElement('input');
        i.type = 'hidden'; i.name = n;
        f.appendChild(i);
      });
    });
  }

  function fill() {
    ensureHidden();
    var set = function (name, value) {
      [].forEach.call(document.querySelectorAll('input[name="' + name + '"]'), function (i) {
        if (!i.value) i.value = value || '';
      });
    };
    set('source-page', location.pathname);
    FIELDS.forEach(function (k) { set(k.replace('_', '-'), utm && utm[k]); });
  }
  if (document.readyState !== 'loading') fill(); else document.addEventListener('DOMContentLoaded', fill);
})();

/* ---- role-prefill.js ---- */
/* TripSlip ?role= pre-select (section-prompts C1).
   On forms marked data-ts-role-prefill, checks the role radio named by the URL (?role=admin → school-admin).
   Only pre-selects; the visitor can change it. Ignores unknown values. */
(function () {
  var ALIAS = { admin: 'school-admin', 'school': 'school-admin', transport: 'transportation', guardian: 'parent' };
  var raw = (new URLSearchParams(location.search).get('role') || '').toLowerCase().trim();
  if (!raw || !/^[a-z-]{2,40}$/.test(raw)) return;
  var value = ALIAS[raw] || raw;
  function run() {
    [].forEach.call(document.querySelectorAll('form[data-ts-role-prefill]'), function (f) {
      var r = f.querySelector('input[type="radio"][name="role"][value="' + value + '"]');
      if (r && !f.querySelector('input[name="role"]:checked')) r.checked = true;
    });
  }
  if (document.readyState !== 'loading') run(); else document.addEventListener('DOMContentLoaded', run);
})();

/* ---- blob-in.js ---- */
/* TripSlip blob-in (expressive-layer mkt-motion-blob-in).
   Background tonal blobs scale 0.85→1 and fade in once as their section enters, staggered 60ms, then sit still.
   Targets the blob artwork itself (img[src*="ts-blob-"]), so every blob on every page is covered without extra classes.
   Uses the individual `scale` property so it composes with any rotate/translate a blob already has.
   Reduced motion or no IntersectionObserver: blobs simply show. */
(function () {
  var d = document;
  var rm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function go() {
    var blobs = [].slice.call(d.querySelectorAll('img[src*="ts-blob-"]'));
    if (!blobs.length || rm || !('IntersectionObserver' in window)) return;
    var groups = new Map();
    blobs.forEach(function (b) {
      var sec = b.closest('section') || b.parentElement;
      var n = groups.get(sec) || 0;
      groups.set(sec, n + 1);
      b.style.transitionDelay = Math.min(n, 5) * 60 + 'ms';
      b.classList.add('ts-blob-pre');
    });
    function show(b) {
      b.classList.add('ts-blob-anim');
      void b.offsetWidth; // commit the start state, then release it (no rAF: it stalls in background tabs)
      b.classList.remove('ts-blob-pre');
      b.addEventListener('transitionend', function h() {
        b.classList.remove('ts-blob-anim'); b.style.transitionDelay = ''; b.removeEventListener('transitionend', h);
      });
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var sec = e.target.closest('section') || e.target.parentElement;
        blobs.forEach(function (b) {
          if ((b.closest('section') || b.parentElement) === sec && b.classList.contains('ts-blob-pre')) { show(b); io.unobserve(b); }
        });
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    blobs.forEach(function (b) { io.observe(b); });
    // Safety net: never leave a blob hidden.
    setTimeout(function () { blobs.forEach(function (b) { if (b.classList.contains('ts-blob-pre') && b.getBoundingClientRect().top < innerHeight) show(b); }); }, 1500);
  }
  if (d.readyState !== 'loading') go(); else d.addEventListener('DOMContentLoaded', go);
})();

/* ---- egg.js ---- */
/* TripSlip hide-and-seek (W3 easter-egg layer), v2: daily hiding spots.
   26 spots (A–Z) live across the site as <button class="ts-egg" data-spot="A">…</button> elements. Each day (midnight,
   America/Detroit) a date-seeded shuffle picks TODAY_COUNT of them, never more than PER_PAGE on one page, and assigns
   the day's characters to them. Everyone sees the same layout on a given day. Progress resets at midnight.
   Before the day's first find: active faces pop up from behind their card once, then wiggle now and then.
   After the first find: the pop-up/wiggle stops; every face keeps a subtle idle bob (CSS). Counter pill appears after the first find.
   Reduced motion: faces just sit peeking. Never gates content; progress stays in localStorage. */
(function () {
  var KEY = 'ts-eggs-v2', PILL_KEY = 'ts-eggs-pill-hidden', TODAY_COUNT = 10, PER_PAGE = 2, TZ = 'America/Detroit';
  var CDN = 'https://cdn.prod.website-files.com/68b5bf7ebc6a5bee689433e6/';

  // Spot pool: letter → page. Must match the data-spot attributes placed in Webflow. Only published pages belong here.
  var POOL = [
    ['A', 'home'], ['B', 'home'], ['C', 'home'], ['D', 'home'], ['E', 'home'], ['F', 'home'],
    ['G', 'schools'], ['H', 'schools'], ['I', 'schools'], ['J', 'schools'], ['K', 'schools'],
    ['L', 'parents'], ['M', 'parents'], ['N', 'parents'], ['O', 'parents'],
    ['P', 'transportation'], ['Q', 'transportation'], ['R', 'transportation'], ['S', 'transportation'],
    ['T', 'pricing'], ['U', 'pricing'], ['V', 'pricing'],
    ['W', 'about'], ['X', 'about'], ['Y', 'about'], ['Z', 'about']
  ];
  var CAST = [
    ['bert', 'Bert', '6af56949a0c2d46246e99f66_ts-face-bert.svg', 'cyan'],
    ['bingo', 'Bingo', '6af569492ffaf023fb0c6973_ts-face-bingo.svg', 'lavender'],
    ['cataphract', 'Cataphract', '6af569492ffaf023fb0c69a0_ts-face-cataphract.svg', 'mint'],
    ['flake', 'Flake', '6af56949b7460b3d246ce03b_ts-face-flake.svg', 'pink'],
    ['flur', 'Flur', '6af5694931691ad790f6a0f6_ts-face-flur.svg', 'pink'],
    ['huh', 'Huh', '6af5694a08e7cab736d403d3_ts-face-huh.svg', 'yellow'],
    ['jar', 'Jar', '6af5694ac97c5a2528920fc4_ts-face-jar.svg', 'cyan'],
    ['leif', 'Leif', '6af5694a41a385c0805c9ac3_ts-face-leif.svg', 'lavender'],
    ['ohno', 'Oh No', '6af5694a27313a861dee4dfc_ts-face-ohno.svg', 'yellow'],
    ['spokes', 'Spokes', '6af5694a41a385c0805c9afe_ts-face-spokes.svg', 'mint'],
    ['winky', 'Winky', '6af5694b114f46e82ae985e8_ts-face-winky.svg', 'pink']
  ];

  var d = document, root = d.documentElement;
  var rm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function today() {
    try { return new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()); }
    catch (e) { var n = new Date(); return n.getFullYear() + '-' + (n.getMonth() + 1) + '-' + n.getDate(); }
  }
  function seedFrom(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function shuffle(arr, rand) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rand() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  // Today's plan: spot letter → cast member. Same for every visitor on the same Detroit date.
  function plan(day) {
    var rand = rng(seedFrom('tripslip-eggs:' + day));
    var perPage = {}, picked = [];
    shuffle(POOL, rand).forEach(function (s) {
      if (picked.length >= TODAY_COUNT) return;
      var n = perPage[s[1]] || 0;
      if (n >= PER_PAGE) return;
      perPage[s[1]] = n + 1; picked.push(s[0]);
    });
    var cast = shuffle(CAST, rand), map = {};
    picked.sort().forEach(function (letter, i) { map[letter] = cast[i]; });
    return map;
  }

  function load(day) {
    try { var v = JSON.parse(localStorage.getItem(KEY) || 'null'); if (v && v.day === day && Array.isArray(v.found)) return v.found; } catch (e) {}
    return [];
  }
  function save(day, found) { try { localStorage.setItem(KEY, JSON.stringify({ day: day, found: found })); } catch (e) {} }
  function has(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return true; return false; }
  function el(tag, cls, text) { var n = d.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }

  var pill, pillFace, pillLabel, pillDots, toast, toastTimer;

  function buildPill() {
    if (pill) return;
    pill = el('div', 'ts-egg-pill');
    var tile = el('span', 'ts-egg-pill-tile');
    pillFace = el('img'); pillFace.alt = ''; tile.appendChild(pillFace);
    var text = el('span', 'ts-egg-pill-text');
    pillLabel = el('span', 'ts-egg-pill-label');
    pillDots = el('span', 'ts-egg-pill-dots'); pillDots.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < TODAY_COUNT; i++) pillDots.appendChild(el('i'));
    text.appendChild(pillLabel); text.appendChild(pillDots);
    var close = el('button', 'ts-egg-pill-close', '×'); close.type = 'button'; close.setAttribute('aria-label', 'Hide the character counter');
    close.addEventListener('click', function () { pill.hidden = true; try { sessionStorage.setItem(PILL_KEY, '1'); } catch (e) {} });
    pill.appendChild(tile); pill.appendChild(text); pill.appendChild(close);
    d.body.appendChild(pill);
  }

  function renderPill(found, reveal) {
    buildPill();
    var last = found[found.length - 1], n = found.length, done = n >= TODAY_COUNT;
    pillFace.src = last.src || '';
    pillLabel.textContent = done ? 'All ' + TODAY_COUNT + ' found. New spots at midnight.' : n + ' of ' + TODAY_COUNT + ' found today';
    [].forEach.call(pillDots.children, function (dot, i) { dot.className = i < n ? 'is-on' : ''; });
    pill.classList.toggle('is-done', done);
    if (reveal) { var t = pillFace.parentNode; t.classList.remove('is-hop'); void t.offsetWidth; t.classList.add('is-hop'); }
    var hidden = false; try { hidden = sessionStorage.getItem(PILL_KEY) === '1'; } catch (e) {}
    if (reveal) { hidden = false; try { sessionStorage.removeItem(PILL_KEY); } catch (e) {} }
    pill.hidden = hidden;
  }

  function showToast(item, n) {
    if (!toast) {
      toast = el('div', 'ts-egg-toast'); toast.setAttribute('role', 'status'); toast.setAttribute('aria-live', 'polite');
      d.body.appendChild(toast);
    }
    toast.textContent = '';
    var tile = el('span', 'ts-egg-toast-tile'); var img = el('img'); img.alt = ''; img.src = item.src || ''; tile.appendChild(img);
    var body = el('span', 'ts-egg-toast-body');
    body.appendChild(el('strong', 'ts-egg-toast-title', 'You found ' + item.name + '!'));
    body.appendChild(el('span', 'ts-egg-toast-sub', n >= TODAY_COUNT ? 'That’s all ' + TODAY_COUNT + ' for today. They move at midnight.' : n + ' of ' + TODAY_COUNT + '. The rest are hiding around the site.'));
    var x = el('button', 'ts-egg-toast-close', '×'); x.type = 'button'; x.setAttribute('aria-label', 'Dismiss');
    x.addEventListener('click', hide);
    toast.appendChild(tile); toast.appendChild(body); toast.appendChild(x);
    void toast.offsetWidth;
    toast.classList.add('is-in');
    clearTimeout(toastTimer); toastTimer = setTimeout(hide, 4500);
    function hide() { toast.classList.remove('is-in'); }
  }

  function go() {
    var day = today(), map = plan(day), found = load(day);
    var eggs = [].slice.call(d.querySelectorAll('.ts-egg[data-spot]')).filter(function (e) {
      var who = map[e.getAttribute('data-spot')];
      if (!who) return false;
      // Dress the spot as today's character.
      e.setAttribute('data-egg', who[0]); e.setAttribute('data-egg-name', who[1]);
      e.setAttribute('aria-label', 'Hidden character: ' + who[1] + '. Click to collect.');
      var tile = e.querySelector('.ts-egg-tile'); if (tile) tile.className = 'ts-egg-tile is-' + who[3];
      var img = e.querySelector('img'); if (img) { img.removeAttribute('srcset'); img.removeAttribute('sizes'); img.src = CDN + who[2]; }
      e.classList.add('is-active');
      return true;
    });
    var animate = !found.length && !rm && 'IntersectionObserver' in window;
    if (found.length) root.classList.add('ts-eggs-done');

    function collect(e) {
      var id = e.getAttribute('data-egg');
      if (has(found, id)) return;
      var img = e.querySelector('img');
      var item = { id: id, name: e.getAttribute('data-egg-name') || 'a friend', src: img ? img.src : '' };
      found.push(item); save(day, found);
      root.classList.add('ts-eggs-done');
      eggs.forEach(function (x) { x.classList.remove('is-wiggle', 'is-pre'); });
      e.classList.add('is-found'); e.hidden = true;
      renderPill(found, true);
      showToast(item, found.length);
    }

    eggs.forEach(function (e, i) {
      if (has(found, e.getAttribute('data-egg'))) { e.classList.add('is-found'); e.hidden = true; return; }
      if (e.tagName !== 'BUTTON') { e.setAttribute('role', 'button'); if (!e.hasAttribute('tabindex')) e.tabIndex = 0; }
      e.addEventListener('click', function (ev) { ev.preventDefault(); collect(e); });
      e.addEventListener('keydown', function (ev) {
        if (e.tagName !== 'BUTTON' && (ev.key === 'Enter' || ev.key === ' ')) { ev.preventDefault(); collect(e); }
      });
      e.style.setProperty('--idle-delay', (-(i * 1.3) % 4.8).toFixed(1) + 's');
      if (animate) { e.classList.add('is-pre'); e.style.setProperty('--egg-delay', (2 + (i * 1.9) % 5).toFixed(1) + 's'); }
    });

    if (animate) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (x) {
          if (!x.isIntersecting) return;
          var e = x.target; io.unobserve(e);
          setTimeout(function () {
            e.classList.remove('is-pre');
            if (root.classList.contains('ts-eggs-done')) return;
            setTimeout(function () { if (!root.classList.contains('ts-eggs-done') && !e.hidden) e.classList.add('is-wiggle'); }, 800);
          }, 450);
        });
      }, { threshold: 0.5 });
      eggs.forEach(function (e) { if (!e.hidden) io.observe(e); });
    }

    if (found.length) renderPill(found, false);
  }

  // Exposed for QA: TSEggs.plan('2026-11-13') shows that day's spots.
  window.TSEggs = { plan: plan, today: today };
  if (d.readyState !== 'loading') go(); else d.addEventListener('DOMContentLoaded', go);
})();

