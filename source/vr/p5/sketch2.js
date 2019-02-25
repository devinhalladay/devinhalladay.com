var flick;
var flick2;
var flick3;
var flick4;
var flick5;

var x;
var y;
var s;

function preload() {
    image = loadImage('1.jpg');
}

function setup() {
    // createCanvas(windowWidth, windowHeight, WEBGL);
    createStereoCanvas(WEBGL,50);
    orientationLock();

    if(deviceOrientation == 'portrait'){
        alert('please rotate your phone!')
      }

//    canvas.parent('cnv');

    x = 17;
    y = -341;
    s = .6;
}

function draw() {
  VRorbitControl();

    ambientLight(255, 255, 255);
    background(255);

//    native size of opposing panels is 2276 x 1639
//    native size of front wall is 2264 x 1639

    push();
    rotateX(radians(x));
    rotateY(radians(y));
    scale(s);
        push();
            translate(-1138, 0, 0);
            rotateY(radians(90));
        //    then wall
            texture(image);
            plane(2276, 1639);
        pop();
        push();
            translate(-1139, 0, 0);
            rotateY(radians(90));
        //    then wall cover
            texture(image);
            plane(2276, 1639);
        pop();
        push();
            translate(0, 0, -1138);
        //    aggregate wall
            texture(image);
            plane(2276, 1639);
        pop();
        push();
            translate(0, 0, -1139);
        //    aggregate wall cover
            texture(image);
            plane(2276, 1639);
        pop();
        push();
            translate(1138, 0, 0);
            rotateY(radians(-90));
        //    now wall
            texture(image);
            plane(2276, 1639);
        pop();
        push();
            translate(1139, 0, 0);
            rotateY(radians(90));
        //    now wall cover
            texture(image);
            plane(2276, 1639);
        pop();
        push();
            translate(0, 0, 1138);
            rotateY(radians(180));
        //    quote wall
            texture(image);
            plane(2276, 1639);
        pop();
        push();
            translate(0, 0, 1140);
            rotateY(radians(0));
        //    title wall
            texture(image);
            plane(2276, 1639);
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
        push();
            translate(0, 0, 0);
            rotateX(radians(90));
        //    floor
            texture(image);
            plane(2276, 2276);
        pop();
    pop();

    updateStereo();

}
