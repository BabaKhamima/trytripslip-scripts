/* TripSlip hide-and-seek (W3 easter-egg layer).
   Markup (Webflow): <button class="ts-egg is-spot-x" data-egg="leif" data-egg-name="Leif" aria-label="…">
                       <span class="ts-egg-tile is-mint"><img class="ts-egg-face" src="…" alt=""></span></button>
   The .ts-egg box clips its tile, and its bottom edge sits on the top edge of a card, so the face looks like it is
   hiding behind the card.
   Before the first find: each face pops up from behind its card once when it scrolls into view, then wiggles now and then.
   After the first find (on any page, remembered in localStorage): no motion on any face, ever. The counter pill appears.
   Reduced motion: faces just sit peeking. Never gates content; nothing leaves the browser. */
(function () {
  var KEY = 'ts-eggs-v1', PILL_KEY = 'ts-eggs-pill-hidden', TOTAL = 10;
  var d = document, root = d.documentElement;
  var rm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function load() {
    try { var v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v.filter(function (x) { return x && x.id; }) : []; }
    catch (e) { return []; }
  }
  function save(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }
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
    for (var i = 0; i < TOTAL; i++) pillDots.appendChild(el('i'));
    text.appendChild(pillLabel); text.appendChild(pillDots);
    var close = el('button', 'ts-egg-pill-close', '×'); close.type = 'button'; close.setAttribute('aria-label', 'Hide the character counter');
    close.addEventListener('click', function () { pill.hidden = true; try { sessionStorage.setItem(PILL_KEY, '1'); } catch (e) {} });
    pill.appendChild(tile); pill.appendChild(text); pill.appendChild(close);
    d.body.appendChild(pill);
  }

  function renderPill(found, reveal) {
    buildPill();
    var last = found[found.length - 1], n = found.length, done = n >= TOTAL;
    pillFace.src = last.src || '';
    pillLabel.textContent = done ? 'All ' + TOTAL + ' found. Nice eyes.' : n + ' of ' + TOTAL + ' characters found';
    [].forEach.call(pillDots.children, function (dot, i) { dot.className = i < n ? 'is-on' : ''; });
    pill.classList.toggle('is-done', done);
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
    body.appendChild(el('span', 'ts-egg-toast-sub', n >= TOTAL ? 'That’s all ' + TOTAL + '. Nice eyes.' : n + ' of ' + TOTAL + '. The rest are hiding around the site.'));
    var x = el('button', 'ts-egg-toast-close', '×'); x.type = 'button'; x.setAttribute('aria-label', 'Dismiss');
    x.addEventListener('click', hide);
    toast.appendChild(tile); toast.appendChild(body); toast.appendChild(x);
    void toast.offsetWidth;
    toast.classList.add('is-in');
    clearTimeout(toastTimer); toastTimer = setTimeout(hide, 4500);
    function hide() { toast.classList.remove('is-in'); }
  }

  function go() {
    var eggs = [].slice.call(d.querySelectorAll('.ts-egg[data-egg]'));
    var found = load();
    var animate = !found.length && !rm && 'IntersectionObserver' in window;
    if (found.length) root.classList.add('ts-eggs-done');

    function collect(e) {
      var id = e.getAttribute('data-egg');
      if (has(found, id)) return;
      var img = e.querySelector('img');
      var item = { id: id, name: e.getAttribute('data-egg-name') || 'a friend', src: img ? (img.currentSrc || img.src) : '' };
      found.push(item); save(found);
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
      if (animate) { e.classList.add('is-pre'); e.style.setProperty('--egg-delay', (2 + (i * 1.9) % 5).toFixed(1) + 's'); }
    });

    if (animate) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (x) {
          if (!x.isIntersecting) return;
          var e = x.target; io.unobserve(e);
          setTimeout(function () {
            if (root.classList.contains('ts-eggs-done')) { e.classList.remove('is-pre'); return; }
            e.classList.remove('is-pre');
            setTimeout(function () { if (!root.classList.contains('ts-eggs-done') && !e.hidden) e.classList.add('is-wiggle'); }, 800);
          }, 450);
        });
      }, { threshold: 0.5 });
      eggs.forEach(function (e) { if (!e.hidden) io.observe(e); });
    }

    if (found.length) renderPill(found, false);
  }

  if (d.readyState !== 'loading') go(); else d.addEventListener('DOMContentLoaded', go);
})();
