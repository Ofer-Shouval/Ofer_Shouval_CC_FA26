
let osc1, osc2, freq = 220


function setup() {
  createCanvas(windowWidth, windowHeight);



osc1 = new Tone.Oscillator({
  frequency: freq,
  type: "sine",
  volume: -12          // decibels
}).toDestination();

osc2 = new Tone.Oscillator({
  frequency: freq,
  type: "sine",
  volume: -12          // decibels
}).toDestination();

  

}

function draw() {
  background(30);

  let offset = map(mouseX, 0, width, -15,15)
  osc2.set({frequency: freq + offset})

} 

let currentNote;
let onOff = 0
async function mousePressed() {
  await Tone.start()
  if(onOff == 0){
    osc1.start()
    osc2.start()
    onOff = 1
  }
  else{
    osc1.stop()
    osc2.stop()
    onOff = 0
  }
}
