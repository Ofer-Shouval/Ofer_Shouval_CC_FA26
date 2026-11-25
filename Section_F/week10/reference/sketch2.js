let micSound;
let pingSound;
let mySound; // the sound we are using right now

let reverb;
let delay;

let soundMenu;
let playButton;
let rateSlider;
let reverbSlider;
let delaySlider;
let feedbackSlider;

function preload() {
  micSound = loadSound('microphones_clip.mp3');
  pingSound = loadSound('ping.mp3');
}

function setup() {
  createCanvas(400, 200);

  mySound = micSound;

  // effects (both sounds go into them)
  reverb = new p5.Reverb();
  reverb.process(micSound, 3, 2); // 3 seconds long, decay 2
  reverb.process(pingSound, 3, 2);

  delay = new p5.Delay();
  delay.process(micSound, 0.3, 0.5); // 0.3 seconds, feedback 0.5
  delay.process(pingSound, 0.3, 0.5);

  // menu to choose the sound
  soundMenu = createSelect();
  soundMenu.option('microphones');
  soundMenu.option('ping');
  soundMenu.changed(changeSound);

  // play button
  playButton = createButton('play');
  playButton.mousePressed(togglePlay);

  // sliders with labels: min, max, start, step
  createP('rate');
  rateSlider = createSlider(-2, 2, 1, 0.01);

  createP('reverb');
  reverbSlider = createSlider(0, 1, 0.5, 0.1);

  createP('delay time');
  delaySlider = createSlider(0, 1, 0.3, 0.1);

  createP('delay feedback');
  feedbackSlider = createSlider(0, 0.9, 0.5, 0.1);
}

function draw() {
  background(220);

  // use the sliders
  mySound.rate(rateSlider.value());
  reverb.amp(reverbSlider.value());
  delay.delayTime(delaySlider.value());
  delay.feedback(feedbackSlider.value());

  // the bar
  noFill();
  rect(20, 90, 360, 20);

  // the rect moves with the sound
  let x = map(mySound.currentTime(), 0, mySound.duration(), 20, 360);
  fill(255);
  rect(x, 90, 20, 20);
}

function changeSound() {
  // stop the old sound
  mySound.stop();
  playButton.html('play');

  // pick the new sound
  if (soundMenu.value() == 'ping') {
    mySound = pingSound;
  } else {
    mySound = micSound;
  }
}

function togglePlay() {
  if (mySound.isPlaying()) {
    mySound.pause();
    playButton.html('play');
  } else {
    mySound.loop();
    playButton.html('pause');
  }
}

function mouseDragged() {
  // drag on the bar to jump
  if (mouseY > 90 && mouseY < 110) {
    // the last true keeps the value between 0 and the duration
    mySound.jump(map(mouseX, 20, 380, 0, mySound.duration(), true));
  }
}
