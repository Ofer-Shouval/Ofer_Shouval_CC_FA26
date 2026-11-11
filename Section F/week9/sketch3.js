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
let dotNumber = 0;

let shapePoints = [] 
// array of p5.Vectors. 
// Vector is p5 object with a bunch of math functions attached. 
// here we're just using it to store x,y coordinates
let numPoints = 6

let pinch = 0
let pinchLoc


async function setup() {
  createCanvas(640, 480);

  // Load the handPose model asynchronously
  handPose = await ml5.handPose({ flipped: true });

  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);

  for (let i = 0; i < numPoints; i++) {
    shapePoints[i] = createVector(random(width * 0.25, width * 0.75), 
    random(height * 0.25, height * 0.75))
  }

}


function draw() {
  // Draw the webcam video
  background(0)

  noFill()
  push()
  scale(-1, 1)
  image(video, -width, 0, width, height);
  pop()

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {

    // going through the hands that are on the screen if there's 0, doesnt run. 
    // if there's 2, runs twice

    let hand = hands[i];
    // a new variable 'hand' is declared and is filled with the data for
    //  whichever hand we're dealing with first


    for (let j = 0; j < hand.keypoints.length; j++) {

      //____________things we for each keypoint in here _________________

      //now we go through all the points that are contained in each hand. 
      // // hand.keypoints contains an array of all the x,y coordinates of these points

      let keypoint = hand.keypoints[j];
      // load current keypoint into its own variable


      stroke(0, 255, 0);


      //allows us to see which dot is which by changing its stroke color
      if (j == dotNumber) {
        stroke(255, 0, 0)
        }
        circle(keypoint.x, keypoint.y, 10);


      //______________________________________________________________
      }

   

    // we know which keypoints represent the thumb and the index finger tips, put a line between them. 
    line(hand.keypoints[4].x, hand.keypoints[4].y, hand.keypoints[8].x, hand.keypoints[8].y)

    //we make a vector for each of these locations, we check the distances between them 
    let thumb = createVector(hand.keypoints[4].x, hand.keypoints[4].y)
    let index = createVector(hand.keypoints[8].x, hand.keypoints[8].y)

    //check distances between thumb and index finger, if less than 25 px, set pinch to 1, otherwise set it to 0 
    if (thumb.dist(index) < 25) {
      pinch = 1
      pinchLoc = thumb.copy()
    }
    else {
      pinch = 0
    }

    //debug
    print(pinch)

    //if we are pinching, we go through the shape points and check if theyre within 25 px of the pinchLoc, which has been set to thumb,
    
    if (pinch == 1) {
      for (let k = 0; k < shapePoints.length; k++) {
        if (pinchLoc.dist(shapePoints[k]) < 25) {
          shapePoints[k].set(pinchLoc)
          
          //if one is close enough, stop going through the array and set the location of that point the thumb is
          break

        }
      }
    }
  }


  stroke(200)
  text(dotNumber, 20, 20)

  
  // draw the shape based on whatever the set of points are at that moment
  beginShape()
  for (let p = 0; p < numPoints; p++) {
    vertex(shapePoints[p].x, shapePoints[p].y)
  }
  endShape(CLOSE)

  // Draw the corner handles outside beginShape/endShape
  for (let p = 0; p < numPoints; p++) {
    circle(shapePoints[p].x, shapePoints[p].y, 5)
  }
}




// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable. will then be used in draw
  hands = results;
}

function mousePressed() {

  dotNumber++

  // handPose always gives 21 keypoints per hand
  if (dotNumber == 21) {
    dotNumber = 0
  }

  // print(shapePoints)

}