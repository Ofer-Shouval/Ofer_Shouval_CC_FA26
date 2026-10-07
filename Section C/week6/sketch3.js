
let frames = []

let x 
let xV = 7.5
let dir = 1

async function setup(){
  createCanvas(windowWidth, windowHeight)
  frameRate(12);
  imageMode(CENTER)
  // let f = await loadImage('walk_cycle_png_sequence/1.png')

  x = width/2
  for(let i = 1; i<=12; i++){
    frames[i-1] = await loadImage('walk_cycle_png_sequence/' + i + '.png')
  }

 print(frames)



}

let lastFrame = 0


function draw(){


  background(200)
  let img 

  translate(x,height/2)

  scale(dir,1)
 
  if(keyIsPressed && key == 'a'){

    img = frames[frameCount % frames.length]
    lastFrame = frameCount % frames.length
    dir = -1
    
  }
  else if(keyIsPressed && key == 'd'){
   
    img = frames[frameCount % frames.length]
    lastFrame = frameCount % frames.length
    dir = 1
     
  }
  else{
    img = frames[lastFrame]
    
  }

    image(img, 0, 0)
    x += xV * dir
 
  // print(frameCount % frames.length)

}