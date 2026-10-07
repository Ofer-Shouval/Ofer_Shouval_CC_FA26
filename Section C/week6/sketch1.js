
//animated sprites
let frames = [];

let xLoc = 0, yLoc = 0
let walk = true 

let img

async function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(12);
  rectMode(CENTER)
  imageMode(CENTER)

  for (let i = 1; i <= 12; i++) {
    frames[i-1] = (await loadImage('walk_cycle_png_sequence/' + i + '.png'));
  }
  print(frames)

  let button = createButton('start/stop');
  button.position(width/2, 100);

  // Call repaint() when the button is pressed.
  button.mousePressed(walkOrStop);

}

function draw(){
  background(240);

  if(walk){
   img = frames[frameCount % frames.length];
  }
  else{
    img = img
  }
  
  translate(width/2, height/2)
  image(img, 0, 0);

}

function walkOrStop(){
  if(walk){
    walk = !walk
  }
  else{
    walk = !walk
  }
  print(walk)

}





// function draw() {
 
//   if (keyIsPressed) {
//     if (key === 'a') {
//       xLoc -= 7.5;
//       reverse = -1;
//     } else if (key === 'd') {
//       xLoc += 7.5;
//       reverse = 1;
//     }
//   }
//   else if(!keyIsPressed){
//     // print('hi')
//     img = frames[1]
//   }

//   push();
//   translate(width / 2 + xLoc, height / 2);
//   scale(reverse, 1);
//   image(img, 0, 0);
//   pop();

//   fill(0)

//   rect(0.75*width, height/2, 100,200)

//   if(dist(width / 2 + xLoc, height/2, 0.75*width, height/2)<50){
//     // print("hit")
//      window.location.href = "../../index.html";
//   }

    
// }