
let frames = []

let x 
let xV = 7.5


async function setup(){
  createCanvas(windowWidth, windowHeight)
  frameRate(12);
  imageMode(CENTER)
  // let f = await loadImage('walk_cycle_png_sequence/1.png')

  
  for(let i = 1; i<=12; i++){
    frames[i-1] = await loadImage('walk_cycle_png_sequence/' + i + '.png')
  }
x = width/2
 print(frames)



}

let lastFrame = 0
let counter = 0

function draw(){


  let dir = 1

  background(200)
  let img 

  translate(x,height/2)

  scale(dir,1)
 
  if(keyIsPressed && key == 'a'){

    img = frames[counter % frames.length]
    dir = -1

    counter++
    
  }
  else if(keyIsPressed && key == 'd'){
   
    img = frames[counter % frames.length]
    
    dir = 1
    counter++
     
  }


    image(img, 0, 0)
    x += xV * dir
 
  // print(frameCount % frames.length)

}