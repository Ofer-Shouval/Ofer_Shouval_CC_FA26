let handPose;
let video;
let hands = [];

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
}

function draw() {
  // Draw the webcam video

  scale(-1,1)
  translate(-width,0)
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

      circle(keypoint.x, keypoint.y, 10);
    
    }
  }
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}
