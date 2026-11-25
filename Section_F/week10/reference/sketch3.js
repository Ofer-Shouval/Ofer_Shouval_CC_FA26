// A minor scale frequencies (in Hz)
// A3 = 220.00  (one octave lower: divide by 2)
// A4 = 440.00
// B4 = 493.88
// C5 = 523.25
// D5 = 587.33
// E5 = 659.25
// F5 = 698.46
// G5 = 783.99
// A5 = 880.00  (one octave higher: multiply by 2)

// How to find the frequency of any note (notes are on a logarithmic scale)
// an octave has 12 steps (semitones), and each octave doubles the frequency
// so each step multiplies the frequency by the 12th root of 2 (about 1.0595)
//
//   frequency = 440 * pow(2, n / 12)
//
// n = how many semitones away from A4 (440 Hz)
//   n = 0   -> A4 = 440
//   n = 3   -> C5 = 523.25
//   n = 12  -> A5 = 880 (one octave up)
//   n = -12 -> A3 = 220 (one octave down)
//
// A minor scale steps from A: 0, 2, 3, 5, 7, 8, 10, 12
// p5.sound also has midiToFreq(): midiToFreq(69) = 440 (A4)



let osc1;
let osc2;

let freq = 440

let playing

function setup() {
  createCanvas(400, 400);

  // an oscillator makes a tone by repeating a wave shape
  osc1 = new p5.Oscillator('sine');
  osc2 = new p5.Oscillator('sine');

  // keep the volume low so the two together aren't too loud
  osc1.amp(0.3);
  osc2.amp(0.3);
}

function draw() {
  background(220);
  text('hold the mouse to play', 20, 20);





}




// function mousePressed() {
//   // starting an oscillator on a user interaction like mousePressed() will enable audio in browsers that have a strict autoplay policy (most browsers).
//   osc1.start();
//   // osc2.start()
//   // playing = true;
// }

// function mouseReleased() {
//   //lower volume to 0 over 0.1 seconds
//   // osc1.amp(0, 0.1);
//   //  playing = false;
// }


