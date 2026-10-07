

let students = ['Tanvi','Lawrence','Skyla','Skyler','Yuxian','Heesoo','Yuqi','Bella','Loura','Tooba','Emma','Joy','Sherin','Jerry','Jenny','Qinyuan']   
let font 
let student = ''
let col = 0

async function setup(){
    createCanvas(windowWidth, windowHeight)
    font = await
    loadFont('ARCADE_N.TTF')

    textFont(font)
    textSize(36)
    textAlign(CENTER)

}

function draw(){
    background(0)

    fill(255 - col)
    // text("test", width/2, height/2)
    text(student, width/2, height/2)

    // col = col*0.99
      col *= 0.99

}

function mousePressed(){

    let length = students.length
    let i = floor(random(length))

    if(students.length > 0){
        student = students[i]
        students.splice(i,1)
    }
    else{
        textSize(16)
        student = "Holy Shit\nI've called on everyone"
    }

    col = 255
     print(student)

}