
//animated sprites


async function setup(){
  createCanvas(windowWidth, windowHeight);
  frameRate(12);
  rectMode(CENTER)
  imageMode(CENTER)

  for (let i = 1; i <= 12; i++) {
    frames.push(await loadImage('walk_cycle_png_sequence/' + i + '.png'));
  }

}
function draw(){


}