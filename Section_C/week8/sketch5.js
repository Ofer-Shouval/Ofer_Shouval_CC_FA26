let vid 
let canv 
let scalar = 8

async function setup() {
  canv = createCanvas(640, 480);

  vid = await createVideo('clip.mov',vidReady)

  vid.hide()  
  vid.loop()

  vid.volume(0)

  pixelDensity(1);

  stroke(255)
}

function vidReady(){

  print(vid.width, vid.height)
  vid.size(vid.width/scalar,vid.height/scalar)

}

function draw() {

image(vid,0,0)
  background(0,0,0);
  
  vid.loadPixels();

 let index = 0


 for( let y = 0; y<vid.height; y++){ 

  beginShape()
    for(let x = 0; x<vid.width; x++){

    let r = vid.pixels[index]
    let g = vid.pixels[index+1]
    let b = vid.pixels[index+2]
    
    let bright = (r+g+b)/3

    let rectSize = map(r, 0,255,0,scalar)



    // fill(r,g,b)
    // fill(b)

      noFill()

    // rect(x * scalar , y* scalar, rectSize)
  

   

    stroke(255)

    splineVertex(x*scalar, y*scalar +rectSize*2);
    stroke(r,g,b)
   

       point(x*scalar,y*scalar+rectSize*2)
    index += 4 
    


    }
    endShape()
  }
  vid.updatePixels();

  
  
}