# FKarim-web

The personal homepage of Fadil Karim: **Apps**, **Websites**, **Channels**, **Writing**,
a **Reading list** and a **Graphic design portfolio**, set in the BasilicaLabs.AI house style. Black on white, hairline boxes, Prata display
words, Newsreader italics, letter-spaced Afacad Flux caps, and a light/dark toggle.

A Cloudflare Workers static-assets site: plain HTML, CSS and a little vanilla
JavaScript, with no build step. Everything served lives in `public/`.

## Structure

```
public/
  index.html               the homepage
  404.html                 themed not-found page
  favicon.svg              the Basilica sparkle, inverted
  apple-touch-icon.png
  robots.txt
  _headers                 security and caching headers
  assets/css/styles.css    the design system
  assets/js/site.js        light/dark toggle, rail arrows, nav underline, shelf filter
wrangler.jsonc             assets-only Worker config, no script
package.json               wrangler plus dev / deploy / check scripts
```

## Local development

```bash
npm install
npm run dev        # wrangler dev: serves public/ the way Cloudflare does
```

## Deployment

The repo is connected to Cloudflare Workers Builds (Worker `fkarim-web`), so every
push to `main` deploys to production with `npx wrangler deploy`. Run `npm run check`
(a dry-run deploy) before pushing.

Everything under `/assets/` is cached for a year. After changing `styles.css` or
`site.js`, bump the `?v=` number on their links in both `index.html` and `404.html`.

## Adding things

- **An app**: copy an `<article class="rcard">` inside `#apps`. Each one has a line
  drawing (`.plate`), the name on the black banner, one line of description and a
  button per platform. For a platform that isn't live yet, use
  `<span class="ropt off">App Store &middot; soon</span>`.
- **A website**: copy an `<a class="site">` inside `#websites`.
- **A channel**: copy an `<a class="box">` inside `#channels`.
- **Writing**: the lead essay is the large `w-lead` box and the other pieces fill
  `w-1` to `w-4`. `w-4` is the "intentionally left blank" slot for the next piece.
- **A book**: add one `<li>` at the top of `#shelf` (most recent first). The counts and
  filter tabs update themselves, and the subject in `.lc` drives the filters. The same
  list lives on basilicalabs.ai/reading.html, so add new books there too.
- **A portfolio piece**: put an `<img>` inside one of the `.frame`s in `#portfolio` and
  remove its `.no` label. For more frames, add a `.frame` with `f-portrait`,
  `f-landscape` or `f-square`.

## External resources

- Fonts load from Google Fonts: Afacad Flux, Newsreader and Prata.
- The apps link to visualneuroscience.ai, vocabcards.app, businessnumbers.app and
  the App Store; the Websites section links to basilicalabs.ai, pocketuniversity.ai and
  fkarimdesign.com; Channels links to GitHub, YouTube and LinkedIn; the writing and the
  Reading Room link to basilicalabs.ai.

## Fonts

BasilicaLabs.AI sets its wordmark in Flux (© MonibDesign, a commercial face), with
Afacad Flux as the open-licence fallback. This site uses Afacad Flux. If your Flux
licence covers this site as well, the note at the top of `public/assets/css/styles.css`
shows how to switch.
