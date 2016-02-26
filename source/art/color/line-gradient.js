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




var res = 5;
var wres = 20;

var drawLines = function(){
  var num = height/res;
  var wnum = width/wres;

  for(var i=0; i<num/2; i++){
    //render lineval
    for(var j=0; j<wnum; j++){
      line(j*wres,height/2+lineval[j],(j+1)*wres,height/2+lineval[j+1]);
      stroke(255*pow(map(i,0,num,1,0),1.5));
      strokeWeight(2);
      line(j*wres,height/2-lineval[j],(j+1)*wres,height/2-lineval[j+1]);
      stroke(255*pow(map(i,0,num,1,0),1.5));
      strokeWeight(2);
    }


    //update lineval
    for(var j=0; j<wnum+1; j++){
      lineval[j]+=(res);
      if(Math.random()<0.5){
        lineval[j]+=(0.20*res*noise(res*i,wres*j))
      }
    }

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

