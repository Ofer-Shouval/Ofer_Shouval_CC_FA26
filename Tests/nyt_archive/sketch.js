// Fake NYT headlines from two different months, 50 years apart.
// The headline files come from collect.mjs (NYT Archive API), so this sketch
// needs no API key and makes no API requests.
//
// click = new fake headline     s = switch month

// add more months here after running: node Tests/nyt_archive/collect.mjs YEAR MONTH
let months = [
  { name: "November 2025", file: "headlines_2025_11.txt" },
  { name: "November 1975", file: "headlines_1975_11.txt" },
];

let current = 0; // which month we're using
let fake = "Click for a fake headline";

async function setup() {
  createCanvas(windowWidth, windowHeight);

  // build one Markov chain for each month
  for (let month of months) {
    let lines = await loadStrings(month.file);
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

    // 3 = look at the last 3 words to pick the next one.
    // With thousands of headlines, 3 sounds real without just copying.
    // Try 2 for weirder results.
    month.markov = RiTa.markov(5);
    month.markov.addText(headlines.join(" "));
    month.count = headlines.length;
  }
}

function draw() {
  background(250);
  let month = months[current];

  // which month, at the top
  noStroke();
  fill(120);
  textAlign(CENTER, TOP);
  textSize(16);
  text(month.name + "  ·  " + month.count + " real headlines  ·  press s to switch", width / 2, 30);

  // the fake headline
  fill(20);
  textAlign(CENTER, CENTER);
  textSize(40);
  text(fake, 60, 0, width - 120, height);
}

function mousePressed() {
  fake = months[current].markov.generate({ minLength: 5, maxLength: 14 });
}

function keyPressed() {
  if (key == "s") {
    current = (current + 1) % months.length; // next month, back to the first after the last
    fake = months[current].markov.generate({ minLength: 5, maxLength: 14 });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
