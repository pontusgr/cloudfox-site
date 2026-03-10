# Cloudfox — Landing Page

AI‑accelerated delivery of operational software. Built with React + Vite, deployed to Azure Static Web Apps.

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Build for Production

```bash
npm run build
npm run preview   # preview the build locally
```

Output goes to `dist/` folder.

## Deploy to Azure Static Web Apps

### Option A: Via GitHub Actions (recommended)

1. Create a GitHub repo and push this code
2. In Azure Portal → Create resource → Static Web App
3. Connect to your GitHub repo
4. Azure auto-generates the GitHub Actions workflow, but one is already included in `.github/workflows/`
5. Copy the deployment token from Azure Portal → Static Web App → Manage deployment token
6. Add it as a GitHub secret: `AZURE_STATIC_WEB_APPS_API_TOKEN`
7. Push to `main` — auto-deploys

### Option B: Via Azure CLI

```bash
npm run build
az staticwebapp create --name cloudfox-site --resource-group <your-rg> --source dist
```

### Option C: Via VS Code

1. Install "Azure Static Web Apps" extension
2. Right-click `dist/` folder → Deploy to Static Web App
3. Follow prompts

## Custom Domain

1. Azure Portal → Static Web App → Custom domains
2. Add `cloudfox.se` (or your domain)
3. Add CNAME/TXT records as instructed
4. SSL is automatic

## Project Structure

```
cloudfox-site/
├── .github/workflows/     # CI/CD for Azure
├── public/
│   ├── favicon.svg         # Brand favicon
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── Cloudfox.jsx        # Main landing page component
│   ├── global.css          # CSS reset
│   └── main.jsx            # React entry point
├── index.html              # HTML shell with SEO meta tags
├── staticwebapp.config.json # Azure SWA routing + security headers
├── vite.config.js
└── package.json
```

## TODO Before Launch

- [ ] Replace `https://cloudfox.se/` with actual domain in meta tags + sitemap
- [ ] Create OG image (1200×630px) and save as `public/og-image.png`
- [ ] Add Google Analytics or Plausible analytics snippet
- [ ] Consider adding a Calendly link instead of LinkedIn for booking
- [ ] Test on mobile devices
