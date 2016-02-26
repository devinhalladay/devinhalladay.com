//touch interaction var
var m = {x:0, y:0};
var c1,c2;
var frameInteraction = 0;
var bars = [];
var noises = [];
var base_note;
var masterVolume = 0.4;

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

    var num = Math.ceil(height/res);

    for(var i =0; i<num; i++){
      bars.push(new Bar({index:i}));
    }

    drawLines();
    initSynth();



    el.addEventListener('touchend',intro);
    el.addEventListener('mouseup',intro);

}

var intro = function(){
    var i = document.getElementById('info');
    this.removeEventListener('touchend',intro);
    this.removeEventListener('mouseup',intro);
    var b = document.getElementsByTagName('body')[0]
    b.removeChild(i);

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
    var timeSinceInteraction = frameCount-frameInteraction;
    if((timeSinceInteraction)%500==0 && timeSinceInteraction > 0){
   //   drawLines();
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
        //touchsound

        var minP = 40;
        var maxP = 70;
        base_note = map(m.y,height,0,minP,maxP);
        var vol = map(base_note,minP,maxP,0.95,0);
        setVolume(vol*40);


        console.log(base_note + "," + masterVolume);

        noises.forEach(function(n){
            n.setBaseNote(base_note);
        });
        drawLines();
        justpressed = false;
        frameInteraction = frameCount;
    }


   //motion for bars
   for(var i=0; i<points.length; i++){
       points[i].forEach(function(v,k){
         points[i][k]+=(0.1*sin(k+frameCount*Math.PI/180));
         points[i][k]+=(0.3*sin(i+frameCount*Math.PI/180));
       });
   }
}

function render(){
  bars.forEach(function(bar){
    bar.update();
    bar.render();
  });

}




var res = 10;
var wres =30;

function Bar(args){
    this.index = args.index;
    this.c;

    this.update = function(){
    }

    this.render = function(){
      this.c = colorIndex[this.index];
      stroke(this.c);
      fill(this.c);
      beginShape();

      var row = points[this.index];;
      for(var j=0; j<=row.length; j++){
        vertex(j*wres,row[j]);
      }

      var row2 = points[this.index+1];
      for(var j=row2.length+1; j>0; j--){
        vertex(j*wres,row2[j]);
      }
      vertex(0,row2[0]);
      endShape(CLOSE);
    }
}

var points;
var colorIndex;
var drawLines = function() {
  var num = Math.ceil(height/res);
  var wnum = Math.ceil(width/wres);
  var c;
  points = [];
  colorIndex = [];

    for(var i=0; i<num; i++){
        points.push(lineval.slice(0));
        c = random()<0.5 ? c1 : c2;
        colorIndex.push(c);

        for(var j=0; j<=wnum; j++){
            lineval[j]+=res;
            if(Math.random()<0.4){
                lineval[j]+=(0.5*res*noise(res*i,wres*j))
            }
        }
    }
    points.push(lineval.slice(0));

    //reset
    lineval = fillArray(0,width/wres);
    c1 = color(random(150,450)%360,100,100);
    c2 = color(random(360),60,100);


  // base_notes = [45,47,48,50,52,54,55,57,59,60,62]
 //  base_note = base_notes[floor(random(base_notes.length))];

/*
    var n1 = Math.floor(base_note+random(4));
    var n2 = Math.floor(base_note-random(4));
    console.log(n1);
    base_note = random()>0.5 ? n1:n2;
*/


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



function initSynth(){
  try{
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();

    var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
    if (iOS) {
      window.addEventListener('touchend', function() {
        var buffer = context.createBuffer(1, 1, 22050);
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(0);
      }, false);
    }

  }
  catch (err){
    alert('web audio not supported');
  }

  if(typeof(context)!="undefined"){
    startSynth();
  }
}


function Noise(args){
  this.note= args.base_note + args.offset;
  this.offset = args.offset;
  this.whiteNoise;
  this.filter;
  this.volume = args.volume;
  this.init = function(){
    var bufferSize = 4096; //Math.pow(2,13); //between 8 & 14
    //make this a global var so it isnt garbage collected
    this.whiteNoise = context.createScriptProcessor(bufferSize, 0, 2);
    this.whiteNoise.onaudioprocess = function(e) {
      var outputBuffer = e.outputBuffer;
      for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
        var outputData = outputBuffer.getChannelData(channel);
        for (var i = 0; i < bufferSize; i++) {
          outputData[i] = Math.random()*2-1;
        }
      }
    }


    this.filter= context.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.value = mtof(this.note);
    this.filter.Q.value= 30;


    this.gain = context.createGain();
    this.gain.connect(masterGain);
    this.gain.gain.value = this.volume;

    var that = this;
    this.o = random(100);
    this.p = random(2);
    this.t = frameCount+200;
    this.lfo = setInterval(function(){
      that.filter.Q.value = 30*(cos((that.p*0.7)*(that.o+ (frameCount-that.t)*Math.PI/180))+1)/2
      that.gain.gain.value = 0.01*(cos(0.3*(that.o+(frameCount-that.t)*Math.PI/180)))
     },50);



    this.whiteNoise.connect(this.filter);
    this.filter.connect(this.gain);

    var convolver = context.createConvolver();

  }

 this.setBaseNote = function(bn){
    this.note = bn + this.offset;
    this.filter.frequency.value = mtof(this.note);


  }

  this.init();


}

var setVolume = function(val){
  masterVolume = val;
  masterGain.gain.value = val;
}

function mtof(m) {
  return Math.pow(2, (m - 69) / 12) * 440;
}

var startSynth = function(){
  base_note = 60;

  masterGain = context.createGain();
  masterGain.connect(context.destination);
  masterGain.gain.value = masterVolume;

  noises.push(new Noise({base_note:base_note/2, offset:0, volume: 0.5}));
  noises.push(new Noise({base_note:base_note, offset:0, volume: 0.6}));
  noises.push(new Noise({base_note:base_note,  offset:12, volume: 0.05}));


  noises.push(new Noise({base_note:base_note, offset:4, volume: 0.4}));

  noises.push(new Noise({base_note:base_note,  offset:16, volume: 0.3}));
  noises.push(new Noise({base_note:base_note,  offset:28, volume: 0.02}));


  noises.push(new Noise({base_note:base_note/2, offset:7, volume: 0.2}));
  noises.push(new Noise({base_note:base_note,  offset:7, volume: 0.2}));


}

