// Fake NYT headlines from a saved file.
// headlines.txt is filled by collect.mjs (run it in the terminal), so this sketch
// needs no API key and makes no API requests.

let markov;
let fake = "Click for a fake headline";

async function setup() {
  createCanvas(windowWidth, windowHeight);

  // one headline per line
  let lines = await loadStrings("headlines.txt");
  let headlines = [];

  for (let line of lines) {
    let headline = line.trim();
    if (headline == "") continue;
    // the Markov chain needs sentences, so make sure each headline ends like one
    if (!headline.endsWith(".") && !headline.endsWith("?") && !headline.endsWith("!")) {
      headline = headline + ".";
    }
    headlines.push(headline);
  }
  print(headlines.length + " headlines");

  // 2 = look at the last 2 words to pick the next one
  // once the file has a few hundred headlines, try 3: it sounds more real
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
