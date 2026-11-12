

let cam

let scale = 8

function setup() {
  createCanvas(400, 400);
  // pixelDensity(1);
  cam = createCapture(VIDEO)
  cam.size(width/scale,height/scale)

  // print(cam.size)
  // print(cam.height)
  // cam.hide()

}


function draw() {

  cam.loadPixels();
  loadPixels()
  

  // grab the pixels array once, then work on it
  let px = cam.pixels;
  let canvPx = pixels;

  let index = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      
      let r = px[index] 
      canvPx[index] = r

      // px[index + 1] = random(255)
      // px[index + 2] = abs(sin(mappedY)*255)
      // px[index + 3] = 255


      index += 4;
    }
  }

  cam.updatePixels();
  updatePixels()
}

 
