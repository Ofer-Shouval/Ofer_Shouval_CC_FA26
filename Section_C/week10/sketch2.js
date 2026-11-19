let sound1, sound2, reverb

function preload(){
   sound1 = loadSound('ping.mp3')
   sound2 = loadSound('ping.mp3')
   
  // sound1 = loadSound('microphones_in_2020_clip.mp3')

}
function setup(){
    createCanvas(windowWidth, windowHeight)

        // reverb = new Reverb(3)

        // sound1.disconnect()
        // sound2.disconnect()

        // sound1.connect(reverb)
        // sound2.connect(reverb)

}

function draw(){
    background(200)
    if(onOff == 0){
        text('stopped', 20,20)
    }
    else{
        text('playing', 20,20)
    }

    let rate1 = map(mouseX, 0,width, -3,3)
    let rate2 = map(mouseY, 0,height, -3,3)
    sound1.rate(rate1)
    sound2.rate(rate2)


}

let onOff = 0 


function mousePressed(){

    if(onOff == 0){
        sound1.loop()
        sound2.loop()
        onOff = 1
    }
    else{
        sound1.stop()
        sound2.stop()
        

        onOff = 0
    }
         
    


    

}