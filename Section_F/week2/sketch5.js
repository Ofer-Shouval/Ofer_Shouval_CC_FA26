let x, y;
let diameter = 200;
let yV = 5,
  xV = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();
  y = diameter / 2;
  x = width / 2;
}
function draw() {
  //background(100)

  // x = random(width)
  // y = random( height);
  let r = map(y, diameter / 2, height - diameter / 2, 0, 255);
  let b = map(x, diameter / 2, width - diameter / 2, 0, 255);
  let g = map(x, diameter / 2, width - diameter / 2, 255, 0);

  // diameter = r
  fill(r + random(-8, 8), g + random(-8, 8), b + random(-8, 8));

  ellipse(x, y, diameter + +random(-8, 8));

  fill(r ,g,b)
  ellipse(x,y, diameter+ + random(-8,8));

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
