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
