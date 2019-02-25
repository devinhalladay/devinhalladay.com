var flick;
var flick2;
var flick3;
var flick4;
var flick5;

var x;
var y;
var s;

function preload() {
    image = loadImage('1.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
//    canvas.parent('cnv');

    x = 17;
    y = -341;
    s = .6;
}

function draw() {
    ambientLight(255, 255, 255);
    background(255);

    push();
    rotateX(radians(x));
    rotateY(radians(y));
    scale(s);
        push();
            translate(-1138, 0, 0);
            rotateY(radians(90));
        //    then wall
            texture(image);
            plane(2276, 2276);
        pop();
        push();
            translate(-1139, 0, 0);
            rotateY(radians(90));
        //    then wall cover
            texture(image);
            plane(2276, 2276);
        pop();
        push();
            translate(0, 0, -1138);
        //    aggregate wall
            texture(image);
            plane(2276, 2276);
        pop();
        push();
            translate(0, 0, -1139);
        //    aggregate wall cover
            texture(image);
            plane(2276, 2276);
        pop();
        push();
            translate(1138, 0, 0);
            rotateY(radians(-90));
        //    now wall
            texture(image);
            plane(2276, 2276);
        pop();
        push();
            translate(1139, 0, 0);
            rotateY(radians(90));
        //    now wall cover
            texture(image);
            plane(2276, 2276);
        pop();
        push();
            translate(0, 0, 1138);
            rotateY(radians(180));
        //    quote wall
            texture(image);
            plane(2276, 2276);
        pop();
        push();
            translate(0, 0, 1140);
            rotateY(radians(0));
        //    title wall
            texture(image);
            plane(2276, 2276);
        pop();
        push();
            translate(0, 819.5, 0);
            rotateX(radians(90));
        //    floor
            texture(image);
            plane(2276, 2276);
        pop();
        push();
            translate(0, -819.5, 0);
            rotateX(radians(90));
        //    floor
            texture(image);
            plane(2276, 2276);
        pop();
    pop();

    // controls();

    if (mouseX < width/2) {
      y -= 1;
    } else {
      y += 1;
    }

    if (mouseY < height/2) {
      x -= 1;
    } else {
      x += 1;
    }
}

function controls() {
    if (keyIsDown(LEFT_ARROW)) {
        y -= 1;
    } else if (keyIsDown(RIGHT_ARROW)) {
        y += 1;
    } else if (keyIsDown(DOWN_ARROW)) {
        x += 1;
    } else if (keyIsDown(UP_ARROW)) {
        x-= 1;
    }
}

function keyPressed() {
    if (keyCode === 73) {
        s = .6;
    } else if (keyCode === 79) {
        s = .15
    }

    return false;
}
