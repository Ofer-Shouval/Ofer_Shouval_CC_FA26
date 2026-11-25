// Is today warmer or colder than normal?
// Compares today's average temperature with the same date over the last 30 years.
// Two Open-Meteo APIs, no key needed:
//   forecast API  -> today's average
//   archive API   -> every day of the last 30 years (we keep only today's date)

let lat = 40.73; // Manhattan. Right-click a spot in Google Maps to get its numbers
let lon = -73.99;

// the same settings for both requests
let settings = "&daily=temperature_2m_mean&temperature_unit=fahrenheit&timezone=America/New_York";

let today; // today's average temperature
let todayDate; // like "2026-11-25"
let past = []; // [{ year, temp }, ...] one for each past year on today's date
let normal; // the average of all of those
let lowest, highest; // the range to draw

async function setup() {
  createCanvas(windowWidth, windowHeight);

  // 1. today's average
  let forecast = await loadJSON(
    "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + settings + "&forecast_days=1"
  );
  today = forecast.daily.temperature_2m_mean[0];
  todayDate = forecast.daily.time[0];

  let thisYear = int(todayDate.slice(0, 4)); // "2026-11-25" -> 2026
  let monthDay = todayDate.slice(5); // "2026-11-25" -> "11-25"

  // 2. the last 30 full years, every day
  let history = await loadJSON(
    "https://archive-api.open-meteo.com/v1/archive?latitude=" + lat + "&longitude=" + lon +
      "&start_date=" + (thisYear - 30) + "-01-01&end_date=" + (thisYear - 1) + "-12-31" + settings
  );
  console.log(history);

  // 3. keep only the days with today's month and day, and average them
  let sum = 0;
  for (let i = 0; i < history.daily.time.length; i++) {
    let day = history.daily.time[i];
    let temp = history.daily.temperature_2m_mean[i];
    if (day.endsWith(monthDay) && temp != null) {
      past.push({ year: int(day.slice(0, 4)), temp: temp });
      sum += temp;
    }
  }
  normal = sum / past.length;

  // find the coldest and warmest values so everything fits on screen
  lowest = today;
  highest = today;
  for (let p of past) {
    lowest = min(lowest, p.temp);
    highest = max(highest, p.temp);
  }
}

function draw() {
  background(245);

  let left = 80;
  let right = width - 80;
  let y = height / 2;

  // turn a temperature into an x position
  function tempToX(t) {
    return map(t, lowest - 3, highest + 3, left, right);
  }

  // headline
  let difference = today - normal;
  let words = difference < 0 ? "colder" : "warmer";
  noStroke();
  fill(30);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("Today is " + nf(abs(difference), 1, 1) + "°F " + words + " than normal", width / 2, 80);
  textSize(14);
  fill(110);
  text(todayDate + " compared with the same date in " + past[0].year + "–" + past[past.length - 1].year, width / 2, 115);

  // the axis
  stroke(200);
  strokeWeight(2);
  line(left, y, right, y);
  noStroke();
  fill(110);
  textSize(13);
  text(nf(lowest - 3, 1, 0) + "°F", left, y + 30);
  text(nf(highest + 3, 1, 0) + "°F", right, y + 30);

  // one small dot for each past year
  fill(120, 120, 120, 150);
  for (let p of past) {
    circle(tempToX(p.temp), y, 12);
  }

  // the normal: a blue line
  let normalX = tempToX(normal);
  stroke(40, 100, 220);
  strokeWeight(3);
  line(normalX, y - 50, normalX, y + 50);
  noStroke();
  fill(40, 100, 220);
  textSize(16);
  text("normal " + nf(normal, 1, 1) + "°F", normalX, y - 70);

  // today: a big red dot
  let todayX = tempToX(today);
  fill(220, 60, 40);
  circle(todayX, y, 28);
  text("today " + nf(today, 1, 1) + "°F", todayX, y + 70);

  // hover a gray dot to see its year
  fill(30);
  textSize(13);
  for (let p of past) {
    if (dist(mouseX, mouseY, tempToX(p.temp), y) < 6) {
      text(p.year + ": " + nf(p.temp, 1, 1) + "°F", tempToX(p.temp), y - 25);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
