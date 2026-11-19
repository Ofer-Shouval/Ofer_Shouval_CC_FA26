let osc1, osc2, amp1, amp2, frequency = 440
let reverb

let cMajor = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00,493.88, 523.25]


function setup(){
    createCanvas(windowWidth, windowHeight)

    osc1 = new p5.Oscillator('sawtooth')
    osc1.start()
    osc1.freq(frequency)
    osc2 = new p5.Oscillator('triangle')
    osc2.freq(frequency*1.5)
    osc2.start()

    // reverb: disconnect the oscillators from the speakers first,
    // so we only hear them through the reverb (not dry + reverb twice)
    reverb = new p5.Reverb()
    osc1.disconnect()
    osc2.disconnect()
    reverb.process(osc1, 3, 2)  // 3 second tail, decay rate 2
    reverb.process(osc2, 3, 2)
}

function draw(){

    let note = floor(map(mouseX, 0,width, 0, cMajor.length))
    text(note, 20,40)

    frequency = cMajor[note]


    background(200)
    if(onOff == 0){
        text('stopped', 20,20)
       
        osc1.amp(0,0.4)
        osc2.amp(0,0.4)
    }
    else{
        text('playing', 20,20)
        
        osc1.amp(0.05,0.4)
        osc2.amp(0.5,0.4)
    }

    let offset = map(mouseX, 0,width, -15,15)

    osc1.freq(frequency)
    osc2.freq(2*frequency)

    // mouseY controls how much reverb: top = dry, bottom = fully wet
    let wet = map(mouseY, 0, height, 0, 1, true)
    // reverb.drywet(wet)
    // text('reverb: ' + nf(wet, 1, 2), 20, 60)

   
}

let onOff = 0 


function mousePressed(){
    if(onOff == 0){
       
        onOff = 1
    }
    else{
        onOff = 0
    }       
}

