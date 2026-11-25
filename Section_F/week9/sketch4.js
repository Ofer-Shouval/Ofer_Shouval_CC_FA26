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

let shapePoints = [] // array of p5.Vectors
let numPoints = 6

let smoothHands = [] // smoothHands[i][j] = smoothed p5.Vector for hand i, keypoint j
let smoothAmount = 0.3 // 0 = frozen, 1 = no smoothing (raw)

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

let pinch = 0
let pinchLoc

function draw() {
  // Draw the webcam video
  background(0)

  noFill()
  push()
  scale(-1, 1)
  image(video, -width, 0, width, height);
  pop()

  // forget smoothed hands that are no longer detected
  smoothHands.length = hands.length

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];

    // lerp each smoothed point toward the new raw keypoint
    if (!smoothHands[i]) {
      smoothHands[i] = []
    }
    for (let j = 0; j < hand.keypoints.length; j++) {
      let raw = hand.keypoints[j]
      if (!smoothHands[i][j]) {
        smoothHands[i][j] = createVector(raw.x, raw.y) // first frame: start at raw
      } else {
        smoothHands[i][j].lerp(raw.x, raw.y, 0, smoothAmount)
      }
    }
    let pts = smoothHands[i]

    for (let j = 0; j < pts.length; j++) {
      let keypoint = pts[j];
      stroke(0, 255, 0);

      if (j == dotNumber) {
        stroke(255, 0, 0)
      }
      circle(keypoint.x, keypoint.y, 10);
    }

    if (i == 0) {
      stroke(0, 255, 0)
    }

    if (i == 1) {
      stroke(0, 0, 255)
    }

    line(pts[4].x, pts[4].y, pts[8].x, pts[8].y)

    let thumb = pts[4].copy()
    let index = pts[8].copy()

    if (thumb.dist(index) < 25) {
      pinch = 1
      pinchLoc = thumb.copy()
    }
    else {
      pinch = 0
    }

    print(pinch)

    if (pinch == 1) {
      for (let k = 0; k < shapePoints.length; k++) {
        if (pinchLoc.dist(shapePoints[k]) < 25) {
          shapePoints[k].set(pinchLoc)
          break
        }
      }
    }
  }


  stroke(200)
  text(dotNumber, 20, 20)

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
  // save the output to the hands variable
  hands = results;
}

function mousePressed() {

  dotNumber++

  // handPose always gives 21 keypoints per hand
  if (dotNumber == 21) {
    dotNumber = 0
  }

  print(shapePoints)

}