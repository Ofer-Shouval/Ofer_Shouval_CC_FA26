let mySound;
let mySound1;

// both pairs of sounds, so we can switch between them
let ping, ping1, mic, mic1;
let usingPing = true; // press 's' to switch

function preload() {
  // preload() waits until the sound files finish loading
  ping = loadSound('ping.mp3');
  ping1 = loadSound('ping.mp3');

  mic = loadSound('microphones_clip.mp3');
  mic1 = loadSound('microphones_clip.mp3');

  // start with ping
  mySound = ping;
  mySound1 = ping1;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  text('Click to play', width / 2, height / 2);

  if (usingPing) {
    text('sound: ping (press s to switch)', width / 2, height / 2 + 20);
  } else {
    text('sound: microphones clip (press s to switch)', width / 2, height / 2 + 20);
  }

  let playBackSpeedX = map(mouseX, 0,width,-3,3)
  let playBackSpeedY = map(mouseY, 0,height,-3,3)

  if(mySound.isPlaying()){
    mySound.rate(playBackSpeedX)
  }
  if(mySound1.isPlaying()){
    mySound1.rate(playBackSpeedY)
  }


}

function mousePressed() {

  // console.log(mySound.isP)

if(mySound.isPlaying()){
  mySound.stop()
}
else{
 mySound.loop();
}

if(mySound1.isPlaying()){
  mySound1.stop()
}
else{
 mySound1.loop();
}

}

function keyPressed() {
  if (key == 's') {
    // remember if we were playing before switching
    let wasPlaying = mySound.isPlaying();

    // stop the old pair
    mySound.stop();
    mySound1.stop();

    // point mySound and mySound1 at the other pair
    if (usingPing) {
      mySound = mic;
      mySound1 = mic1;
      usingPing = false;
    } else {
      mySound = ping;
      mySound1 = ping1;
      usingPing = true;
    }

    // if we were playing, keep playing with the new sound
    if (wasPlaying) {
      mySound.loop();
      mySound1.loop();
    }
  }
}
