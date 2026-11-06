# FKarim-web

The personal homepage of Fadil Karim: **Apps**, **Writing** and a **Reading list**,
set in the BasilicaLabs.AI house style. Black on white, hairline boxes, Prata display
words, Newsreader italics, letter-spaced Afacad Flux caps, and a light/dark toggle.

Plain HTML, CSS and a little vanilla JavaScript. No framework, no build step.

## Files

- `index.html`: the page
- `assets/styles.css`: the design system (tokens, boxes, rails, mosaics, ledger, footer)
- `assets/site.js`: light/dark toggle, rail arrows, nav underline, reading-list filter
- `assets/favicon.svg`, `assets/favicon-180.png`: the Basilica sparkle, inverted

## Adding things

- **An app**: copy an `<article class="rcard">` inside `#apps`. Each one has a line
  drawing (`.plate`), the name on the black banner, one line of description and its
  buttons. For a button that isn't ready yet, use `<span class="ropt off">Coming soon</span>`.
- **Writing**: the lead essay is the large `w-lead` box and the other pieces fill
  `w-1` to `w-4`. `w-4` is the "intentionally left blank" slot for the next piece.
- **A book**: add one `<li>` at the top of `#shelf` (most recent first). The counts and
  filter tabs update themselves, and the subject in `.lc` drives the filters.

## Preview

    python3 -m http.server 8000

Then open http://localhost:8000.

## Fonts

BasilicaLabs.AI sets its wordmark in Flux (© MonibDesign, a commercial face), with
Afacad Flux as the open-licence fallback. This site uses Afacad Flux. If your Flux
licence covers this site as well, the note at the top of `assets/styles.css` shows
how to switch.
