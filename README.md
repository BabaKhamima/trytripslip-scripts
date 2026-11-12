# trytripslip-scripts

Scripts for trytripslip.com (Webflow). One file per page: `dist/tripslip.js`.

| Source | What it does | Spec |
|---|---|---|
| `src/motion.css` + `src/motion.js` | Motion tokens and patterns M1–M8, entrance observer, toast hold (`window.tsToast(el)`) | `motion-specs.md` v2.1 (design-system repo, `brand/docs/`) |
| `src/hero-pile.js` | Character pile: drop-in once per session, idle wiggle every 12–18s, pauses off-screen and when the tab is hidden, static under reduced motion | `expressive-layer.md` §7/7a |
| `src/utm-capture.js` | Adds (on `form[data-ts-utm]`) and fills hidden `source-page` and `utm-*` fields; first touch in the session wins | `zoho-funnel-plan` §2 |
| `src/role-prefill.js` | On `form[data-ts-role-prefill]`, pre-selects the `role` radio from `?role=` (`admin` → `school-admin`) | `section-prompts` C1 |
| `src/blob-in.js` | Tonal blobs (`img[src*="ts-blob-"]`) scale 0.85→1 + fade in once per section, 60ms stagger; static under reduced motion | `expressive-layer` mkt-motion-blob-in |

Nothing here collects personal data, sets cookies or talks to third parties. This repo is public (jsDelivr only serves public repos): never commit keys, tokens or student data.

## Hero pile markup

```html
<button data-ts-pile-pause>Pause motion</button>   <!-- optional, WCAG 2.2.2 -->
<div data-ts-pile>
  <img class="ts-pile-face" src="…/face.svg" alt="">   <!-- positioned by your CSS: this is the resting pile -->
</div>
```

## Build and release

```sh
node build.mjs                  # writes dist/tripslip.js and dist/tripslip.js.sri
open test/index.html            # or serve the repo root and open /test/index.html?utm_source=x
git tag v0.1.0 && git push --tags
```

Load in Webflow (Page or Site settings, footer):

```html
<script src="https://cdn.jsdelivr.net/gh/BabaKhamima/trytripslip-scripts@v0.1.0/dist/tripslip.js"
        integrity="(contents of dist/tripslip.js.sri)" crossorigin="anonymous"></script>
```

Always pin a tag. Never point Webflow at `@main`.

## Rules (from Al)

- Animate only `transform` and `opacity`. No scroll-jacking. Nothing loops longer than 5s without stopping.
- Always respect `prefers-reduced-motion`.
- Content is readable with JS off: hidden states only apply under `html.ts-js`.

| egg.js | Daily hide-and-seek: 26 spots (`.ts-egg[data-spot=A–Z]`); each midnight (America/Detroit) a date-seeded shuffle picks 10, max 2 per page, and assigns the day's characters. Faces pop up and wiggle until the day's first find, then hold still. Progress in localStorage (`ts-eggs-v2`), resets daily. QA: `TSEggs.plan('YYYY-MM-DD')`. Pool lives in `POOL` — add a page's spots there when it publishes. |
