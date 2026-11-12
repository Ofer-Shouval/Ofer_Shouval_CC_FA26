let osc1;
let osc2;

let freq1 = 440
let freq2 = 450
let playing

let amplitude;

let reverb

function setup() {
  createCanvas(400, 400);

  // an oscillator makes a tone by repeating a wave shape
  osc1 = new p5.Oscillator('sine');
  osc2 = new p5.Oscillator('sine');

  reverb = new p5.Reverb(3);
reverb.wet(1);
  osc1.connect(reverb)
  osc2.connect(reverb)
  osc1.start();
  osc2.start();

 


  // keep the volume low so the two together aren't too loud
  osc1.amp(0);
  osc2.amp(0);
}

function draw() {

  freq2 = map(mouseX, 0, width, 440,520)
  osc1.freq(freq1)
  osc2.freq(freq2)


  background(220);


  


}


function mousePressed() {
  // starting an oscillator on a user interaction like mousePressed() will enable audio in browsers that have a strict autoplay policy (most browsers).
  osc1.amp(0.3)
  osc2.amp(0.3)
}

function mouseReleased() {
  osc1.amp(0)
  osc2.amp(0)
}
//   //lower volume to 0 over 0.1 seconds
//   osc1.amp(0, 0.1);
//   playing = false;
// }