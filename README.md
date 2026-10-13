# Gentlemans Resources LTD website

Marketing site for Gentlemans Resources LTD, built with React, Vite and Tailwind CSS.

- **Quote and compliance forms** post to a Google Apps Script web app (`src/appscript/code.gs`). The script emails the admin and logs each request to a Google Sheet.
- **Projects** are read from the "Projects" tab of the same Google Sheet through the script's `doGet`.
- **Hero slider images** are every image in `src/assets/sliderImages/`. Add or remove files there; no code changes needed.

## Setup

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev
```

`.env` is not committed. All variables are prefixed `VITE_`, so they end up in the public site bundle: never put secrets in them. `VITE_NOTIFY_URL` is the Apps Script web app URL.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run lint` | Run ESLint |
| `npm run build` | Build the site into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |

## Deploying

The site is hosted on cPanel, which pulls this repo with Git and serves the committed `dist/` folder. To deploy:

1. `npm run build`
2. Commit the updated `dist/` along with your source changes and push.
3. Pull the latest commit in cPanel's Git Version Control.

## Apps Script

`src/appscript/code.gs` is a copy of the script deployed in the client's Google account. Editing it here does nothing on its own: paste it into the Apps Script editor and create a new deployment version. Changes to it are coordinated with the client.
