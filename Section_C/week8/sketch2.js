let cam 
let canv 
let numRows = 8 
let numCols = 8

async function setup() {
  canv = createCanvas(640, 480);

  cam = await createCapture(VIDEO, {flipped:true}, camReady)

  cam.hide()

  pixelDensity(1);
}

function camReady(){
  print(cam.width, cam.height)

}

function draw() {
  background(0,200,0);
  
  // loadPixels();

 let index = 0


  for( let x = 0; x < numCols; x++){
    for( let y = 0; y< numRows; y++){
      image(cam,x*width/numCols,y* height/numCols, width/numCols*0.8 ,height/numCols*0.8)
      // image(vid,x*width/numCols +50,y* height/numCols +50, width/numCols,height/numCols)
    }

  }

  // updatePixels();

  
  
}