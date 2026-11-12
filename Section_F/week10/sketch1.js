let mySound;
let mySound1;

function preload() {
  // preload() waits until the sound file finishes loading
  mySound = loadSound('microphones_clip.mp3');
mySound1 = loadSound('microphones_clip.mp3');

  
  // mySound = loadSound('ping.mp3');
  // mySound1 = loadSound('ping.mp3');
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  text('Click to play', width / 2, height / 2);

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
