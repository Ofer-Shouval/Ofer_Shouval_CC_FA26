function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
}

function draw() {
  background(0);
  loadPixels();
  
  let index = 0;

  for(let x = 0; x<width; x++){
    for(let y = 0; y<width; y++){

    pixels[index] = map(x, 0,width, 0, 250)
    pixels[index+1] = 0
    pixels[index+2] = 0
    pixels[index+3] = 255

    
    index+=4
    }
  }
  
  updatePixels();
  
}