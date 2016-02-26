//touch interaction var
var m = {x:0, y:0};


function setup() {
  createCanvas(windowWidth, windowHeight);
  grow = windowHeight;
  background(0);


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
}

function update(){
  //normalize interaction
  m.x = max(touchX, mouseX);
  m.y = max(touchY, mouseY);
  m.pressed = mouseIsPressed || touchIsDown;



}

function render(){

}




var res = 20;
var wres = 30;

var drawLines = function(){
  var num = height/res;
  var wnum = width/wres;

  for(var i=0; i<num; i++){
    //render lineval
    beginShape();

    for(var j=0; j<wnum; j++){
      vertex(j*wres,lineval[j]);
      vertex((j+1)*wres,lineval[j]);
    }


    for(var j=0; j<wnum+1; j++){
      lineval[j]+=(res);
         if(Math.random()<0.5){
         lineval[j]+=(res*noise(res*i,wres*j))
         }
    }

    for(var j=wnum; j>0; j--){
      vertex(j*wres,lineval[j]);
      vertex((j-1)*wres,lineval[j-1]);
    }

    vertex(j*wres,i*res);

    endShape(CLOSE);

  }
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

