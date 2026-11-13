/* TripSlip label repair. Webflow renders form labels with an empty for="" attribute, and per the HTML spec
   an empty `for` disconnects the label from its control. Clicking a chip label then never checks its radio
   (role + contact-preference chips stay unhighlighted), clicking a text label doesn't focus its input, and
   inputs lose their accessible name. Fix: nested control → drop the attribute; otherwise point `for` at the
   field's control (same .ts-field / parent). Never overrides a non-empty `for`. */
(function () {
  var CTRL = 'input:not([type=hidden]),textarea,select';
  function run() {
    [].forEach.call(document.querySelectorAll('label[for=""]'), function (l) {
      if (l.querySelector(CTRL)) { l.removeAttribute('for'); return; }
      var scope = l.closest('.ts-field') || l.parentNode;
      var c = scope && scope.querySelector(CTRL);
      if (!c) return;
      if (!c.id) c.id = 'ts-f-' + Math.random().toString(36).slice(2, 8);
      l.htmlFor = c.id;
    });
  }
  if (document.readyState !== 'loading') run(); else document.addEventListener('DOMContentLoaded', run);
})();
