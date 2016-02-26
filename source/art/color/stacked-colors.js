//touch interaction var
var m = {x:0, y:0};
var c1,c2;

justpressed = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    grow = windowHeight;
    background(0);
    colorMode(HSB,360,100,100);
    c1 = color(random(360),0,100);
    c2 = color(random(360),0,0);

    //disable default touch events for mobile
    var el = document.getElementsByTagName("canvas")[0];
    el.addEventListener("touchstart", pdefault, false);
    el.addEventListener("touchend", pdefault, false);
    el.addEventListener("touchcancel", pdefault, false);
    el.addEventListener("touchleave", pdefault, false);
    el.addEventListener("touchmove", pdefault, false);

    lineval = fillArray(0,width/wres);

    drawLines();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function pdefault(e){
    e.preventDefault()
}

function draw() {
    update();
    render();
    if(frameCount%500==0){
    drawLines();
    }
}


function update(){
    //normalize interaction
    m.x = max(touchX, mouseX);
    m.y = max(touchY, mouseY);
    m.pressed = mouseIsPressed || touchIsDown;

    if(m.pressed){
      justpressed = true;
    }

    if(!m.pressed && justpressed){
        drawLines();
        justpressed = false;
    }

}

function render(){


}




var res = 10;
var wres =30;

var drawLines = function(){

    var num = Math.ceil(height/res);
    var wnum = Math.ceil(width/wres);
    var c;

    for(var i=0; i<num; i++){

        // fill(130+random(50),100,100);
        c = random()<0.5 ? c1 : c2;
        stroke(c);
        fill(c);
        beginShape();

        for(var j=0; j<=wnum; j++){
            vertex(j*wres,lineval[j]);
        }


        for(var j=0; j<=wnum; j++){
            lineval[j]+=res;
            if(Math.random()<0.4){
                lineval[j]+=(0.5*res*noise(res*i,wres*j))

            }
        }

        for(var j=wnum+1; j>0; j--){
            vertex(j*wres,lineval[j]);
        }

        vertex(0,lineval[0]);
        endShape(CLOSE);
    }

    lineval = fillArray(0,width/wres);
    c1 = color(random(360),100,100);
    c2 = color(random(360),100,70);
}


function fillArray(value, len) {
    var arr = [];
    for (var i = 0; i < len; i++) {
        arr.push(value);
    }
    //for bounds
    arr.push(value);
    return arr;
}

