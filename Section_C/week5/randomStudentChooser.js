

let students = ['Yanyu Geng','Hanyu Jia','Nora Shen','Maggie Song','Taylor Urbshott']
let font 
let student = ''
let opacity = 0

async function setup(){

    createCanvas(windowWidth, windowHeight)
    font = await
    loadFont('ARCADE_N.TTF')
    textFont(font)
    textSize(36)
    textAlign(CENTER)
}

function draw()
{
    background(255)
    fill(opacity)
    text(student, width/2, height/2)
    opacity = opacity * 0.99

}



function mousePressed(){

    //background(0)
    fill(255)

    let index = floor(random(students.length))
    student = students[index]

    students.splice(index,1)
    print(students)

    opacity = 255

}