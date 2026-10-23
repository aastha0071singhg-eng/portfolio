# Aastha Singh — portfolio

A plain HTML + CSS + JavaScript copy of the Lovable site. There is no build step, framework or install.

```
index.html   all page text and structure
style.css    colours, fonts, layout and animations
script.js    hero video controls, skill ribbons, ID card flip, pop-ups
assets/      intro video, video poster, portrait photo
```

## Run it locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Edit content

- Text, email, LinkedIn link: `index.html` (search for `aas0071thasingh@gmail.com` or `linkedin`).
- Skill ribbon items: the `capabilities` list at the top of `script.js`.
- Colours: the variables at the top of `style.css`.
- Video / portrait: replace the files in `assets/` (keep the same names).
- The ID card QR code encodes `mailto:aas0071thasingh@gmail.com`; regenerate it if the email changes.

## Host for free

Any static host works. Pick one:

**Netlify Drop (no account setup, ~1 minute)**
1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page.
3. You get a live `*.netlify.app` link. Sign in to keep it and rename it.

**GitHub Pages**
1. Create a new public repository on GitHub and upload these files (or `git push`).
2. Repository → Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The site appears at `https://<your-username>.github.io/<repo-name>/`.

**Vercel / Cloudflare Pages** also work: import the repo and leave the build command empty.
