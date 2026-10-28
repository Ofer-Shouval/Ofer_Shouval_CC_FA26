let cam
let scale = 4 

async function setup() {
  
  cam = await createCapture(VIDEO,{ flipped:true }, videoReady)

  //cam default size 640x480

  pixelDensity(1);
}

function videoReady(){
  cam.size(cam.width/scale, cam.height/scale)
  createCanvas(640, 480)
}

function draw() {
  background(0);
  cam.loadPixels();
  
  let index = 0;

  for(let y = 0; y<cam.height; y++){
    for(let x = 0; x<cam.width; x++){

   let r = cam.pixels[index]
   let g = cam.pixels[index+1]
   let b = cam.pixels[index+2]
   fill(r,g,b)
   rect(x*scale,y*scale,scale)
    
    index+=4
    }
  }
  // ellipse(100,100,100)
  
  cam.updatePixels();
  
}

function mousePressed(){
  print(cam.width, cam.height)
}