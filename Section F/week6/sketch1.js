
//animated sprites

let frames = []
async function setup(){
  createCanvas(windowWidth, windowHeight);
  frameRate(12);
  rectMode(CENTER)
  imageMode(CENTER)

  for (let i = 1; i <= 12; i++) {
    frames.push(await loadImage('walk_cycle_png_sequence/' + i + '.png'));
  }


}
counter = 0

function draw(){

  background(200)

  let currentFrame = frames[counter%frames.length]

  // print(currentFrame)
  

  image(currentFrame,width/2,height/2)

  counter++
}