// Tone.js version of sketch1.js
// Two copies of the same clip, mouseX controls the speed of one, mouseY the other.
// Negative speed = play backwards.

let mySound;
let mySound1;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Tone.Player loads the file itself (no preload needed)
  mySound = new Tone.Player({ url: "microphones_clip.mp3", loop: true }).toDestination();
  mySound1 = new Tone.Player({ url: "microphones_clip.mp3", loop: true }).toDestination();
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);

  // show a loading message until both files have downloaded
  if (!mySound.loaded || !mySound1.loaded) {
    text("Loading...", width / 2, height / 2);
    return;
  }
  text("Click to play", width / 2, height / 2);

  let playBackSpeedX = map(mouseX, 0, width, -3, 3);
  let playBackSpeedY = map(mouseY, 0, height, -3, 3);

  if (mySound.state === "started") {
    setRate(mySound, playBackSpeedX);
  }
  if (mySound1.state === "started") {
    setRate(mySound1, playBackSpeedY);
  }
}

// Tone's playbackRate can't be negative, so we split the speed into
// "how fast" (playbackRate) and "which direction" (reverse).
function setRate(player, speed) {
  player.playbackRate = abs(speed);

  let backwards = speed < 0;
  if (player.reverse !== backwards) {
    player.reverse = backwards; // flips the audio
    player.restart();           // needed for the flip to be heard
  }
}

async function mousePressed() {
  // unlock audio on the first click (p5.sound did this for you)
  await Tone.start();

  if (mySound.state === "started") {
    mySound.stop();
  } else {
    mySound.start();
  }

  if (mySound1.state === "started") {
    mySound1.stop();
  } else {
    mySound1.start();
  }
}
