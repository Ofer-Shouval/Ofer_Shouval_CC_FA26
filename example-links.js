// Adds a row of links to every example on a week page, and loads the one that was picked.
//
// Usage on a week page (after the p5 <script> tags):
//   <script src="../../example-links.js"></script>
//   <script> exampleLinks(["sketch1.js", "sketch2.js"], "sketch2.js"); </script>
//
// Clicking a link reloads the page as weekN.html?sketch=sketch1.js
// With no ?sketch= in the address, the default sketch is shown.

function exampleLinks(sketches, defaultSketch) {
  const params = new URLSearchParams(window.location.search);
  let current = params.get("sketch");

  // only allow file names from the list
  if (!sketches.includes(current)) {
    current = defaultSketch;
  }

  let html = '<nav style="display: flex; flex-wrap: wrap; gap: 15px; margin: 8px 0;">';
  for (const file of sketches) {
    const label = file.replace(".js", "");
    const weight = file === current ? "bold" : "normal";
    html += `<a href="?sketch=${file}" style="font-weight: ${weight};">${label}</a>`;
  }
  html += "</nav>";
  document.write(html);

  // document.write loads the sketch right away, so p5 finds setup() like a normal <script> tag
  document.write(`<script src="${current}"></script>`);
}
