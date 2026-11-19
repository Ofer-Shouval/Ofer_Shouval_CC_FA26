let sound1,sound2

function preload(){
//    sound1 = loadSound('ping.mp3')
   sound1 = loadSound('microphones_in_2020_clip.mp3')

}
function setup(){
    createCanvas(windowWidth, windowHeight)
}

function draw(){
    background(200)
    if(onOff == 0){
        text('stopped', 20,20)
    }
    else{
        
        text('playing', 20,20)
    }
}

let onOff = 0 


function mousePressed(){

    if(onOff == 0){
        sound1.loop()
        onOff = 1
    }
    else{
        sound1.stop()
        onOff = 0
    }
         
    


    

}