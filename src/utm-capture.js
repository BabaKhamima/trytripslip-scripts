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

  function fill() {
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
