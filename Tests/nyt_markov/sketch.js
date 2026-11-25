// Fake NYT headlines: load real headlines from the Article Search API,
// feed them into a RiTa Markov chain, and click to generate new ones.
// p5 2.x version of "Example 1.4 - NYTimes API copy" (2022).
// Uses the key from ../nyt_headlines/key.js (not committed to git).

let markov;
let headlines = [];
let fake = "Click for a fake headline";

async function setup() {
  createCanvas(windowWidth, windowHeight);

  // Article Search gives 10 headlines per page, so ask for 5 pages (about 50 headlines)
  for (let page = 0; page < 5; page++) {
    let url =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&page=" + page + "&api-key=" + NYT_KEY;
    let data = await loadJSON(url);

    for (let doc of data.response.docs) {
      let headline = doc.headline.main.trim();
      // the Markov chain needs sentences, so make sure each headline ends like one
      if (!headline.endsWith(".") && !headline.endsWith("?") && !headline.endsWith("!")) {
        headline = headline + ".";
      }
      headlines.push(headline);
    }
  }
  print(headlines);

  // 2 = look at the last 2 words to pick the next one
  // higher numbers sound more like the real headlines, lower numbers get weirder
  // (with only ~50 headlines, 3 mostly repeats the originals)
  markov = RiTa.markov(2);
  markov.addText(headlines.join(" "));
}

function draw() {
  background(250);
  fill(20);
  textSize(36);
  textAlign(CENTER, CENTER);
  text(fake, 40, 0, width - 80, height);
}

function mousePressed() {
  fake = markov.generate({ minLength: 5, maxLength: 14 });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
