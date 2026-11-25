
let osc1, osc2, freq = 110
let waveform 

let aMinor = [220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00];



function setup() {
  createCanvas(windowWidth, windowHeight);



osc1 = new Tone.Oscillator({
  frequency: freq,
  type: "sine",
  volume: -Infinity          // decibels
}).toDestination();

osc2 = new Tone.Oscillator({
  frequency: 2*freq,
  type: "sine",
  volume: -Infinity        // decibels
}).toDestination();


waveform = new Tone.Waveform(8192);
Tone.getDestination().connect(waveform); 
    osc1.start()
    osc2.start()  
}

function draw() {
  background(30);

  let noteNum = floor(map(mouseX, 0,width,0,8))

  freq = aMinor[noteNum]
  console.log(freq)

  let offset = map(mouseY, 0, height, -15,15)
  osc2.frequency.value= freq + offset
  osc1.frequency.value= freq

  let values = waveform.getValue();  // array of numbers from -1 to 1
  // console.log('hi')
  stroke(255);
  noFill();



beginShape();
  for (let i = 0; i < values.length; i++) {
  let x = map(i, 0, values.length, 0, width);
  let y = map(values[i], -1, 1, height, 0);
  vertex(x, y);
}
endShape();

} 

let currentNote;
let onOff = 0
async function mousePressed() {
  await Tone.start()
  if(onOff == 0){

    osc1.volume.rampTo(-12, 0.5)
    osc2.volume.rampTo(-12, 0.5)
    
    onOff = 1
  }
  else{
    osc1.volume.rampTo(-Infinity, 0.5)
    osc2.volume.rampTo(-Infinity, 0.5)
    
    onOff = 0
  }
}
