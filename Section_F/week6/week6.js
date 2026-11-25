
//animated sprites

let frames = []

async function setup(){
  createCanvas(windowWidth, windowHeight)
  frameRate(12)
  rectMode(CENTER)
  imageMode(CENTER)

  // let img = await loadImage("walk_cycle_png_sequence/1.png")

  // image(img, width/2,height/2)

  for(let i = 1; i<=12; i++){
    frames[i-1] = await loadImage("walk_cycle_png_sequence/" + i + ".png")
    // print("walk_cycle_png_sequence/" + i + ".png")

  }

  // print(frames)

}

let counter = 0 
let xLoc = 0
let xV = 7.5
let dir = 1


function draw(){
  background(200)

  let currentFrame = frames[counter % frames.length]
  
  
  push()
  translate(xLoc,height/2)
  scale(dir,1)

  if(keyIsDown(RIGHT_ARROW)){
    dir = 1
    xV = 7.5
    counter++
    xLoc+=xV
  }
   if(keyIsDown(LEFT_ARROW)){
    dir = -1
    xV = -7.5

    counter++
    xLoc+=xV
  }

  image(currentFrame,0,0)
  pop()

  fill(0)
noStroke()

  if(dist(xLoc, height/2, width/2, height/2)<50){
    fill(200,150,0)

    window.location.href = "week6_1.html"
  }
  rect(width/2, height/2, 100,200)

  // if(xLoc>width){
  //   dir = -1
  //   xV = -7.5
  // }
  // else if(xLoc<0){
  //   dir = 1
  //   xV = 7.5
  // }

  

  // counter++
  // xLoc+=xV
}
































// let frames = []

// async function setup(){
//   createCanvas(windowWidth, windowHeight);
//   frameRate(12);
//   rectMode(CENTER)
//   imageMode(CENTER)

//   for (let i = 1; i <= 12; i++) {
//     frames.push(await loadImage('walk_cycle_png_sequence/' + i + '.png'));
//   }
// }

// let counter = 0
// let xLoc = 0
// let xV =7.5
// let dir = 1


// function draw(){

//   background(200)

//   let currentFrame = frames[counter%frames.length]

//   push()
//   translate(xLoc, 0)
//   scale(dir,1)

//   if(keyIsDown('a')){
//     counter++
//     xLoc -= xV
//     dir =-1
//     // print('a')
//   }
//   if(keyIsDown('d')){
//     counter++
//     dir = 1
//     xLoc += xV
//   }
//    image(currentFrame,0,height/2)
//   pop()

//   rect(width-200, height/2, 100,200)


//   if(dist(xLoc,height/2,width-200, height/2)< 10){
//     window.location.href= "../../index.html"
//   }
  
// }