/* TripSlip legal pages (/privacy-policy, /terms-and-conditions).
   Markup (Webflow):  section.ts-legal > div.ts-legal-inner > [aside.ts-legal-aside] + div.ts-legal-prose (Rich Text)
   - Gives every H2 in .ts-legal-prose a stable id (s-1, s-2 … from its number; "intro"/"summary" otherwise).
   - Adds the legacy anchor ids the policy text links to (#infouse, #prohibited …) at the right sections.
   - Repoints in-page links that still go to the old tripslip.app domain (…/privacy-policy#x → #x on this page,
     cross-document → this site). Legal wording is never changed.
   - Builds the section index ("On this page") into .ts-legal-aside: <details> that is open and sticky on desktop,
     collapsed on phones. Highlights the section being read (aria-current). Without JS the page is plain prose. */
(function () {
  var d = document;
  // Legacy anchors used inside the text → section number they belong to, per document.
  var LEGACY = {
    // Only ids the live text actually links to (audited 2026-11-13). "toc" ("Review the privacy notice in full") → section 1.
    'privacy-policy': { toc: 1, personalinfo: 1, sensitiveinfo: 1, infouse: 2, whoshare: 3, infosafe: 5, privacyrights: 7, contact: 11 },
    'terms-and-conditions': { prohibited: 7 }
  };
  // Index labels only: the source headings are ALL CAPS, which is slow to scan in a list. Show them in sentence case,
  // keeping proper nouns. The headings in the document itself are left exactly as written.
  var KEEP = ['United States', 'California', 'Apple', 'Android', 'TripSlip', 'Michigan'];
  function label(t) {
    if (t !== t.toUpperCase()) return t;
    var s = t.toLowerCase().replace(/^\s*\w/, function (c) { return c.toUpperCase(); });
    KEEP.forEach(function (k) { s = s.replace(new RegExp('\\b' + k + '\\b', 'gi'), k); });
    return s;
  }
  var MQ = window.matchMedia ? window.matchMedia('(min-width: 62em)') : null;

  function run() {
    var prose = d.querySelector('.ts-legal-prose');
    if (!prose) return;
    var doc = /terms/.test(location.pathname) ? 'terms-and-conditions' : 'privacy-policy';
    var heads = [].slice.call(prose.querySelectorAll('h2'));
    var byNum = {};
    heads.forEach(function (h, i) {
      var text = h.textContent.replace(/\s+/g, ' ').trim();
      var m = text.match(/^(\d+)\.\s*/);
      if (!h.id) h.id = m ? 's-' + m[1] : (i === 0 ? 'summary' : 'part-' + (i + 1));
      if (m) byNum[m[1]] = h;
      h.setAttribute('tabindex', '-1'); // focus lands on the heading after a jump (keyboard + screen readers)
    });

    // Legacy anchors: an empty span with the old id right before the section heading.
    var legacy = LEGACY[doc] || {};
    Object.keys(legacy).forEach(function (id) {
      if (d.getElementById(id)) return;
      var target = byNum[legacy[id]];
      if (!target) return;
      var a = d.createElement('span'); a.id = id; a.className = 'ts-legal-anchor';
      target.parentNode.insertBefore(a, target);
    });

    // "In short:" summaries get a callout style (visual only; text untouched).
    [].forEach.call(prose.querySelectorAll('p'), function (p) { if (/^\s*In Short\s*:/i.test(p.textContent)) p.classList.add('ts-legal-short'); });

    // Old-domain links → this page / this site.
    [].forEach.call(prose.querySelectorAll('a[href*="tripslip.app/"]'), function (a) {
      var m = a.getAttribute('href').match(/^https?:\/\/(?:www\.)?tripslip\.app\/(privacy-policy|terms-and-conditions)(#[\w-]+)?$/);
      if (!m) return;
      a.setAttribute('href', m[1] === doc ? (m[2] || '#') : '/' + m[1] + (m[2] || ''));
      a.removeAttribute('target');
    });

    // Section index.
    var aside = d.querySelector('.ts-legal-aside');
    if (!aside || heads.length < 3) return;
    var box = d.createElement('details'); box.className = 'ts-legal-toc';
    var sum = d.createElement('summary'); sum.className = 'ts-legal-toc-sum'; sum.textContent = 'On this page';
    var nav = d.createElement('nav'); nav.setAttribute('aria-label', 'Sections');
    var ol = d.createElement('ol'); ol.className = 'ts-legal-toc-list';
    var links = heads.map(function (h) {
      var text = h.textContent.replace(/\s+/g, ' ').trim(), m = text.match(/^(\d+)\.\s*(.*)$/);
      var li = d.createElement('li'), a = d.createElement('a');
      a.href = '#' + h.id; a.className = 'ts-legal-toc-link';
      if (m) { var n = d.createElement('span'); n.className = 'ts-legal-toc-num'; n.textContent = m[1]; a.appendChild(n); }
      a.appendChild(d.createTextNode(label(m ? m[2] : text)));
      a.addEventListener('click', function () {
        if (MQ && !MQ.matches) box.open = false;
        setTimeout(function () { h.focus({ preventScroll: true }); }, 0);
      });
      li.appendChild(a); ol.appendChild(li);
      return a;
    });
    nav.appendChild(ol); box.appendChild(sum); box.appendChild(nav); aside.appendChild(box);
    function sync() { box.open = !!(MQ && MQ.matches); }
    sync(); if (MQ) (MQ.addEventListener ? MQ.addEventListener('change', sync) : MQ.addListener(sync));

    // Current section: the last heading that has scrolled past the top third of the viewport.
    var ticking = false;
    function mark() {
      ticking = false;
      var line = window.innerHeight * 0.33, cur = 0;
      for (var i = 0; i < heads.length; i++) if (heads[i].getBoundingClientRect().top <= line) cur = i;
      links.forEach(function (a, i) { if (i === cur) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(mark); } }, { passive: true });
    mark();
  }
  if (d.readyState !== 'loading') run(); else d.addEventListener('DOMContentLoaded', run);
})();
