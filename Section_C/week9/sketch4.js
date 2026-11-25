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

let shapePoints = []
let numPoints = 6

// smoothed copies of the 21 hand keypoints
let smoothPoints = []
// how fast the smoothed points catch up (0 = never move, 1 = no smoothing)
let smoothAmount = 0.7


const myTimeout = setTimeout(myGreeting, 5000);

async function setup() {
  createCanvas(640, 480);
  
  // Load the handPose model asynchronously
  handPose = await ml5.handPose({maxHands: 1,flipped: true}

 


);
  
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  
  
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);


  for(let i = 0; i< numPoints; i++){
    shapePoints[i] = []
    for(let j = 0; j<2; j++){
      if(j == 0){
        shapePoints[i][j] = random(width)
      }
       if(j == 1){
        shapePoints[i][j] = random(height)
      }
    }
  }

  console.log(shapePoints)

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

      // first time we see this point, start the smoothed point right on it
      if (smoothPoints[j] == undefined) {
        smoothPoints[j] = { x: keypoint.x, y: keypoint.y }
      }

      // move the smoothed point part of the way toward the new keypoint
      smoothPoints[j].x = lerp(smoothPoints[j].x, keypoint.x, smoothAmount)
      smoothPoints[j].y = lerp(smoothPoints[j].y, keypoint.y, smoothAmount)

      // from here on, use the smoothed point instead of the raw keypoint
      let smoothed = smoothPoints[j]
      
      fill(0, 255, 0);

      if (j == dotNum){
        fill(255, 0, 0);
      }

      if(j == 4){
        thumbTip = [smoothed.x, smoothed.y]
      }

      if(j == 8){
        indexTip = [smoothed.x, smoothed.y]
      }
      // thumb keypoint = 4, index keypoint = 8
      
      noStroke();
      circle(smoothed.x, smoothed.y, 10);
    }

    stroke(255)
    line(thumbTip[0],thumbTip[1], indexTip[0], indexTip[1]) 
    fingerDistance = dist(thumbTip[0],thumbTip[1], indexTip[0], indexTip[1])

    if(fingerDistance < 25){
      pinch = 1
    }
    else{
      pinch = 0
    }

  } 
  
  noFill()
  stroke(255)
  beginShape()

  for(let i = 0; i< numPoints; i++){

    if(dist(thumbTip[0],thumbTip[1],shapePoints[i][0], shapePoints[i][1]) < 25 && pinch == 1){

      shapePoints[i][0] = thumbTip[0] 
      shapePoints[i][1] = thumbTip[1] 
    }

    vertex(shapePoints[i][0], shapePoints[i][1])
    circle(shapePoints[i][0], shapePoints[i][1], 10)

  
  }

  endShape(CLOSE)

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

