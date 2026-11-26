// Bouncing ball that plays ping.mp3 on every wall hit.
// The pitch of each ping depends on where the ball hits.

let x, y;
let xV = 3;
let yV = 10;
let diameter = 50;

let sampler;
let delay;
let audioOn = false;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  x = width / 2;
  y = height / 2;

  Tone.context.lookAhead = 0; // play sounds right away, no delay

  // safety net at the end of the chain: stops anything going above -1 dB
  let limiter = new Tone.Limiter(-10).toDestination();

  // echo effect: repeats every 8th note, each repeat a bit quieter
  delay = new Tone.FeedbackDelay({
    delayTime: "8n",  // time between echoes (or seconds, e.g. 0.25)
    feedback: 0.4,    // 0-1: how much of each echo feeds back (more = more repeats)
    wet: 0.5,
    maxDelay: 1         // 0-1: mix of echo vs. original sound
  }).connect(limiter);

  // one sample is enough: Tone pitch-shifts it to any note
  // volume -12 dB leaves room for two pings + echoes stacking up
  sampler = new Tone.Sampler({
    urls: { C4: "ping.mp3" },
    volume: -20 
  }).connect(delay);
  await Tone.loaded(); // wait until ping.mp3 has downloaded
}

function draw() {
  background(100);
  fill(255);

  if (!audioOn) {
    textAlign(CENTER, CENTER);
    text("Click to start sound", width / 2, height / 2);
  }

  x += xV;
  y += yV;

  // left and right walls
  if (x < diameter / 2 || x > width - diameter / 2) {
    xV = -xV;
    x = constrain(x, diameter / 2, width - diameter / 2); // keep the ball on screen
    playTwoTones();
  }

  // top and bottom walls
  if (y < diameter / 2 || y > height - diameter / 2) {
    yV = -yV;
    y = constrain(y, diameter / 2, height - diameter / 2);
    playTwoTones();
  }

delay.delayTime.rampTo(map(x, 0, width, 0.1, 1, true), 0.1);
delay.feedback.rampTo(map(y, 0, height, 0.7, 1  , true), 0.1);


  ellipse(x, y, diameter);
}

// on every bounce, play two pings at once:
// one tone from x (left = low, right = high)
// one tone from y (bottom = low, top = high)
function playTwoTones() {
  // delay.delayTime.value = map(x, 0, width, 0.05, 0.8, true);   // set it per bounce

  ping(map(x, 0, width, 0.5, 2));
  ping(map(y, height, 0, 0.5, 2));
}

// speed: 1 = original sound, 2 = twice as fast (octave up), 0.5 = half (octave down)
function ping(speed) {
  if (audioOn) {

    sampler.triggerAttackRelease(261.63 * speed, 0.5); // 261.63 Hz is C4
    
  }
}

async function mousePressed() {
  await Tone.start(); // browsers need a click before audio can play
  audioOn = true;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
