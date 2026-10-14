/* Crossfades the tiling panel between colorways as you scroll. Each <section data-colorway="..."> picks its layer in .tiles. When a section's bottom edge rises past the middle of the screen, the next section's colorway fades in. */
(function () {
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[data-colorway]"));
  var layers = {};
  document.querySelectorAll(".tiles .layer").forEach(function (el) {
    layers[el.dataset.colorway] = el;
  });

  function update() {
    var h = window.innerHeight;
    var mid = h / 2;
    var fadeZone = h * 0.5;   /* bigger => slower fade */

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

/* Scroll progress rail: fills the track as you move through the page
   and lights up the dot for whichever section the tiles are showing. */
(function () {
  var fill = document.getElementById("progress-fill");
  var steps = Array.prototype.slice.call(document.querySelectorAll(".progress-steps a"));
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[data-colorway]"));
  if (!fill || !steps.length || !sections.length) return;

  function update() {
    /* how far down the document we are, 0 to 1 */
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = max > 0 ? Math.min(1, Math.max(0, scrolled / max)) : 0;
    fill.style.height = (pct * 100) + "%";

    /* same rule the tiles use: the current section is the first one
       whose bottom edge is still below the middle of the screen */
    var mid = window.innerHeight / 2;
    var cur = sections.length - 1;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().bottom > mid) { cur = i; break; }
    }
    var curName = sections[cur].dataset.colorway;

    steps.forEach(function (a) {
      var on = a.dataset.step === curName;
      a.classList.toggle("is-active", on);
      if (on) { a.setAttribute("aria-current", "true"); }
      else    { a.removeAttribute("aria-current"); }
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
