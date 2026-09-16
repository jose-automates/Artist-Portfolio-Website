# 🎨 Adriana Morales — Artist Portfolio Website

A static one-page portfolio site for a fictional high-school artist, Adriana
Morales, built to showcase her work for an undergraduate graphic design
scholarship application. This is the front-end half of a LAMP-stack project,
pulled out to stand on its own with no server — with the contact form wired
to a real n8n automation instead.

> **Disclaimer:** This site is a fictitious demo. It contains no real personal
> information.

Live: https://jose-automates.github.io/Artist-Portfolio-Website/

## What's inside

| | |
|---|---|
| Static export | Plain HTML, CSS and JS. The original PHP contact-form handler and MySQL-backed portfolio lookup were left behind — no server, no database, no build step. |
| All assets local | Every stylesheet, script, font and image is served from this repo (Bootstrap, Boxicons, GLightbox, Isotope, Remixicon, Swiper, Waypoints — all vendored under `assets/vendor/`). |
| One-page layout | Home, About, Resume, Portfolio and Contact sections on a single page, with a filterable (Isotope) portfolio grid and a GLightbox image viewer. |
| Portfolio details, no back end needed | The "more details" popup used to call a PHP endpoint that no longer exists. It now reads made-up but consistent project details straight from a small map in `assets/js/index.js` — no server required. |
| Live form validation | Each contact field shows a green check as soon as it's valid, or a red border plus an error message once it's been touched and is invalid. The Send button stays disabled until all four fields pass. |
| Wired to n8n | Submitting the form calls a real n8n webhook that saves the message, emails the sender, and alerts Adriana — see below. |

## Contact form → n8n automation

Submitting the form POSTs JSON to an n8n webhook (workflow `contacto_formulario_web`,
n8n project folder `Adriana-Morales-Contacts`). No AI is involved anywhere in
it — every step is deterministic:

| Step | n8n tool | What it does |
|---|---|---|
| Trigger | **Webhook** | Receives the POST from this site (CORS open, JSON body) |
| Normalize | **Set** | Pulls name/email/subject/message out of the request body |
| Validate | **IF** | Checks all four fields are present and the email looks valid |
| Respond | **Respond to Webhook** (×2) | Replies 200 immediately on success, 400 on invalid input — the page never hangs waiting on the steps below |
| Save | **Airtable** | Creates a row in the `contactos` table (base `Contacts`) |
| Compose | **Code** | Builds the confirmation email as branded HTML matching this site's look |
| Notify sender | **Gmail** | Sends that confirmation email to whoever wrote in |
| Notify Adriana | **Telegram** | Posts an alert with the message details to a private Telegram group |
| Safety net | **Error Trigger** (separate workflow) | If any step above fails, alerts the same Telegram group with which node broke and why — so a failure is never silent |

Every external call (Airtable, Gmail, Telegram) retries automatically on
transient failures before giving up.

The webhook URL lives in one place:

```js
// assets/js/common.js
const contactBackEndProcessorLink = "https://curson8n-n8n.moggzk.easypanel.host/webhook/09e92bc0-561d-4bbb-aed4-e89d85847239/adriana-contacto";
```

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
  keeps only the front-end. The PHP/MySQL back end it once used is gone —
  portfolio details are now served from static data in the front end, and
  the contact form talks to n8n instead of PHP.
- Running the site locally still lets the contact form submit for real, since
  it POSTs straight to the live n8n webhook rather than a local server.

## Copyright

Original design and front-end by [josewebdev2000](https://github.com/josewebdev2000), 2023.
