let synth;
let delay;
let filter;
let fft;
let letters = ["a", "w", "s", "e", "d", "f", "t", "g", "y", "h", "u", "j", "k"];
let keysDown = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  delay = new Tone.FeedbackDelay();
  delay.set({
  delayTime: 0.3,
  feedback: 0.4,
  wet: 0.2,
});

  // delay.set({
  //   delayTime: 0.3,   // seconds between echoes, or a note length like "8n"
  //   feedback: 0.4,    // 0-1: how many echoes (keep below 1)
  //   wet: 0.5,         // 0-1: echo vs. original sound
  // });
  // maxDelay (longest delayTime allowed, default 1) only works inside new Tone.FeedbackDelay({ maxDelay: 2 })

  filter = new Tone.Filter().toDestination();
  filter.set({
    type: "lowpass",
    frequency: 1000,
    Q: 1,
  });

  // filter.set({
  //   type: "lowpass",   // "lowpass", "highpass", "bandpass", "notch", "lowshelf", "highshelf", "peaking", "allpass"
  //   frequency: 1000,   // cutoff in Hz
  //   Q: 1,              // resonance: higher = sharper peak at the cutoff
  //   rolloff: -12,      // how steep the cut is: -12, -24, -48 or -96 (dB per octave)
  //   gain: 0,           // dB, only for "lowshelf", "highshelf" and "peaking"
  // });

  delay.connect(filter);

  synth = new Tone.PolySynth()
  synth.volume.value = -10;
  synth.set({
    oscillator: { type: "triangle"},
    // oscillator: { type: "fatsquare", count:2, spread:5 },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.0, release: 0.05 },
  });

  // synth.set({
  //   detune: 0,             // cents (100 = one semitone)
  //   portamento: 0,         // seconds to glide between pitches
  //   oscillator: {
  //     type: "triangle",    // "sine", "triangle", "square", "sawtooth"
  //                          // or "fatsawtooth", "amsine", "fmsquare"...
  //     count: 3,            // fat types only: how many stacked oscillators
  //     spread: 20,          // fat types only: detune between them, in cents
  //   },
  //   envelope: {
  //     attack: 0.05,        // seconds to fade in
  //     decay: 0.2,          // seconds to drop to the sustain level
  //     sustain: 0.5,        // 0-1: volume while the note is held
  //     release: 1.5,        // seconds to fade out after release
  //     attackCurve: "linear",   // "linear", "exponential", "sine", "cosine", "bounce", "ripple", "step"
  //     releaseCurve: "exponential",
  //   },
  // });
  // synth.maxPolyphony = 32;  // most notes at once (set directly, not in set())

  synth.connect(delay)

  // synth.toDestination()

  // the FFT listens to the end of the chain (what we hear)
  // and splits the sound into 2048 frequency bands, low to high
  fft = new Tone.FFT(2048);
  filter.connect(fft);

  
}

function keyFreq(steps) {
  return (880) * pow(2, steps / 12);
}

function draw() {
  background(30);

  let cutoff = map(mouseX, 0, width, 100, 8000, true);
  filter.set({frequency: cutoff})

  let keyWidth = width / letters.length;

  for (let i = 0; i < letters.length; i++) {

    rectMode(CORNER)
    fill(240);
    rect(i * keyWidth, 0, keyWidth, 120);

    fill(30);
    textAlign(CENTER, CENTER);
    text(letters[i], i * keyWidth + keyWidth / 2, 100);
  }

  // getValue() gives one number per band: how loud it is, in decibels
  // -100 = silent, 0 = as loud as it gets
  let values = fft.getValue();

  // only draw the lower quarter of the bands (0 to about 5500 Hz),
  // that's where the notes and their harmonics are
  let bands = values.length / 8;
  let barWidth = width / bands;

  push();
  noStroke();
  fill(120, 200, 255);
  for (let i = 0; i < bands; i++) {

    rectMode(CENTER);
    let barHeight = map(values[i], -100, 0, 2, 300, true);
    rect(i * barWidth + barWidth / 2, height / 2, barWidth, barHeight);
  }
  pop();
}

function keyPressed(event) {
  Tone.start();
  let letter = event.key.toLowerCase();

  for (let i = 0; i < letters.length; i++) {
    if (letter === letters[i] && !keysDown[i]) {
      keysDown[i] = true;
      synth.triggerAttack(keyFreq(i));
    }
  }
}

function keyReleased(event) {
  let letter = event.key.toLowerCase();

  for (let i = 0; i < letters.length; i++) {
    if (letter === letters[i] && keysDown[i]) {
      keysDown[i] = false;
      synth.triggerRelease(keyFreq(i));
    }
  }
}
