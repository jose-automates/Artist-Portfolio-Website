# 🎨 Adriana Morales — Artist Portfolio Website

A static one-page portfolio site for a fictional high-school artist, Adriana
Morales, built to showcase her work for an undergraduate graphic design
scholarship application. This is the front-end half of a LAMP-stack project,
pulled out to stand on its own with no server.

> **Disclaimer:** This site is a fictitious demo. It contains no real personal
> information.

Live: https://jose-automates.github.io/Artist-Portfolio-Frontend/

## What's inside

| | |
|---|---|
| Static export | Plain HTML, CSS and JS. The original PHP contact-form handler and MySQL-backed portfolio lookup were left behind — no server, no database, no build step. |
| All assets local | Every stylesheet, script, font and image is served from this repo (Bootstrap, Boxicons, GLightbox, Isotope, Remixicon, Swiper, Waypoints — all vendored under `assets/vendor/`). |
| One-page layout | Home, About, Resume, Portfolio and Contact sections on a single page, with a filterable (Isotope) portfolio grid and a GLightbox image viewer. |
| Graceful degradation | The "Portfolio Details" popup and the contact form both call a back end that no longer exists. Instead of crashing, they show a friendly jAlert error ("Couldn't get information... Try again later") — see [Connecting the back end](#connecting-the-back-end) below. |

## Connecting the back end

Two features were wired to a PHP API in the original project and are inactive
in this static build:

```js
// assets/js/common.js
const portfolioDetailsBackEndProcessorLink = "http://localhost/artist-portfolio-photo-gallery/portfolio.php";
const contactBackEndProcessorLink = "http://localhost/artist-portfolio-photo-gallery/contact.php";
```

Until these point to a real endpoint, clicking a "Portfolio Details" link or
submitting the contact form will fail with a handled error message rather than
breaking the page. Point them at a live API (or an n8n webhook) to make both
features work.

## Folder structure

```
index.html          the single-page site
assets/css/          site styles + custom font-face declarations
assets/js/           site logic (index.js), shared config (common.js), jAlert
assets/fonts/        OpenSans and Raleway, self-hosted
assets/img/          hero, profile and portfolio/testimonial images
assets/vendor/       Bootstrap, Boxicons, GLightbox, Isotope, Remixicon, Swiper, Waypoints
```

## Run it locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000

## Notes

- Originally built on the LAMP stack (HTML/CSS/JS + PHP + MySQL); this repo
  keeps only the front-end.
- The contact form and portfolio-details lookup still run their client-side
  validation and UI logic — they just have nowhere to send the request until a
  back end is connected.

## Copyright

Original design and front-end by [josewebdev2000](https://github.com/josewebdev2000), 2023.
