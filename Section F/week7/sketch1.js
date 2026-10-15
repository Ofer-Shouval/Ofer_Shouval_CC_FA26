let pMapper;
let quadMap, quadMap2, quadMap3, quadMap4;
let circleBuf, squaresBuf, walkersBuf, wormBuf;
let frames = [];
let guys = [];
let ripples = [];

// worm + grid
let xLoc = [];
let yLoc = [];
let numSegments = 100;
let rows = 15;
let cols = 15;
let boxes = [];
let layer1, layer2;
let onOff = 0;
let num = 1;
let counter = 0;

async function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pMapper = createProjectionMapper(this);

  quadMap = pMapper.createQuadMap(400, 400, 20, 20);
  quadMap2 = pMapper.createQuadMap(300, 200, 20, 20);
  quadMap3 = pMapper.createQuadMap(300, 300, 20, 20);
  quadMap4 = pMapper.createQuadMap(300, 300, 20, 20);

  circleBuf = createGraphics(400, 400);
  circleBuf.background(255);

  squaresBuf = createGraphics(400, 400);
  squaresBuf.background(200, 200, 0);

  walkersBuf = createGraphics(900, 600);

  // worm: square to match quadMap3
  wormBuf = createGraphics(600, 600);
  layer1 = createGraphics(wormBuf.width, wormBuf.height);
  layer2 = createGraphics(wormBuf.width, wormBuf.height);

  for (let i = 0; i < numSegments; i++) {
    xLoc[i] = wormBuf.width / 2;
    yLoc[i] = wormBuf.height / 2;
  }
  for (let i = 0; i < rows * cols; i++) {
    boxes[i] = 0;
  }

  for (let i = 1; i <= 12; i++) {
    frames.push(await loadImage("walk_cycle_png_sequence/" + i + ".png"));
  }

  for (let j = 0; j < 50; j++) {
    guys[j] = new Guy(
      random(walkersBuf.width),
      random(100, walkersBuf.height - 200),
      walkersBuf
    );
  }

  pMapper.load("maps/map.json");
}

function draw() {
  background(0);

  circles(circleBuf);
  squares(squaresBuf);
  walkers(walkersBuf);
  worm(wormBuf);

  quadMap.displayTexture(circleBuf);
  quadMap2.displayTexture(walkersBuf);
  quadMap3.displayTexture(wormBuf);
  quadMap4.displayTexture(squaresBuf);
}

function circles(pg) {
  pg.push();
  pg.background(255);

  let maxSize = pg.width * 1.5;

  if (frameCount % 20 === 0) {
    ripples.push({ size: 0 });
  }

  pg.noFill();
  pg.strokeWeight(4);

  for (let r of ripples) {
    r.size += 3;
    let alpha = map(r.size, 0, maxSize, 255, 0);
    pg.stroke(0, 100, 200, alpha);
    pg.circle(pg.width / 2, pg.height / 2, r.size);
  }

  ripples = ripples.filter(r => r.size < maxSize);

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

function worm(pg) {
  let w = pg.width;
  let h = pg.height;

  // worm
  layer1.clear();
  layer1.stroke(255);
  layer1.fill(0);

  xLoc[numSegments - 1] = w * noise(counter);
  yLoc[numSegments - 1] = h * noise(counter + 10);

  for (let i = 0; i < numSegments - 1; i++) {
    xLoc[i] = xLoc[i + 1];
    yLoc[i] = yLoc[i + 1];

    let diameter = 200 * sin(map(i, 0, numSegments - 1, 0, PI));
    let r = diameter;
    let g = 200 - diameter;
    let b = 200 * cos(map(i, 0, numSegments - 1, 0, PI));

    layer1.stroke(r, g, b);
    layer1.ellipse(xLoc[i], yLoc[i], diameter);
  }

  // grid
  let index = 0;
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      layer2.stroke(255);
      layer2.strokeWeight(0.01);
      layer2.fill(0, 0);

      if (
        w * noise(counter) > x * (w / cols) &&
        w * noise(counter) < (x + 1) * (w / cols) &&
        h * noise(counter + 10) > y * (h / rows) &&
        h * noise(counter + 10) < (y + 1) * (h / rows)
      ) {
        boxes[index] = 255;
      }

      // layer2.fill(boxes[index], random(10), random(10), floor(boxes[index]));
      // layer2.rect(x * (w / cols), y * (h / rows), w / cols, h / rows);

      boxes[index] *= 0.99;
      index++;
    }
  }

  // combine the layers into the surface's buffer
  pg.background(0);
  pg.image(layer1, 0, 0, w, h);
  pg.image(layer2, 0, 0, w, h);

  counter += 0.01;
}

function squares(pg) {
  pg.push();
  pg.background(255, 100, 100, 10);
  pg.noStroke();
  pg.fill(0, 100, 200);
  pg.rect(random(pg.width), random(pg.height), 100);
  pg.pop();
}

function mousePressed() {
  onOff = num % 2;
  num++;
}

function keyPressed() {
  if (key === "c") pMapper.toggleCalibration();
  if (key === "s") pMapper.save("map.json");
  if (key === "l") pMapper.load("maps/map.json");
  if (key === "f") fullscreen(!fullscreen());
  if (key === "x") {
    circleBuf.background(255);
    squaresBuf.background(200, 200, 0);
  }
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