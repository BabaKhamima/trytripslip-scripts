/*! trytripslip-scripts v0.1.3 | motion-specs v2.1 + hero pile + UTM capture + role prefill | github.com/BabaKhamima/trytripslip-scripts */
document.documentElement.classList.add('ts-js');
(function(){if(document.getElementById('ts-motion-css'))return;var s=document.createElement('style');s.id='ts-motion-css';s.textContent=":root{--motion-press:120ms;--ease-press:ease;--motion-fade:200ms;--ease-fade:ease-out;--motion-move:280ms;--ease-move:cubic-bezier(0.2,0.8,0.2,1);--motion-sheet-in:300ms;--motion-exit:220ms;--ease-exit:cubic-bezier(0.4,0,1,1);--motion-skeleton:1200ms;--ease-skeleton:linear;--motion-toast:2800ms;--motion-toast-enter:300ms;--motion-toast-exit:300ms;--motion-stagger:50ms;--motion-press-scale:0.97;--motion-backdrop-opacity:0.42;--motion-bob:5px;--motion-slide-x:24px;--motion-rise-y:8px;--motion-wave-angle:20deg;}:where(a,button,input,select,textarea,summary,[tabindex]):focus-visible{outline:2px solid #0364FF;outline-offset:2px}.ts-btn,.ts-press{transition:background-color var(--motion-press) var(--ease-press),transform var(--motion-press) var(--ease-press)}.button{transition:background-color 200ms ease,color 200ms ease,transform var(--motion-press) var(--ease-press)}.ts-btn:active,.ts-press:active,.button:active{transform:scale(var(--motion-press-scale))}.ts-js .ts-fade{opacity:0;transition:opacity var(--motion-fade) var(--ease-fade)}.ts-js .ts-fade.is-in{opacity:1}.ts-js .ts-section .ts-item,.ts-js .ts-rise{opacity:.6;transform:translateY(var(--motion-rise-y))}.ts-js .ts-slide{opacity:.6;transform:translateX(var(--motion-slide-x))}.ts-js .ts-slide.is-back{transform:translateX(calc(var(--motion-slide-x)*-1))}.ts-js .ts-section .ts-item,.ts-js .ts-rise,.ts-js .ts-slide{transition:opacity var(--motion-move) var(--ease-move),transform var(--motion-move) var(--ease-move),box-shadow var(--motion-move) var(--ease-move);transition-delay:calc(var(--motion-stagger)*var(--i,0))}.ts-js .ts-section .ts-item.is-in,.ts-js .ts-rise.is-in,.ts-js .ts-slide.is-in{opacity:1;transform:none}.ts-js .ts-section .ts-item.is-in:hover{transform:translate(-2px,-2px);transition-delay:0s}.ts-sheet{position:fixed;inset:auto 0 0 0;max-height:90dvh;overflow-y:auto;transform:translateY(100%);visibility:hidden;pointer-events:none;transition:transform var(--motion-exit) var(--ease-exit),visibility 0s linear var(--motion-exit)}.ts-sheet.is-open{transform:none;visibility:visible;pointer-events:auto;transition:transform var(--motion-sheet-in) var(--ease-move),visibility 0s}.ts-backdrop{position:fixed;inset:0;background:#000;opacity:0;visibility:hidden;pointer-events:none;transition:opacity var(--motion-exit) var(--ease-exit),visibility 0s linear var(--motion-exit)}.ts-backdrop.is-open{opacity:var(--motion-backdrop-opacity);visibility:visible;pointer-events:auto;transition:opacity var(--motion-sheet-in) var(--ease-move),visibility 0s}@keyframes ts-shimmer{from{transform:translateX(-100%)}to{transform:translateX(250%)}}.ts-skeleton{position:relative;overflow:hidden}.ts-skeleton::after{content:\"\";position:absolute;inset:0 auto 0 0;width:40%;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.7),rgba(255,255,255,0));animation:ts-shimmer var(--motion-skeleton) var(--ease-skeleton) infinite}.ts-toast{position:fixed;opacity:0;transform:translateY(var(--motion-rise-y));visibility:hidden;pointer-events:none;transition:opacity var(--motion-toast-exit) var(--ease-exit),transform var(--motion-toast-exit) var(--ease-exit),visibility 0s linear var(--motion-toast-exit)}.ts-toast.is-in{opacity:1;transform:none;visibility:visible;pointer-events:auto;transition:opacity var(--motion-toast-enter) var(--ease-move),transform var(--motion-toast-enter) var(--ease-move),visibility 0s}.ts-character .ts-arm-l,.ts-character .ts-arm-r{transform-box:view-box;transform-origin:var(--pivot-x) var(--pivot-y)}@keyframes ts-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(calc(var(--motion-bob)*-1))}}.ts-character.is-in .ts-arm-l{animation:ts-wave-l 900ms var(--ease-move) 2}.ts-character.is-in .ts-arm-r{animation:ts-wave-r 900ms var(--ease-move) 120ms 2}.ts-character.is-in .ts-body{animation:ts-bob 900ms var(--ease-move) 2}.ts-character.is-arms-down.is-in .ts-arm-l{animation-name:ts-wave-r}.ts-character.is-arms-down.is-in .ts-arm-r{animation-name:ts-wave-l}@keyframes ts-wave-l{0%,100%{transform:rotate(0)}30%{transform:rotate(calc(var(--motion-wave-angle)*-1))}70%{transform:rotate(calc(var(--motion-wave-angle)*0.5))}}@keyframes ts-wave-r{0%,100%{transform:rotate(0)}30%{transform:rotate(var(--motion-wave-angle))}70%{transform:rotate(calc(var(--motion-wave-angle)*-0.5))}}.ts-switch-thumb,.ts-check,.ts-chip{transition:background-color var(--motion-fade) var(--ease-fade),border-color var(--motion-fade) var(--ease-fade),transform var(--motion-fade) var(--ease-fade)}.ts-progress-fill{transform-origin:left;transition:transform var(--motion-move) var(--ease-move)}@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important}.ts-js .ts-section .ts-item,.ts-js .ts-rise,.ts-js .ts-slide,.ts-sheet,.ts-toast{transform:none!important;transition:opacity var(--motion-fade) var(--ease-fade)!important}.ts-js .ts-section .ts-item,.ts-js .ts-rise,.ts-js .ts-slide{opacity:1!important}.ts-skeleton::after{animation:none!important}.ts-sheet{opacity:0}.ts-sheet.is-open{opacity:1}.ts-character,.ts-character *{animation:none!important}}.ts-split .ts-split-label,.ts-split .ts-split-arrow{transition:transform var(--motion-move,280ms) var(--ease-move,cubic-bezier(.2,.8,.2,1)),background-color var(--motion-fade,200ms) var(--ease-fade,ease-out)}.ts-split:hover .ts-split-arrow,.ts-split:focus-visible .ts-split-arrow{transform:translateX(4px)}.ts-split:hover .ts-split-label:not(.is-outline),.ts-split:hover .ts-split-arrow:not(.is-outline){background-color:#0052D6}.ts-split:hover .ts-split-arrow.is-outline,.ts-split:focus-visible .ts-split-arrow.is-outline{background-color:#FCC551}.ts-split:focus-visible{outline:none}.ts-split:focus-visible .ts-split-label{outline:2px solid #0364FF;outline-offset:2px}.ts-step-card{transition:transform var(--motion-move,280ms) var(--ease-move,cubic-bezier(.2,.8,.2,1)),box-shadow var(--motion-move,280ms) var(--ease-move,cubic-bezier(.2,.8,.2,1))}.ts-step-card:hover,.ts-step-card:focus-within{transform:translate(-2px,-2px) rotate(0deg)!important;box-shadow:4px 4px 0 0 #0A0A0A;z-index:5}.ts-aud-card{transition:transform var(--motion-move,280ms) var(--ease-move,cubic-bezier(.2,.8,.2,1)),box-shadow var(--motion-move,280ms) var(--ease-move,cubic-bezier(.2,.8,.2,1))}.ts-aud-card:hover,.ts-aud-card:focus-visible{transform:translate(-2px,-2px);box-shadow:4px 4px 0 0 #0A0A0A,inset 0 0 0 2px #0A0A0A}.ts-aud-card:hover .ts-aud-arrow,.ts-aud-card:focus-visible .ts-aud-arrow{background-color:#0A0A0A;color:#fff}.ts-row{transition:box-shadow var(--motion-move,280ms) var(--ease-move,cubic-bezier(.2,.8,.2,1))}.ts-row .ts-row-crop{transition:transform var(--motion-move,280ms) var(--ease-move,cubic-bezier(.2,.8,.2,1))}.ts-row:hover{box-shadow:inset 0 3px 0 0 #0A0A0A}.ts-row:hover .ts-row-crop{transform:rotate(-3deg)}.ts-chip-text{transition:background-color var(--motion-fade,200ms) var(--ease-fade,ease-out),border-color var(--motion-fade,200ms) var(--ease-fade,ease-out)}.ts-chip:hover .ts-chip-text{background-color:#F4F1EA}.ts-chip-input:checked+.ts-chip-text{background-color:#E8F0FF;border-color:#0364FF;color:#0052D6}.ts-chip-input:checked+.ts-chip-text::before{content:\"\\2713\";margin-right:.4em;font-weight:700}.ts-chip-input:focus-visible+.ts-chip-text{outline:2px solid #0364FF;outline-offset:2px}.ts-input:focus{outline:none;border-color:#0364FF;box-shadow:0 0 0 3px rgba(3,100,255,.18)}.ts-input:user-invalid{border-color:#B42318}.ts-submit:hover{background-color:#0052D6}.ts-submit:focus-visible{outline:2px solid #0364FF;outline-offset:3px}@media (prefers-reduced-motion: reduce){.ts-split:hover .ts-split-arrow,.ts-split:focus-visible .ts-split-arrow{transform:none}.ts-step-card:hover,.ts-step-card:focus-within,.ts-aud-card:hover,.ts-aud-card:focus-visible{transform:none!important}.ts-row:hover .ts-row-crop{transform:none}}";document.head.appendChild(s)})();
/* ---- motion.js ---- */
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

