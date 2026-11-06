# CLAUDE.md

Standing policy for this repository. Read it before making any change here.

## What this repo is

Fadil Karim's personal homepage (Apps, Websites, Writing, Reading list), set in the
BasilicaLabs.AI design system. A Cloudflare Workers static-assets site: everything
served lives in `public/` and there is no build step - the files in that directory
are the site. The repo is connected to Cloudflare Workers Builds (Worker
`fkarim-web`), so **every push to `main` deploys to production**.

```
public/            everything served
  index.html
  404.html
  favicon.svg, apple-touch-icon.png
  assets/css|js
  _headers         security + caching headers
  robots.txt
wrangler.jsonc     assets-only config, no Worker script
package.json       wrangler devDependency + dev/deploy/check scripts
```

## Local development

```bash
npm install
npm run dev          # wrangler dev
```

## Verification - before every push to main

1. `npx wrangler deploy --dry-run`
2. Serve `public/`, render it with headless Chromium, and inspect the
   screenshots: styles applied, fonts loaded, layout intact.

Never leave pushed work unverified or half-finished. Work in small, complete
batches: implement, verify, commit, push.

## Git and release workflow

- Before committing: `git config user.name "Fid" && git config user.email "fid_kk@proton.me"`
- Develop on the working branch and push there first. Release verified work by
  fast-forwarding `main` onto it and pushing `main`.
- Every push to `main` is a release. Versions are an ascending `vMAJOR.MINOR`
  sequence starting at `v1.0`; every push bumps the minor regardless of size. A
  major bump is reserved for a ground-up overhaul.
- With every push to `main`, provide release-tag text in the reply, in exactly
  this shape. The owner creates the GitHub release manually - **never push tags**:

  ```
  Tag: v<next>  —  Title: <five to nine words, plain and evocative>
  Description: <one to three sentences of editorial prose describing what changed
  from the owner's point of view — outcomes, not implementation. No bullet lists,
  no jargon, no file names.>
  ```

- Append the release line to the ledger below as part of the same push.
- Commit messages: descriptive imperative first line (what the change does, not
  "update X"), then a short prose body; dash bullets are fine there. One commit
  per coherent piece of work; several may share a push, but each push gets
  exactly one version entry.
- Never include model names, AI attribution trailers, session links, or other
  tooling identifiers in commit messages, titles, or code.

## The page itself

The design follows BasilicaLabs.AI (basilicalabs.ai): its tokens, boxes, rails,
type voices and light/dark inverse. Do not tidy markup, rename classes, rewrite
copy, or modernise CSS unless asked - changes to the design are their own release,
requested deliberately.

- `/assets/*` is served with year-long immutable caching. After changing
  `styles.css` or `site.js`, bump the `?v=` number on their links in both
  `index.html` and `404.html`, or returning visitors keep the old file.
- `404.html` is served for any unknown path, so its links must stay root-absolute.
- The reading list mirrors basilicalabs.ai/reading.html; new books go in both.
- App, website and writing descriptions come from the owner or from the pages
  they link to (visualneuroscience.ai and its App Store listing, basilicalabs.ai,
  pocketuniversity.ai) - check the source before changing a claim.
- Vocab Cards and Business Numbers show their Web and iOS buttons as "soon" until
  the owner supplies the links; Visual Neuroscience's Vision Pro button likewise.

## Release ledger

| Version | Title | Description |
| --- | --- | --- |
| v1.0 | The homepage opens: apps, writing and the shelf | The personal homepage goes live in the BasilicaLabs.AI house style, gathering the apps, the essays and tutorials, and a reading list of forty-seven volumes beside the books currently on the desk. It now publishes itself to Cloudflare whenever the site changes, with a matching page for addresses that do not exist. |
| v1.1 | Three apps, two websites and a new desk | The Apps section now carries Visual Neuroscience Anatomy, Vocab Cards and Business Numbers, with Visual Neuroscience live on the web and iOS and the other two marked as coming soon, and a new Websites section beneath it points to BasilicaLabs.AI and PocketUniversity.AI. The Odyssey, Money and the Warren Buffett book join the shelf as finished, and Che and Good Strategy Bad Strategy now sit on the desk. |
