function setup() {
  createCanvas(200, 200);
  pixelDensity(1);
}
function draw() {
  background(0);
  
  loadPixels();

 let index = 0

  for( let y = 0; y<height; y++){ 
    for(let x = 0; x<width; x++){

    // let r = random(255)
    // let g = 100
    // let b = map(y,0,height,0,255)   

    let r = random(100)
    let g = sin(map(x,0+frameCount,width,0,PI))*255 
    let b = sin(map(y,0+frameCount,height,0,PI*8))*255 

    pixels[index] = r
    pixels[index+1] = g
    pixels[index+2] = b
    index+=4
}
  }

  updatePixels();
  
}