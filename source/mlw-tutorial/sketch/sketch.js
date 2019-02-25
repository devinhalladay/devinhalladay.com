var words = ["p", "five", "is", "awesome"]; // A list of words
var counter = 0; // A counter for the words
var myVoice = new p5.Speech(); // Instantiate p5.Speech

function setup() {
  // The Basics
  createCanvas(500, 500);
  background('#171C20');
  colorMode(HSB); // Better color ranges
}

function draw() {
  // Nothing here yet
}

function mousePressed() {
  fill(random(360), 255, 255); // Random color
  ellipse(mouseX, mouseY, 40); // Draw an ellipse
  myVoice.speak(words[counter]);
  counter = (counter + 1) % words.length;
}
