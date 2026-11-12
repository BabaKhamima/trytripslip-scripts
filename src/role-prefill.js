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
