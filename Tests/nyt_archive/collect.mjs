// collect.mjs: saves every NYT headline from one month into a text file.
//
// Run it from the terminal (any folder works):
//   node Tests/nyt_archive/collect.mjs 2025 11
//
// That creates headlines_2025_11.txt next to this script, one headline per line.
// The NYT Archive API returns a whole month in ONE request (about 10 MB for a recent month),
// so we download it once here and keep only the headlines (a few hundred KB).
// The archive goes back to 1851. Needs "Archive API" enabled on your NYT app.

import fs from "fs";

// year and month from the command line, or these defaults
const YEAR = process.argv[2] || "2025";
const MONTH = String(parseInt(process.argv[3] || "11")); // the API wants 1-12, no leading zero

// sections to leave out. "Gameplay" is puzzle hints (Wordle, Strands...), which aren't news.
// This is a choice about the data: try removing it and see how the fake headlines change.
const SKIP_SECTIONS = ["Gameplay"];

// skip short labels like "People and Business" or "SHOP TALK" (section names, not headlines)
const MIN_WORDS = 3;

// older months have many headlines in ALL CAPS ("PRIME RATE IS CUT TO 7½").
// The Markov chain treats "RATE" and "Rate" as different words, so we change them to Title Case.
const FIX_ALL_CAPS = true;

function titleCase(text) {
  // "PRIME RATE IS CUT" -> "Prime Rate Is Cut", "U.S." stays "U.S."
  return text.toLowerCase().replace(/(^|[\s.\-])([a-z])/g, (match, before, letter) => before + letter.toUpperCase());
}

// the key lives in ../nyt_headlines/key.js (ignored by git)
const keyFile = fs.readFileSync(new URL("../nyt_headlines/key.js", import.meta.url), "utf8");
const key = keyFile.match(/NYT_KEY = "(.+)"/)[1];

const url = "https://api.nytimes.com/svc/archive/v1/" + YEAR + "/" + MONTH + ".json?api-key=" + key;
console.log("downloading " + YEAR + "/" + MONTH + "...");

const response = await fetch(url);
if (!response.ok) {
  // 401 = bad key or Archive API not enabled, 429 = too many requests (wait a minute)
  console.log("failed with status " + response.status);
  process.exit(1);
}
const data = await response.json();

// keep each headline once, skipping empty ones and the skipped sections
let headlines = [];
for (let doc of data.response.docs) {
  let headline = doc.headline.main.trim();
  if (headline.split(" ").length < MIN_WORDS) continue;
  if (SKIP_SECTIONS.includes(doc.section_name)) continue;
  if (FIX_ALL_CAPS && headline == headline.toUpperCase()) {
    headline = titleCase(headline);
  }
  if (headlines.includes(headline)) continue;
  headlines.push(headline);
}

// headlines_2025_11.txt (month padded to 2 digits so the files sort in order)
const fileName = "headlines_" + YEAR + "_" + MONTH.padStart(2, "0") + ".txt";
fs.writeFileSync(new URL(fileName, import.meta.url), headlines.join("\n") + "\n");
console.log(data.response.docs.length + " articles, saved " + headlines.length + " headlines to " + fileName);
