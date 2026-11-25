let sound1, sound2, reverb

// both pairs of sounds, so we can switch between them
let ping1, ping2, mic1, mic2
let usingPing = true   // press 's' to switch

function preload(){
   ping1 = loadSound('ping.mp3')
   ping2 = loadSound('ping.mp3')

   mic1 = loadSound('microphones_in_2020_clip.mp3')
   mic2 = loadSound('microphones_in_2020_clip.mp3')

   // start with ping
   sound1 = ping1
   sound2 = ping2
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

    if(usingPing){
        text('sound: ping (press s to switch)', 20,40)
    }
    else{
        text('sound: microphones clip (press s to switch)', 20,40)
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

function keyPressed(){
    if(key == 's'){
        // stop the old pair
        sound1.stop()
        sound2.stop()

        // point sound1 and sound2 at the other pair
        if(usingPing){
            sound1 = mic1
            sound2 = mic2
            usingPing = false
        }
        else{
            sound1 = ping1
            sound2 = ping2
            usingPing = true
        }

        // if we were playing, keep playing with the new sound
        if(onOff == 1){
            sound1.loop()
            sound2.loop()
        }
    }
}