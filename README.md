# eiilo.com

The eiilo website: the home page, short updates, and the about, contact,
privacy and terms pages. Two parts are on their own sites, and the top bar
links to them: the games at `games.eiilo.com` (the `eiilo-games-com`
repository) and the blog at `blog.eiilo.com` (the `eiilo-blog-com`
repository).

It is a static site built with [Astro](https://astro.build). `npm run build`
writes plain HTML, CSS and images to `dist/`, and a GitHub Actions workflow
publishes that folder to GitHub Pages. There is no server, no client-side
framework and no third-party request: the font is self-hosted.

It keeps the theme of the 2024 site (navy page, white Baloo 2, mint), with a
3D logo, drifting blocks that carry the icons of our products, and cards that lean towards the pointer. All of that
is CSS plus one small script, `src/scripts/motion.js`.

Visitors whose system asks for reduced motion get a still page; there is no
separate pause control. The still state is the `.still` block at the end of
`global.css`: when you add something that moves, give it a resting pose
there. On a phone the products behind the logo never move.

## Run it

```sh
npm install
npm run dev       # http://localhost:4321, reloads as you edit
npm run build     # writes dist/
npm run preview   # serves dist/ as it will be published
```

Node 22.23.4 or later.

## Write an update

An update is short news. `/updates/` shows every update in full, newest
first; the home page shows the latest three, and they are in the RSS feed at
`/rss.xml`. (Longer writing goes on the blog, in `eiilo-blog-com`.)

```sh
npm run new "Mood Dude 1.3 is out"
```

This creates a Markdown file in `src/content/updates/` with today's date.
Write below the second `---`, then delete the `draft: true` line and push to
`main`.

You can also create the file by hand, or in GitHub's web editor:

```md
---
title: Mood Dude 1.3 is out
date: 2026-11-14
---

The text, in Markdown.
```

- The file name is the address: `my-update.md` is published at
  `/updates/my-update/`. Don't rename a file once it is live.
- `draft: true` keeps an update out of the published site. `npm run dev`
  still shows it.
- The build fails with a message naming the file when a field is missing or a
  date is wrong.
- Text between single asterisks (`*eiilo*`) is shown bold and mint, as the
  brand name is across the site.
- For an image, put it in `public/images/` and write `![What it shows](/images/name.png)`.

## Change other things

| To change | Edit |
|---|---|
| A game, or add one | the `eiilo-games-com` repository |
| A blog post | the `eiilo-blog-com` repository |
| The top bar and footer links | `src/data/site.ts` |
| About, contact, privacy, terms | the Markdown files in `src/pages/` |
| The home page | `src/pages/index.astro` |
| Colours, fonts, spacing, cards, buttons | the tokens and rules in `src/styles/global.css` |
| The 3D logo (depth, how far it turns) | `src/components/Logo3D.astro`, and `.logo3d` in the stylesheet |
| Which products drift behind the logo, which of them are main, and their shape | `src/data/products.ts` (icons in `src/assets/products/`) |
| Where they are, their size and speed; the shapes themselves | `src/components/Cubes.astro`, and its rules in the stylesheet |
| The phone layout (everything blurred, gathered around the logo) | `clusterMain` and `clusterBack` in `src/components/Cubes.astro` |
| The Mood Dude's frames | `src/assets/floaters/mood-dude.webp`, built by `scripts/dude-sheet.mjs` from the games' sprites |
| How things follow the pointer | `src/scripts/motion.js` |
| Top bar, footer, `<head>` tags | `src/layouts/Base.astro` |
| Title header of inner pages | `src/layouts/Page.astro` |

`global.css`, `motion.js`, `Logo3D.astro` and `Cubes.astro` are the same files
in `eiilo-games-com` and `eiilo-blog-com`. After changing one, copy it there.

## Files

```
src/content/updates/    updates, one Markdown file each
src/content.config.ts   the fields an update must have
src/data/               site menu, products behind the logo, helpers that load the updates
src/pages/              one file per page; updates/[id] makes a page per update
src/layouts/            Base (every page) and Page (every page but the home page)
src/components/         logo, 3D logo, drifting products, cards for updates
src/scripts/motion.js   pointer-following, card tilt, reveal on scroll
src/assets/logo.svg     the logo; the flat and 3D versions are both drawn from it
src/styles/global.css   the one stylesheet
public/                 copied as is: CNAME, robots.txt, favicon, the games and apps logos
scripts/new.mjs         `npm run new`
.github/workflows/      the GitHub Pages deployment
```

## Publish

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the
site and deploys it. To set it up once:

1. In the repository, open Settings > Pages and set **Source** to
   **GitHub Actions**.
2. Under **Custom domain**, enter `eiilo.com`. `public/CNAME` holds the same
   name.
3. At the DNS provider, point `eiilo.com` to GitHub Pages (four `A` records:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`)
   and `www` to `<account>.github.io` with a `CNAME` record. GitHub then
   redirects `www.eiilo.com` to `eiilo.com`.
4. Once the certificate is issued, tick **Enforce HTTPS**.

`games.eiilo.com` and `blog.eiilo.com` are separate Pages sites (a Pages
site has one custom domain); their DNS records are in those repositories'
READMEs. The blog used to be at `eiilo.com/blog/`: `redirects` in
`astro.config.mjs` sends its old addresses to the new site, so publish the
blog first.

The site must be served from the root of a domain: every internal link is
root-absolute (`/updates/`, `/about/`).
