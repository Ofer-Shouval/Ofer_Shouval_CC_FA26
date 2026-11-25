// collect.mjs: collects NYT headlines into headlines.txt, a few more every time you run it.
//
// Run it from the terminal (any folder works):
//   node Tests/nyt_collect/collect.mjs
//
// Each run asks the NYT Article Search API for the newest headlines,
// skips the ones already saved, and adds the rest to headlines.txt (one per line).
// The file is .mjs (a "module") so we can use await at the top level, like in async setup().

import fs from "fs"; // "fs" = file system: lets Node read and write files

// file paths, relative to this script (so it works no matter where you run it from)
const keyPath = new URL("../nyt_headlines/key.js", import.meta.url);
const headlinesPath = new URL("headlines.txt", import.meta.url);

const PAGES = 3; // how many pages to ask for (10 headlines per page)
const PAUSE = 12000; // milliseconds between requests (the API allows about 5 per minute)

// 1. Get the key out of key.js (the same file the sketches use, ignored by git)
let keyFile = fs.readFileSync(keyPath, "utf8");
let key = keyFile.match(/NYT_KEY = "(.+)"/)[1];

// 2. Load the headlines we already have (or start empty the first time)
let saved = [];
if (fs.existsSync(headlinesPath)) {
  saved = fs.readFileSync(headlinesPath, "utf8").split("\n").filter((line) => line != "");
}

// a pause: Node (like p5) has no sleep(), so we wrap setTimeout in a Promise
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 3. Ask the API for the newest headlines, one page at a time
let added = 0;
for (let page = 0; page < PAGES; page++) {
  if (page > 0) {
    console.log("waiting " + PAUSE / 1000 + " seconds...");
    await wait(PAUSE);
  }

  let url =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&page=" + page + "&api-key=" + key;
  let response = await fetch(url); // like loadJSON(), but built into Node

  if (!response.ok) {
    // 401 = bad key, 429 = too many requests (wait a minute)
    console.log("page " + page + " failed with status " + response.status);
    break;
  }

  let data = await response.json();

  // 4. Keep only the headlines we haven't saved before
  for (let doc of data.response.docs) {
    let headline = doc.headline.main.trim();
    if (headline != "" && !saved.includes(headline)) {
      saved.push(headline);
      added++;
    }
  }
  console.log("page " + page + " done");
}

// 5. Write everything back, one headline per line
fs.writeFileSync(headlinesPath, saved.join("\n") + "\n");
console.log("added " + added + ", total " + saved.length);
