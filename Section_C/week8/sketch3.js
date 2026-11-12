let cam 
let canv 
let scalar = 12

async function setup() {
  canv = createCanvas(640, 480);

  cam = await createCapture(VIDEO, {flipped:true}, camReady)

  // cam.hide()

  pixelDensity(1);
}

function camReady(){
  print(cam.width, cam.height)
  cam.size(cam.width/scalar,cam.height/scalar)

}

function draw() {
  background(0,0,0);
  
  cam.loadPixels();

 let index = 0


 for( let y = 0; y<cam.height; y++){ 
    for(let x = 0; x<cam.width; x++){

    let r = cam.pixels[index]
    let g = cam.pixels[index+1]
    let b = cam.pixels[index+2]

    let bright = (r+g+b)/3

    let rectSize = map(r, 0,255,0,scalar)



    // fill(r,g,b)
    // fill(b)



    rect(x * scalar ,y* scalar, rectSize)

      
    index += 4 
    


    }
  }
  cam.updatePixels();

  
  
}