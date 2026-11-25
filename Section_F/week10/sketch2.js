let mySound;
let mySound1;

function preload() {
  // preload() waits until the sound file finishes loading
  // mySound = loadSound('microphones_clip.mp3');
  // mySound1 = loadSound('microphones_clip.mp3');

  
  // mySound = loadSound('ping.mp3');
  // mySound1 = loadSound('ping.mp3');
  
    mySound = loadSound('diiv.mp3');


}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER)
}

function draw() {
  background(220);
  fill(0); // text color (the handle below changes fill to white)
  textAlign(CENTER, CENTER);
  text('press p to play or stop', width / 2, 20);


    let time = mySound.currentTime()

   if(mySound.isPlaying()){
     
    // seconds played, just above the left end of the bar
    text(round(time) + ' s', 40, height/2 - 30)
  }

  // the scrub bar: an outline the length of the song, 40px in from each side
  let barLeft = 40
  let barRight = width - 40

  noFill()
  rect(width/2, height/2, barRight - barLeft, 20)

  // the handle: where we are in the song
  fill(255)
  rect(map(time, 0, mySound.duration(), barLeft, barRight), height/2, 20,20)


  // let playBackSpeedX = map(mouseX, 0,width,-3,3)
  // let playBackSpeedY = map(mouseY, 0,height,-3,3)

  // if(mySound.isPlaying()){
  //   mySound.rate(playBackSpeedX)
  // }
  // if(mySound1.isPlaying()){
  //   mySound1.rate(playBackSpeedY)
  // }


}

function keyPressed() {

  


// only the p key does anything
if(key == 'p'){
  if(mySound.isPlaying()){
    mySound.stop()
  }
  else{
    mySound.loop();
  }
}


}

function mouseDragged(){

  if(mySound.isPlaying()){
     // map the mouse along the bar (40px in from each side) to a time in the song
     mySound.jump(map(mouseX, 40, width - 40, 0, mySound.duration(), true))
  }
}
