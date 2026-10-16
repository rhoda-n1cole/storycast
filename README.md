# StoryCast — Noble Family Church Rwanda

An accessible 3-page microsite that shares audio and video stories from **Noble Family Church Rwanda**: testimonies, family teaching, worship and songs. Every story has an accessible player, a transcript and related stories.

Built with **semantic HTML5, Sass and vanilla JavaScript** (no frameworks). Colours: chocolate brown and white.

- Live site: _add your deployment URL_
- Wireframes (Figma): _add link_
- High-fidelity mockups (Figma): _add link_
- Research & documentation: [`doc/StoryCast-Documentation.pdf`](doc/StoryCast-Documentation.pdf)
- Sitemap: [`doc/sitemap.svg`](doc/sitemap.svg)

## Pages

| Page | File | What it contains |
| --- | --- | --- |
| Home | `index.html` | Background video (Harvest Service, with Pause/Sound controls), featured testimony, all 7 stories, service times, watch/read/listen |
| Story (detail) | `story/*.html` | Media in a `<figure>`, story facts, scripture, key takeaways, transcript (show/hide + .txt download), previous/next, related stories |
| About & Access | `about.html` | Mission, the church, accessibility features, how to engage, accessibility contact |

### Stories

| Story | Speaker | Media |
| --- | --- | --- |
| [Girl, Pray and Grow for Impact](story/girl-pray-and-grow.html) | Miss Naomie Nishimwe | YouTube |
| [Praying Parents, Blessed Children](story/parents-pray-for-children.html) | Apostle Mignonne Kabera & Miss Naomie | YouTube |
| [The Woman in the Tent, the Man at the Gates](story/husband-and-wife-love.html) | Apostle Mignonne Kabera | YouTube |
| [Worship at the Kagugu Reopening Service](story/kagugu-worship.html) | Worship team | YouTube |
| [The Mercy of God](story/mercy-of-god.html) | Pastor Frank Karemera | YouTube |
| [Christ Lives in Me](story/christ-lives-in-me.html) | Aime Frank | Local `<video>` + WebVTT captions |
| [Thank God](story/thank-god-minyone.html) | Minyone | Local `<audio>` |

**Service times:** Tuesday – Sunday. Wednesday & Sunday at 11:00 AM; Tuesday, Thursday, Friday & Saturday at 5:00 PM. No service on Monday.

**Contact:** r.umutesi1@alustudent.com · [YouTube](https://www.youtube.com/@womenfoundationministries2026) · [Instagram](https://www.instagram.com/noblefamilychurch)

## Project structure

```
.
├─ index.html                 Home
├─ about.html                 About & Access
├─ story/                     Story detail pages (7)
├─ css/main.css               Compiled styles (do not edit — edit sass/)
├─ sass/
│  ├─ main.scss               Entry point: @use's every partial in layer order
│  ├─ _layers.scss            @layer reset, tokens, base, layout, components, pages, utilities
│  ├─ tokens/                 _colors _typography _spacing _breakpoints
│  ├─ base/                   _reset _base
│  ├─ layout/                 _grid _header _footer
│  ├─ components/             _buttons _navigation _hero _story-card _media _transcript _schedule
│  ├─ pages/                  _home _story _about
│  └─ utilities/              _accessibility
├─ js/
│  ├─ hero.js                 Background video: YouTube IFrame API, Pause + Sound buttons, aria-live
│  └─ transcript.js           Transcript show/hide (aria-expanded / aria-controls)
├─ assets/
│  ├─ video/amashimwe.mp4     "Christ Lives in Me" (Git LFS)
│  ├─ audio/                  "Thank God" by Minyone
│  ├─ images/                 Story photos, video poster, favicon
│  └─ transcripts/            One .txt transcript per story + christ-lives-in-me.en.vtt captions
└─ doc/                       Research & documentation PDF, sitemap
```

## Sass architecture

- **Tokens:** colours (emitted as CSS custom properties), typography, spacing map + `space()` function, breakpoint `up()` mixin.
- **Cascade layers:** every partial wraps its rules in a layer; the order in `_layers.scss` decides conflicts, not specificity.
- **BEM naming:** `.story-card__title`, `.btn--primary`, `.schedule__item--morning`, …
- **Grid + Flexbox:** Grid for page layouts (story grid, story + sidebar, footer); Flexbox for header, button groups, media rows.
- **Container query** (`sass/components/_story-card.scss`): each `.story-grid__item` is a named container. The card changes layout based on the space it is given, not the screen size:

```scss
.story-grid__item { container: story-card / inline-size; }

@container story-card (max-width: 18rem) { /* compact: hide excerpt */ }
@container story-card (min-width: 32rem) {
  .story-card { grid-template-columns: 40% 1fr; } /* horizontal card */
}
```

So the same card is stacked in the home grid, stacked in the story-page sidebar on desktop, and horizontal in the full-width related list on tablets.

## Accessibility checklist (WCAG 2.1 AA)

- [x] **Semantic HTML:** `header`, `nav`, `main`, `article`, `section`, `aside`, `figure`/`figcaption`, `footer`, `dl`, `blockquote`, `time`; one `h1` per page, no skipped heading levels.
- [x] **Captions & transcripts:** local video has a `<track kind="captions">` (WebVTT); YouTube embeds turn captions on (`cc_load_policy=1`); every story has an on-page transcript and a downloadable `.txt`.
- [x] **Colour contrast:** body text 15.1:1, brand 10.8:1, muted text 6.3:1, light text on dark 9.6:1 — all above 4.5:1.
- [x] **Keyboard:** "Skip to main content" link, logical tab order, native buttons/links only, visible 3px `:focus-visible` ring that switches colour on dark areas.
- [x] **Moving media:** background video starts muted, has Pause and Sound buttons, and stays paused with `prefers-reduced-motion`.
- [x] **ARIA where needed:** `aria-current`, `aria-labelledby` on landmarks, `aria-expanded`/`aria-controls` (transcript toggle), `aria-live` (video status), `aria-describedby` (players → captions), `aria-hidden` on decorative icons and the background video.
- [x] **Images:** descriptive `alt` on meaningful photos; `alt=""` on card thumbnails because the title already names the story.
- [x] **New tabs** are announced to screen readers ("opens in a new tab").
- [x] **Automated test:** axe-core 4.10 (WCAG 2.0/2.1 A + AA + best practice) — 0 violations on Home, About and the story pages.

## Run locally

```bash
# 1. Install Sass once
npm install -g sass

# 2. Compile (or keep it watching while you edit)
sass --watch sass/main.scss css/main.css

# 3. Serve the folder (needed for the caption track to load)
#    VS Code: right-click index.html → "Open with Live Server"
#    or:
python -m http.server 5500     # then open http://localhost:5500
```

The video is stored with Git LFS, so run `git lfs install` before cloning.

## Notes

- Transcripts are **English summaries** of messages preached in Kinyarwanda, not word-for-word transcripts. The "Thank God" transcript describes the song; the full lyrics still need to be added.
- GitHub Pages does not serve Git LFS files, so if the site is hosted there the local video shows its poster and a "Watch on YouTube" link instead of playing. All other media works.

## License

Educational project. Videos and photos belong to Noble Family Church Rwanda and the channels credited on each story page.
