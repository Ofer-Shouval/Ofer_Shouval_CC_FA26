let pMapper;
let quadMap
let squaresBuf 


async function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pMapper = createProjectionMapper(this);

  quadMap = pMapper.createQuadMap(400, 400, 20, 20);
  squaresBuf = createGraphics(400, 400);
  squaresBuf.background(200, 200, 0);


  // pMapper.load("maps/map.json");
}

function draw() {
  background(0);

  squares(squaresBuf);
  quadMap.displayTexture(squaresBuf);
  
}


function squares(pg) {
  pg.push();
  pg.background(255, 100, 100, 10);
  pg.noStroke();
  pg.fill(0, 100, 200);
  pg.rect(random(pg.width), random(pg.height), 100);
  pg.pop();
}



function keyPressed() {
  if (key === "c") pMapper.toggleCalibration();
  if (key === "s") pMapper.save("map.json");
  if (key === "l") pMapper.load("maps/map.json");
  if (key === "f") fullscreen(!fullscreen());
 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
