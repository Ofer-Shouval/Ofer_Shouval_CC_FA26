let frames = [];

let xLoc = 0, yLoc = 0
let reverse = 1


async function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(12);
  rectMode(CENTER)
  imageMode(CENTER)
  // textAlign(CENTER)

  for (let i = 1; i <= 12; i++) {
    frames.push(await loadImage('walk_cycle_png_sequence/' + i + '.png'));
  }

 print(frames)

}
let counter = 0

function draw() {
  background(240);
 
  text('press a to move left, d to move right', 0, 50)
  let img = frames[counter % frames.length];


  if (keyIsPressed) {
    if (key === 'a') {

      xLoc -= 7.5;
      reverse = -1;
      counter++;
    } else if (key === 'd') {
      xLoc += 7.5;
      reverse = 1;
      counter++
    }
  }
  // else if(!keyIsPressed){
  //   // print('hi')
  //   img = frames[0]
  // }

  push();
  translate(width / 2 + xLoc, height / 2);
  scale(reverse, 1);
  image(img, 0, 0);
  pop();

  fill(0)

  rect(0.75*width, height/2, 100,200)

  if(dist(width / 2 + xLoc, height/2, 0.75*width, height/2)<50){
    // print("hit")
     window.location.href = "../../index.html";
  }

    
}

