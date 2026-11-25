// Data vis intro: load live weather from an API and draw one number two ways.
// Open-Meteo needs no API key. Paste the url into a browser tab to see the raw JSON.

let url =
  "https://api.open-meteo.com/v1/forecast?latitude=40.73&longitude=-73.99&current=temperature_2m&temperature_unit=fahrenheit";

let data;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  data = await loadJSON(url);
  console.log(data); // look through it in the console, then follow the path to the number
}

function draw() {
  // follow the path: data -> current -> temperature_2m
  let temp = data.current.temperature_2m;

  // way 1: the number as a color (cold = blue, warm = red)
  let warm = map(temp, 20, 90, 0, 255, true);
  background(warm, 80, 255 - warm);

  // way 2: the number as text
  fill(255);
  textSize(64);
  textAlign(CENTER, CENTER);
  text(temp + "°F", width / 2, height / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
