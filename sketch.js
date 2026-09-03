
let y = 0;
function setup(){
    createCanvas(400,400)
}
function draw(){
    background(0);
    rect(width/2,y,50,50);
    y++;
    print(y)
}