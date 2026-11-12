let x, y;
let diameter = 100
let yV = 5, xV = 3

function setup(){
    createCanvas(windowWidth,windowHeight)
    y = diameter/2
    x = width/2


}
function draw(){
  background(100)
  ellipse(x,y, diameter);

  x += xV
  y += yV

  if(y > height - diameter/2){
    yV = -yV;
  }
  if(y < diameter/2 ){
    yV = -yV;
  }
  if(x>width- diameter/2){
    xV = -xV
  }
  if(x < diameter/2){
    xV = -xV
  }
  print(y)

 
}

