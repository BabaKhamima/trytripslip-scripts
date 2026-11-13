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
    ['bert', 'Bert', '6af56949a0c2d46246e99f66_ts-face-bert.svg', 'cyan', '#0364FF'],
    ['bingo', 'Bingo', '6af569492ffaf023fb0c6973_ts-face-bingo.svg', 'lavender', '#D294F7'],
    ['cataphract', 'Cataphract', '6af569492ffaf023fb0c69a0_ts-face-cataphract.svg', 'mint', '#B3B6FB'],
    ['flake', 'Flake', '6af56949b7460b3d246ce03b_ts-face-flake.svg', 'pink', '#FF5000'],
    ['flur', 'Flur', '6af5694931691ad790f6a0f6_ts-face-flur.svg', 'pink', '#70DDEF'],
    ['huh', 'Huh', '6af5694a08e7cab736d403d3_ts-face-huh.svg', 'yellow', '#FEB38B'],
    ['jar', 'Jar', '6af5694ac97c5a2528920fc4_ts-face-jar.svg', 'cyan', '#FC4444'],
    ['leif', 'Leif', '6af5694a41a385c0805c9ac3_ts-face-leif.svg', 'lavender', '#FFC251'],
    ['ohno', 'Oh No', '6af5694a27313a861dee4dfc_ts-face-ohno.svg', 'yellow', '#FFC251'],
    ['spokes', 'Spokes', '6af5694a41a385c0805c9afe_ts-face-spokes.svg', 'mint', '#FEB38B'],
    ['winky', 'Winky', '6af5694b114f46e82ae985e8_ts-face-winky.svg', 'pink', '#FEB38B']
  ];

  // Colours each spot's face sits against or peeks out of (measured desktop + phone, 2026-11-13). Used only to keep a
  // character away from a card in its own colour; the circle colour itself is chosen live from what's really behind it.
  var TONES = {
    A: 'ffffff', B: 'fef7e3 fcc551', C: 'fef7e3 cef5ca 70ddef', D: 'ffffff faf7f0', E: 'ffffff', F: 'ffffff',
    G: 'faf7f0 b3b6fb', H: 'fcc551 ffffff', I: 'fef7e3 fcc551', J: 'fef7e3 cef5ca 70ddef', K: 'faf7f0',
    L: 'ffffff b3b6fb', M: 'ffffff 70ddef ffc7a8', N: 'ffffff cef5ca ffabe1', O: 'faf7f0',
    P: 'faf7f0 fcc551', Q: 'faf7f0 70ddef', R: 'faf7f0 b3b6fb', S: 'faf7f0 b3b6fb',
    T: 'faf7f0 fcc551', U: 'faf7f0 ffffff 0364ff fcc551', V: 'faf7f0',
    W: 'faf7f0 b3b6fb', X: 'faf7f0 b3b6fb', Y: 'faf7f0 b3b6fb', Z: 'faf7f0 b3b6fb'
  };
  // Circle behind each character: brand colours only, in preference order. A colour is used only if the character
  // reads against it AND the circle reads against the page behind it, both at WCAG 1.4.11's 3:1. Ink passes everywhere.
  var CIRCLES = ['#0364FF', '#FFFDF7', '#0A0A0A'], INK = '#0A0A0A', MIN = 3;

  function rgb(h) { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
  function lum(h) { var c = rgb(h).map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }
  function contrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function matchy(a, b) { var p = rgb(a), q = rgb(b); return Math.sqrt(Math.pow(p[0] - q[0], 2) + Math.pow(p[1] - q[1], 2) + Math.pow(p[2] - q[2], 2)) < 90; }
  function pickCircle(body, bgs) {
    if (!bgs) return INK;
    for (var i = 0; i < CIRCLES.length; i++) {
      var c = CIRCLES[i], ok = contrast(body, c) >= MIN;
      for (var j = 0; ok && j < bgs.length; j++) ok = contrast(c, bgs[j]) >= MIN;
      if (ok) return c;
    }
    return INK;
  }

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
    // Most-constrained spots (most surrounding colours) choose first, so the leftovers rarely clash.
    picked.sort().sort(function (a, b) { return (TONES[b] || '').length - (TONES[a] || '').length; }).forEach(function (letter) {
      var tones = (TONES[letter] || '').split(' ').filter(Boolean), pick = -1;
      for (var i = 0; i < cast.length && pick < 0; i++) {
        var clash = false;
        for (var t = 0; t < tones.length && !clash; t++) clash = matchy(cast[i][4], '#' + tones[t]);
        if (!clash) pick = i;
      }
      if (pick < 0) pick = 0;
      map[letter] = cast.splice(pick, 1)[0];
    });
    return map;
  }

  function load(day) {
    try { var v = JSON.parse(localStorage.getItem(KEY) || 'null'); if (v && v.day === day && Array.isArray(v.found)) return v.found; } catch (e) {}
    return [];
  }
  function save(day, found) { try { localStorage.setItem(KEY, JSON.stringify({ day: day, found: found })); } catch (e) {} }
  function has(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return true; return false; }
  function el(tag, cls, text) { var n = d.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }

  // Face art: each SVG ships with a pale rounded-square backing that most characters fail 3:1 against. We fetch the SVG,
  // swap that backing for a circle in a colour picked by pickCircle(), and serve it as a data URL. On any failure the
  // original file is used, so the game never breaks.
  var SVG = {};
  function byId(id) { for (var i = 0; i < CAST.length; i++) if (CAST[i][0] === id) return CAST[i]; return null; }
  function preload(who) {
    if (!SVG[who[0]]) SVG[who[0]] = fetch(CDN + who[2]).then(function (r) { return r.ok ? r.text() : null; }).then(function (t) { SVG[who[0]].text = t; return t; }, function () { return null; });
    return SVG[who[0]];
  }
  function faceSrc(who, bgs) {
    var t = SVG[who[0]] && SVG[who[0]].text;
    if (!t) return CDN + who[2];
    var fill = pickCircle(who[4], bgs), swapped = false;
    var out = t.replace(/<rect width="([\d.]+)" height="([\d.]+)" rx="[\d.]+" fill="#[0-9A-Fa-f]{6}"\s*\/>/, function (m, w, h) {
      swapped = true; w = +w; h = +h;
      return '<circle cx="' + w / 2 + '" cy="' + h / 2 + '" r="' + Math.min(w, h) / 2 + '" fill="' + fill + '"/>';
    });
    if (!swapped) return CDN + who[2];
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(out);
  }
  function opaque(c) { var m = c.match(/[\d.]+/g); if (!m || (m.length > 3 && +m[3] < 0.5)) return null; return '#' + m.slice(0, 3).map(function (v) { return ('0' + (+v | 0).toString(16)).slice(-2); }).join(''); }
  // What's visually behind the face: for points across the top of the spot, the nearest ancestor that covers the point and
  // has a solid background. Spots peek out above their card, so "parent" alone would be wrong. A background image → unknown → ink.
  function behind(e) {
    var r = e.getBoundingClientRect(); if (!r.width) return null;
    var pts = [[r.left + 4, r.top + 4], [r.right - 4, r.top + 4], [r.left + r.width / 2, r.top + 4]], out = [];
    for (var i = 0; i < pts.length; i++) {
      var n = e.parentElement, hit = null;
      while (n && n !== d.documentElement) {
        var b = n.getBoundingClientRect();
        if (pts[i][0] >= b.left && pts[i][0] <= b.right && pts[i][1] >= b.top && pts[i][1] <= b.bottom) {
          var cs = getComputedStyle(n), c = opaque(cs.backgroundColor);
          if (c) { hit = c; break; }
          if (cs.backgroundImage !== 'none') return null;
        }
        n = n.parentElement;
      }
      out.push(hit || opaque(getComputedStyle(d.body).backgroundColor) || '#ffffff');
    }
    return out;
  }

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
    var lw = byId(last.id); pillFace.src = lw ? faceSrc(lw, [done ? '#FCC551' : '#FFFDF7']) : (last.src || '');
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
    var tile = el('span', 'ts-egg-toast-tile'); var img = el('img'); img.alt = ''; var iw = byId(item.id); img.src = iw ? faceSrc(iw, ['#FFFDF7']) : (item.src || ''); tile.appendChild(img);
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

  // Pages where the game never runs: no spots, no pop-ups, no counter pill, no toast. Legal pages stay plain.
  // Opt any other page out with data-ts-eggs="off" on <body>.
  var OFF_PATHS = ['/privacy-policy', '/terms-and-conditions'];
  function gameOff() {
    var path = location.pathname.replace(/\/+$/, '') || '/';
    return OFF_PATHS.indexOf(path) !== -1 || (d.body && d.body.getAttribute('data-ts-eggs') === 'off');
  }

  function go() {
    if (gameOff()) {
      [].forEach.call(d.querySelectorAll('.ts-egg[data-spot]'), function (e) { e.hidden = true; e.setAttribute('aria-hidden', 'true'); });
      return;
    }
    var day = today(), map = plan(day), found = load(day), need = [];
    [].forEach.call(d.querySelectorAll('.ts-egg[data-spot]'), function (e) { var w = map[e.getAttribute('data-spot')]; if (w) need.push(preload(w)); });
    found.forEach(function (f) { var w = byId(f.id); if (w) need.push(preload(w)); });
    Promise.all(need).then(function () { start(day, map, found); }, function () { start(day, map, found); });
  }

  function paint(e) {
    var who = byId(e.getAttribute('data-egg')), img = e.querySelector('img');
    if (who && img) img.src = faceSrc(who, behind(e));
  }

  function start(day, map, found) {
    var eggs = [].slice.call(d.querySelectorAll('.ts-egg[data-spot]')).filter(function (e) {
      var who = map[e.getAttribute('data-spot')];
      if (!who) return false;
      // Dress the spot as today's character.
      e.setAttribute('data-egg', who[0]); e.setAttribute('data-egg-name', who[1]);
      e.setAttribute('aria-label', 'Hidden character: ' + who[1] + '. Click to collect.');
      var tile = e.querySelector('.ts-egg-tile'); if (tile) tile.className = 'ts-egg-tile is-' + who[3];
      var img = e.querySelector('img'); if (img) { img.removeAttribute('srcset'); img.removeAttribute('sizes'); img.removeAttribute('loading'); }
      e.classList.add('is-active');
      paint(e); // after is-active, so the spot has a box to measure
      return true;
    });
    // Phone and desktop put some spots on different backgrounds: re-pick circle colours after a resize.
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { eggs.forEach(function (e) { if (!e.hidden) paint(e); }); }, 250); });
    var animate = !found.length && !rm && 'IntersectionObserver' in window;
    if (found.length) root.classList.add('ts-eggs-done');

    function collect(e) {
      var id = e.getAttribute('data-egg');
      if (has(found, id)) return;
      var img = e.querySelector('img');
      var who = byId(id), item = { id: id, name: e.getAttribute('data-egg-name') || 'a friend', src: who ? CDN + who[2] : (img ? img.src : '') };
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
  window.TSEggs = { plan: plan, today: today, off: gameOff, contrast: contrast, pickCircle: pickCircle };
  if (d.readyState !== 'loading') go(); else d.addEventListener('DOMContentLoaded', go);
})();
