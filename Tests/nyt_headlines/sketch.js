// NYT Article Search API: load the newest articles and list their headlines.
// p5 2.x version of "Example 1.4 - NYTimes API" (2022).
// The key lives in key.js (not committed to git). Get one at developer.nytimes.com

let url =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&api-key=" + NYT_KEY;

let headlines = [];

async function setup() {
  createCanvas(windowWidth, windowHeight);

  let data = await loadJSON(url);
  console.log(data); // look through it in the console, then follow the path to the headlines

  // follow the path: data -> response -> docs -> each doc -> headline -> main
  for (let doc of data.response.docs) {
    print(doc.headline.main);
    headlines.push(doc.headline.main);
  }
}

function draw() {
  background(250);
  fill(20);
  textSize(20);
  textAlign(LEFT, TOP);

  for (let i = 0; i < headlines.length; i++) {
    text(headlines[i], 40, 40 + i * 40);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
