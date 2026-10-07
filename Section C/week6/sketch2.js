
let frames = []

async function setup(){
  createCanvas(windowWidth, windowHeight)
  frameRate(12);

  let f = await loadImage('walk_cycle_png_sequence/1.png')

  print(f)
  // for( let i = 1; i<=12; i++){
  //   frames[i-1] = await loadImage()
  // }
  image(f, 0,0)


}