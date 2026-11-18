// Playback speed AND direction with the new p5.sound library (p5.js 2.x)
//
// mouseX controls sound 1, mouseY controls sound 2:
//   left / top edge     = backwards, 3x speed
//   middle              = frozen (speed 0)
//   right / bottom edge = forwards, 3x speed
//
// The new p5.sound rate() only accepts 0 and up, so we split the speed into
//   - how fast:  abs(speed)  -> rate()
//   - which way: speed < 0   -> reverse
// Reversing uses the Tone.js player that p5.sound is built on (sound.node).

let mySound;
let mySound1;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  // mySound = await loadSound('microphones_clip_15s.mp3');
  // mySound1 = await loadSound('microphones_clip_15s.mp3');
  // try a short sound too:
  mySound = await loadSound('ping.mp3');
  mySound1 = await loadSound('ping.mp3');

  // turn looping on (this does NOT start playback)
  mySound.loop(true);
  mySound1.loop(true);
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  text('Click to play / stop', width / 2, height / 2);

  let playBackSpeedX = map(mouseX, 0, width, -3, 3);
  let playBackSpeedY = map(mouseY, 0, height, -3, 3);

  setSpeed(mySound, playBackSpeedX);
  setSpeed(mySound1, playBackSpeedY);

  // show the current speeds
  text('X speed: ' + nf(playBackSpeedX, 1, 2), width / 2, height / 2 + 24);
  text('Y speed: ' + nf(playBackSpeedY, 1, 2), width / 2, height / 2 + 44);
}

// speed can be negative (backwards) or positive (forwards)
function setSpeed(sound, speed) {
  if (!sound.isPlaying()) {
    return;
  }

  // how fast: rate() only takes positive numbers
  sound.rate(abs(speed));

  // which way: only flip when we are clearly past the middle,
  // so the sound doesn't flicker back and forth around 0
  let wantsReverse = sound.node.reverse;
  if (speed < -0.1) {
    wantsReverse = true;
  } else if (speed > 0.1) {
    wantsReverse = false;
  }

  if (wantsReverse !== sound.node.reverse) {
    sound.node.reverse = wantsReverse; // flips the audio data
    sound.node.restart(); // a playing sound only hears the flip after a restart
  }
}

function mousePressed() {
  if (mySound.isPlaying()) {
    mySound.stop();
  } else {
    mySound.play();
  }

  if (mySound1.isPlaying()) {
    mySound1.stop();
  } else {
    mySound1.play();
  }
}
