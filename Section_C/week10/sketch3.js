let osc1, osc2, amp1, amp2, frequency = 440


function setup(){
    createCanvas(windowWidth, windowHeight)

    osc1 = new p5.Oscillator()
    osc1.start()
    osc1.freq(frequency)
    osc2 = new p5.Oscillator()
    osc2.freq(frequency*1.5)

    osc2.start()
    

}

function draw(){

    background(200)
    if(onOff == 0){
        text('stopped', 20,20)
       
        osc1.amp(0,0.4)
        osc2.amp(0,0.4)
    }
    else{
        text('playing', 20,20)
        
        osc1.amp(0.5,0.4)
        osc2.amp(0.5,0.4)
    }

    let offset = map(mouseX, 0,width, -15,15)

    osc1.freq(frequency)
    osc2.freq(2*frequency+offset)

   
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

