let handPose;
let video;
let hands = [];

let shapePoints = []
let numPoints = 6

let distance = 0

let isPinched = 0


async function setup() {
  createCanvas(640, 480);
  
  // Load the handPose model asynchronously
  handPose = await ml5.handPose({maxHands: 1});
  
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);

  for(let i = 0; i<numPoints; i++){
    shapePoints[i] = createVector(random(width*0.25,width*0.75),
    random(height*0.25,height*0.75))
  }

}

function draw() {
  // Draw the webcam video

  scale(-1,1)
  translate(-width,0)


  background(255)
  image(video, 0, 0, width, height);

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];

    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];

      fill(0, 255, 0);
      noStroke();

      if(j == 4 || j == 8){
        fill(255,0,0)
      }
      
      circle(keypoint.x, keypoint.y, 5); 
    }
    stroke(0)

    line(hand.keypoints[4].x, hand.keypoints[4].y, hand.keypoints[8].x, hand.keypoints[8].y)
    distance = dist(hand.keypoints[4].x, hand.keypoints[4].y, hand.keypoints[8].x, hand.keypoints[8].y)
  }


  if(distance<20){

    isPinched = 1
  }
  else{
    isPinched = 0 
  }

  print(isPinched)

  stroke(0,100,200)

  if(isPinched == 0)
  {
    noFill()
  }
  else{
    fill(200,200,0)
  }
  
  beginShape()
    
  for(let i = 0; i<numPoints; i++){
    vertex(shapePoints[i].x, shapePoints[i].y)
    circle(shapePoints[i].x, shapePoints[i].y,5)
  }

  endShape(CLOSE)
  
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}
