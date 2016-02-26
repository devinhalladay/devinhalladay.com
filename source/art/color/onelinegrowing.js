//touch interaction var
var m = {x:0, y:0};


function setup() {
  createCanvas(windowWidth, windowHeight);
  grow = windowHeight;
  background(0);
  colorMode(HSB,255,100,100);


  //disable default touch events for mobile
  var el = document.getElementsByTagName("canvas")[0];
  el.addEventListener("touchstart", pdefault, false);
  el.addEventListener("touchend", pdefault, false);
  el.addEventListener("touchcancel", pdefault, false);
  el.addEventListener("touchleave", pdefault, false);
  el.addEventListener("touchmove", pdefault, false);

 lineval = fillArray(0,width/wres);
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
}

function update(){
  //normalize interaction
  m.x = max(touchX, mouseX);
  m.y = max(touchY, mouseY);
  m.pressed = mouseIsPressed || touchIsDown;


 drawLine();

}

function render(){

}




var res = 5;
var wres =5;




function fillArray(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  //for bounds
  arr.push(value);
  return arr;
}

var drawLines = function(){
  var num = Math.ceil(height/res);
  var wnum = Math.ceil(width/wres);

  for(var i=0; i<num; i++){
    noStroke();

  fill(130+random(50),100,100);
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
}
