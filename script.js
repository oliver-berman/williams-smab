/* Crossfades the tiling panel between colorways as you scroll.
   Each <section data-colorway="..."> picks its layer in .tiles.
   When a section's bottom edge rises past the middle of the screen,
   the next section's colorway fades in. */
(function () {
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[data-colorway]"));
  var layers = {};
  document.querySelectorAll(".tiles .layer").forEach(function (el) {
    layers[el.dataset.colorway] = el;
  });

  function update() {
    var h = window.innerHeight;
    var mid = h / 2;
    var fadeZone = h * 0.6;   /* bigger = slower fade */

    var cur = 0;
    for (var i = 0; i < sections.length; i++) {
      cur = i;
      if (sections[i].getBoundingClientRect().bottom > mid) break;
    }
    var curName = sections[cur].dataset.colorway;
    var next = sections[cur + 1];
    var nextName = next ? next.dataset.colorway : null;

    var left = sections[cur].getBoundingClientRect().bottom - mid;
    var t = nextName ? Math.min(1, Math.max(0, 1 - left / fadeZone)) : 0;
    t = t * t * (3 - 2 * t);  /* smooth start and finish */

    Object.keys(layers).forEach(function (name) {
      var s = layers[name].style;
      if (name === curName)       { s.opacity = 1; s.zIndex = 1; }
      else if (name === nextName) { s.opacity = t; s.zIndex = 2; }
      else                        { s.opacity = 0; s.zIndex = 0; }
    });
  }

  var ticking = false;
  function request() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; update(); });
  }
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request);
  update();
})();
