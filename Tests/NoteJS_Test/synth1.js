let synth, synth2, filter

function setup() {
  createCanvas(400, 400);
  filter = new Tone.Filter(800, "lowpass").toDestination();
  synth = new Tone.PolySynth().connect(filter);

  synth.set({
    oscillator: { type: "sawtooth" },
    envelope: { attack: 0.001, decay: 0.1, sustain: 0.4, release: 5}
  });
  // Initialize a synth and connect it to the main audio output

  // synth.set();

}

function draw() {
  background(30);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Click anywhere to play a note", width / 2, height / 2);
// let d = map(mouseY, 0, height, 1200, -1200);
//   synth.set({ detune: d });
  filter.frequency.rampTo(map(mouseX, 0, width, 200, 4000), 0.1);


} 

let currentNote;

async function mousePressed() {
  await Tone.start();
  currentNote = random(200, 800);
  synth.triggerAttack(currentNote);
}

function mouseReleased() {
  synth.triggerRelease(currentNote);
}
