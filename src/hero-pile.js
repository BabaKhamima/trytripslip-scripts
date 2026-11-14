/* TripSlip hero pile (expressive-layer §7/7a).
   Home hero (2026-11-13): 12 character faces (ts-face-*.svg, tiles as drawn) in a 5-4-3 stack, slots .is-p1–.is-p12.
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

  // Motion uses the individual translate / rotate / scale properties, which compose with each face's resting
  // transform (the slot tilt set in Webflow, e.g. .is-p3 rotate(-2deg)), so a face keeps its tilt while it drops,
  // wiggles and bounces instead of snapping straight and back.
  var css =
    '[data-ts-pile] .ts-pile-face{transform-origin:50% 100%;will-change:translate,rotate,scale}' +
    '@keyframes ts-fall-in{0%{translate:0 calc(var(--from,240px)*-1);rotate:var(--spin,0deg);opacity:0}' +
    '8%{opacity:1}62%{translate:0 0;rotate:0deg;scale:1.06 .9}74%{translate:0 calc(var(--hop,16px)*-1);scale:.97 1.04}' +
    '88%{translate:0 0;scale:1.02 .98}100%{translate:0 0;rotate:0deg;scale:1;opacity:1}}' +
    '@keyframes ts-wiggle{0%,100%{rotate:0deg}25%{rotate:var(--wig,4deg)}50%{rotate:calc(var(--wig,4deg)*-1)}75%{rotate:calc(var(--wig,4deg)*.5)}}' +
    '@keyframes ts-bounce{0%,100%{translate:0 0;scale:1}40%{translate:0 -9px}70%{translate:0 0;scale:1.03 .97}}' +
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
    faces.forEach(function (f) { f.setAttribute('aria-hidden', 'true'); if (f.loading === 'lazy') f.loading = 'eager'; });
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
