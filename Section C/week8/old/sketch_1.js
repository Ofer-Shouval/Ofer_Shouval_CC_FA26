function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
}

function draw() {
  background(0);
  loadPixels();
  
  let index = 0;

  pixels[index] = 255

  updatePixels();
  
}