let pMapper
let quadMap, quadMap2, quadMap3, quadMap4
let squaresBuf, walkersBuf, flowersBuf, solidColorBuf

let guys = []
let frames = []
let flowers = []


async function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pMapper = createProjectionMapper(this);

  //SQUARES 
  quadMap = pMapper.createQuadMap(400, 400, 20, 20);
  //WALKERS 
  quadMap2 = pMapper.createQuadMap(400, 400, 20, 20);
  //FLOWERS 
  quadMap3 = pMapper.createQuadMap(400, 200, 20, 20);
  //SOLID COLOR
  quadMap4 = pMapper.createQuadMap(400, 200, 20, 20);


  squaresBuf = createGraphics(400, 400);
  walkersBuf = createGraphics(400, 400);
  flowersBuf = createGraphics(400, 200);

  solidColorBuf = createGraphics(400, 200);

  //walkers initialization

  for (let i = 1; i <= 12; i++) {
    frames.push(await loadImage("walk_cycle_png_sequence/" + i + ".png"));
  }
  for (let j = 0; j < 50; j++) {
    guys[j] = new Guy(
      random(walkersBuf.width),
      random(100, walkersBuf.height - 200),
      walkersBuf);
  }

  //flowers initialization

  for (let i = 0; i < 20; i++) {
    flowers.push(new Flower(random(flowersBuf.width), random(flowersBuf.height)));
  }



  pMapper.load("maps/map.json");
}

function draw() {
  background(0);

  squares(squaresBuf);
  walkers(walkersBuf)
  flowerField(flowersBuf)
  solidColor(solidColorBuf)

  quadMap.displayTexture(squaresBuf);
  quadMap2.displayTexture(walkersBuf);
  quadMap3.displayTexture(flowersBuf);
  quadMap4.displayTexture(solidColorBuf);

}


function solidColor(pg){
  pg.push()
  pg.colorMode(HSB)
  pg.background(frameCount%360, 100,100,100)
  pg.pop()
}

function squares(pg) {
  pg.push();
  pg.background(255, 100, 100, 10);
  pg.noStroke();
  pg.fill(0, 100, 200);
  pg.rect(random(pg.width), random(pg.height), 100);
  pg.pop();
}


function walkers(pg) {
  pg.push();
  pg.background(255,200,200);
  for (let i = 0; i < guys.length; i++) {
    guys[i].move(pg);
  }
  pg.pop();
}


function flowerField(pg) {
  
  pg.push();
  pg.angleMode(DEGREES);
  pg.background(0);
  let d = map(mouseX, 0, width, -5, 5);
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].move(d, pg);
    flowers[i].display(pg);
  }
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





class Guy {
  constructor(x, y, pg) {
    this.xLoc = x;
    this.yLoc = y;
    this.sizeScalar = map(this.yLoc, 0, pg.height, 0.2, 1);
    this.direction = random([1, -1]);
    this.cycleSpeed = floor(random(1, 5));
    this.velocity = 7.5 * this.sizeScalar;
    this.counter = 0;
    this.framesElapsed = 0;
    this.img = frames[0];
  }

  move(pg) {
    this.img = frames[this.framesElapsed % frames.length];

    pg.push();
    pg.translate(this.xLoc, this.yLoc);
    pg.scale(this.direction * this.sizeScalar, this.sizeScalar);
    pg.image(this.img, 0, 0);
    pg.pop();

    if (this.direction == 1 && this.xLoc > pg.width) {
      this.xLoc = 0;
    } else if (this.direction == -1 && this.xLoc < 0) {
      this.xLoc = pg.width;
    }

    if (this.counter % this.cycleSpeed == 0) {
      this.framesElapsed++;
      this.xLoc += this.velocity * this.direction;
    }
    this.counter++;
  }
}




class Flower{
    constructor(x, y){
        this.x = x
        this.y = y
        this.numPetals = random(3,16)
        this.petalWidth = random(20,40)
        this.petalLength = random(30, 80)
        this.centerDiameter = random(30,40)
        this.centerCol = color(random(255),random(255),random(255))
        this.petalCol = color(random(255),random(255),random(255))
        this.xV = random(-5,5)
        this.yV = random(-5,5)
        this.rotations = 0
        this.rV = random(-5,5)
    }

    move(d, pg){

        this.x+=this.xV
        this.y+=this.yV
        this.rotations += this.rV*d

        // wrap around the edges of the buffer
        if (this.x > pg.width) this.x = 0
        if (this.x < 0) this.x = pg.width
        if (this.y > pg.height) this.y = 0
        if (this.y < 0) this.y = pg.height
    }
    display(pg){
        pg.push()
        pg.translate(this.x, this.y)
        pg.rotate(this.rotations)
        pg.fill(this.petalCol)
        for(let r = 0; r < this.numPetals; r++){
            pg.push()

            pg.rotate((360/this.numPetals)*r)
            pg.translate(this.petalLength/2,0)
            pg.ellipse(0,0,this.petalLength,this.petalWidth )
            pg.pop()
        }
        pg.fill(this.centerCol)
        pg.ellipse(0,0,this.centerDiameter)

        pg.pop()

     }

}