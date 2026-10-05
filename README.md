# SMAB website

Plain HTML/CSS/JS. No build step, no dependencies.

| File | What it is |
|---|---|
| `index.html` | All the content. Each section is a `<section>`. |
| `style.css` | Colors, fonts, sizes (brand colors are at the top). |
| `script.js` | Fades the tiling between colorways as you scroll. |
| `tiles/*.svg` | The five Penrose colorways. |

## Editing
- **Add an event / board year:** copy one `<li>...</li>` line in the list and edit it.
- **Add a resource:** copy one `<a class="card">...</a>` block.
- **Add a section:** copy a whole `<section>`, give it a new `id`, set `data-colorway`
  to one of `home why events resources boards`, and add a link to it in the home menu.
- **Text size:** `--body-size` at the top of `style.css`.

## Publishing on GitHub Pages
1. Create a public repo and upload these files (keep `tiles/` as a folder).
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`. Save.
3. After a minute the site is live at `https://<username>.github.io/<repo>/`.
   (A repo named `<username>.github.io` publishes at `https://<username>.github.io/`.)
