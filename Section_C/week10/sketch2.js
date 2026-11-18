let mySound;
// let mySound1;

function preload() {
  // preload() waits until the sound file finishes loading
  // mySound = loadSound('microphones_clip.mp3');
  // mySound1 = loadSound('microphones_clip.mp3');

  
  // mySound = loadSound('ping.mp3');
  // mySound1 = loadSound('ping.mp3');
  
    // mySound = loadSound('diiv.mp3');

    mySound = loadSound('microphones_in_2020_clip.mp3')

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER)
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  text('press p to play or stop', width / 2, 20);


    let time = mySound.currentTime()

   if(mySound.isPlaying()){
     
    text(round(time), 10,10)
  }

  rect(map(time, 0, mySound.duration(),0,width), height/2, 20,20)

}

function keyPressed() {


if(mySound.isPlaying() && key == 'p'){
  mySound.stop()
} 
else{
  mySound.loop();
}


}

function mouseDragged(){

  if(mySound.isPlaying()){
     mySound.jump(map(mouseX,0,width, 0,mySound.duration() ))
  }
}
