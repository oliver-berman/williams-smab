# SMAB website

The official website for Williams SMAB is hosted via GitHub pages. The link to the actual website, for right now at least is, [oliver-berman.github.io/williams-smab)](oliver-berman.github.io/williams-smab)


## In case it's unclear, here's what all the files do:

| File | What it does |
|---|---|
| `index.html` | All the content. Each section is a `<section>`. |
| `style.css` | Colors, fonts, sizes (brand colors are at the top). |
| `script.js` | Fades the tiling between colorways as you scroll. |
| `tiles/*.svg` | The five Penrose colorways. |


## Here's how to edit this thing:
- **To add an event:** copy one `<li>...</li>` line in the list and edit it.
- **To add a resource:** copy one `<a class="card">...</a>` block.
- **To add a whole-ass section:** copy a whole `<section>`, give it a new `id`, set `data-colorway`
  to one of `home why events resources boards`, and add a link to it in the home menu.
- **To change the text size:** `--body-size` at the top of `style.css`.

There are of course other ways to edit this, but these are the parts most likely to change

## Contact
Though he never thought he'd be called this, you can contact the current webmaster Oliver Berman via email at oab at williams dot edu
