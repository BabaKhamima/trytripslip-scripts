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
