/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates hand tracking on live video through ml5.handPose.
 */

let handPose;
let video;
let hands = [];
let dotNum = 0 

//if(pinch != null)

let thumbTip = [0,0]
let indexTip = [0,0]

let pinch = 0 
let fingerDistance = 0

async function setup() {
  createCanvas(640, 480);
  
  // Load the handPose model asynchronously
  handPose = await ml5.handPose({maxHands: 2,flipped: true}
);
  
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

function draw() {
  // Draw the webcam video
  push()

  scale(-1,1)
  translate(-width, 0)
 
  image(video, 0, 0, width, height);
  pop()

  fill(0)
  noStroke()

  text('dotNum: ' + dotNum, 25,  50)
  text('finger distance: ' + fingerDistance, 25,  75)

  if(pinch == 1){
    ellipse(35,100,20)
  }
  // else{
  //   ellipse(25,150,0)
  // }

  // ellipse(400, 400, 100,100) 

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];

    for (let j = 0; j < hand.keypoints.length; j++) {

      let keypoint = hand.keypoints[j];
      
      fill(0, 255, 0);

      if (j == dotNum){
        fill(255, 0, 0);
      }

      if(j == 4){
        thumbTip = [keypoint.x, keypoint.y]
      }

      if(j == 8){
        indexTip = [keypoint.x, keypoint.y]
      }
      // thumb keypoint = 4, index keypoint = 8
      
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }

    stroke(255)
    line(thumbTip[0],thumbTip[1], indexTip[0], indexTip[1]) 
    fingerDistance = dist(thumbTip[0],thumbTip[1], indexTip[0], indexTip[1])

    if(fingerDistance < 20){
      pinch = 1
    }
    else{
      pinch = 0
    }

  }      

}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}

function mousePressed(){
    dotNum ++

    if(dotNum > 20){
        dotNum = 0
    }
}

