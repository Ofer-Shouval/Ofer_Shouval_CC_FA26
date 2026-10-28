

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
}

function draw() {
  loadPixels();

  // grab the pixels array once, then work on it
  let px = pixels;

  let index = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {

      px[index]     = sin(map(x,0,width,0,PI*10))*255
      px[index + 1] =  sin(map(y,0,mouseX,0,PI*10))*255
      px[index + 2] = 0
      px[index + 3] = 255;

      index += 4;
    }
  }

  updatePixels();
}

 
