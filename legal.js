/* Renders a markdown document (from documents/) into the page at runtime.
 *
 * Each legal page sets <body data-md="/documents/<file>.md"> and includes
 * marked + this script. To publish edits, just change the markdown file —
 * no HTML to touch. */
(function () {
  var main = document.querySelector("main.legal");
  var src = document.body.getAttribute("data-md");
  if (!main || !src) return;

  fetch(src, { cache: "no-cache" })
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text();
    })
    .then(function (md) {
      main.innerHTML = marked.parse(md);

      // Wrap tables so wide ones scroll horizontally on small screens.
      main.querySelectorAll("table").forEach(function (table) {
        var wrap = document.createElement("div");
        wrap.className = "table-scroll";
        table.parentNode.insertBefore(wrap, table);
        wrap.appendChild(table);
      });

      // Keep the browser tab title in sync with the document heading.
      var h1 = main.querySelector("h1");
      if (h1) document.title = h1.textContent + " · Gear Fitness";
    })
    .catch(function (err) {
      console.error("Failed to load legal document:", err);
      main.innerHTML =
        '<p class="doc-status">This document failed to load. Please email ' +
        '<a href="mailto:support@gearfitness.app">support@gearfitness.app</a>.</p>';
    });
})();
