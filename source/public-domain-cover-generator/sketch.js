var book_number = 0;

// Font Variables
var aileronThin;
var aileronLight;
var aileronSemiBold;

// Show all graphics initially
var showElements = true;
var showElementsCheckbox;

// Book Text Attribute Variables
var bookTitle;
var bookSubtitle;
var bookByLine;
var bookAuthor;
var pageCount;
var sectionCount;
var bookAbstract;

// Constants for setGradient() function
var Y_AXIS = 1;
var X_AXIS = 2;

// GradientBox Arrays
var thinGradientBoxes = [];
var thickGradientBoxes = [];

// Images
var radialGradientImage;
var lineBoxImage;
var logo;
var spacesImage;
var practicesImage;
var systemsImage;
var dialoguesImage;

// Constants
// These are either things that never change or things that rarely change.
var TOP_MARGIN = 36;
var LEFT_MARGIN = 36;
var RIGHT_MARGIN = 36;
var RIGHT_PAGE_INSET = 36 + 612 + 50;
var BOTTOM_MARGIN = 36;
var PAGE_WIDTH = 612;
var MARGIN = 36;
var PRIMARY_COLOR;
var CATEGORY_IMAGE;

// Book data
var bookData;

// Selector UI
var selector;

function preload() {
  // Preload fonts
  aileronThin = loadFont('/public-domain-cover-generator/assets/fonts/Aileron-Thin.otf');
  aileronLight = loadFont('/public-domain-cover-generator/assets/fonts/Aileron-Light.otf');
  aileronSemiBold = loadFont('/public-domain-cover-generator/assets/fonts/Aileron-SemiBold.otf');

  // Load misc. images
  radialGradientImage = loadImage('/public-domain-cover-generator/assets/img/dot_blur.png');
  lineBoxImage = loadImage('/public-domain-cover-generator/assets/img/line-box.png');
  logo = loadImage('/public-domain-cover-generator/assets/img/logo.svg');

  // Load category images
  spacesImage = loadImage('/public-domain-cover-generator/assets/img/spaces.svg');
  dialoguesImage = loadImage('/public-domain-cover-generator/assets/img/dialogues.svg');
  practicesImage = loadImage('/public-domain-cover-generator/assets/img/practices.svg');
  systemsImage = loadImage('/public-domain-cover-generator/assets/img/systems.svg');

  // Load data!
  bookData = loadJSON('/public-domain-cover-generator/data.json');
}

function setup() {
  createCanvas(1274, 792);
  noLoop();
  noStroke();

  // Create sidebar UI
  var sidebarContainer = createDiv();
  sidebarContainer.class('sidebar-container');
  sidebarContainer.parent('sidebar');

  // Create info div as child of .sidebar-container
  var infoDiv = createDiv();
  infoDiv.class('info');
  infoDiv.parent(sidebarContainer);

  // Create Sidebar header as child of .info
  var sidebarH1 = createElement('h1', 'Public Domain Book Cover Generator');
  sidebarH1.parent(infoDiv);

  // Create sidebar intro paragraph as child of .info
  var sidebarAboutP = createP('Welcome to the Public Domain book cover generator! This application uses P5.js to generate data-driven book covers for books and essays published under the purview of Public Domain.');
  sidebarAboutP.parent(infoDiv);

  // Create sidebar tip pane as child of .info
  var sidebarTipP = createP('Tip: Use the checkbox to the right to toggle the visiblity of icons  and text!');
  sidebarTipP.class('tip');
  sidebarTipP.parent(infoDiv);

  // Create functions div as child of sidebar
  var functionDiv = createDiv();
  functionDiv.class('functions');
  functionDiv.parent(sidebarContainer);

  // Create selector as child of functions div
  selector = createSelect();
  selector.id('selector')
  selector.parent(functionDiv)
  // Add changed event for dropdown
  selector.changed(selectorEvent);

  // Create save button
  var button = createButton('Save Image');
  button.class('button--green');
  button.parent(functionDiv);
  button.mousePressed(saveImage);

  // Create regenerate button
  var regenButton = createButton('Regenerate');
  regenButton.parent(functionDiv);
  regenButton.id('regen-button');
  // Attach click handler
  regenButton.mousePressed(regenerate);

  // Create checkbox to show/hide graphics
  showElementsCheckbox = createCheckbox('Show Type and Graphics', true);
  showElementsCheckbox.changed(toggleElements);
  showElementsCheckbox.parent(functionDiv);

  // Add options to dropdown
  let dropdown = $('#selector');
  dropdown.empty();
  dropdown.append('<option selected="true" disabled>Choose Book Cover</option>');
  dropdown.prop('selectedIndex', 0);

  const url = '/public-domain-cover-generator/data.json';

  // Populate dropdown with list of books
  $.getJSON(url, function (data) { // Get JSON
    $.each(data, function (key, book) { // For each object
      dropdown.append($('<option></option>').attr('value', key).text(`[${book.category}] ` + book.title)); // Append the dropdown option
    })
  });

  // Set initial values for book attributes
  pageCount = bookData[book_number].page_count;
  sectionCount = bookData[book_number].section_count;

  // If section count exists and is > 6, use section count to determine amount of boxes
  if (sectionCount && sectionCount > 6) {
    if (sectionCount > 6) {
      for (var i = 0; i < sectionCount; i++) {
        thinGradientBoxes[i] = new GradientBox(40, 10);
      }

      for (var i = 0; i < sectionCount; i++) {
        thickGradientBoxes[i] = new GradientBox(random(600), 40);
      }
    }
  } else {
    // Else, use the page count.
    for (var i = 0; i < pageCount/6; i++) {
      thinGradientBoxes[i] = new GradientBox(40, 10);
    }

    for (var i = 0; i < pageCount/8; i++) {
      thickGradientBoxes[i] = new GradientBox(random(600), 40);
    }
  }
}

function draw() {
  // Set variables for JSON calls so I only make the call once. More performant!
  bookTitle = bookData[book_number].title;
  bookAuthor = bookData[book_number].author_fname.toUpperCase() + ' ' + bookData[book_number].author_lname.toUpperCase();
  bookSubtitle = bookData[book_number].subtitle;
  bookCategory = bookData[book_number].category;
  bookAbstract = bookData[book_number].abstract;
  bookByLine = bookData[book_number].byline;

  // Set primary color and category image constants based on bookCategory
  switch (bookCategory) {
    case 'Systems':
      PRIMARY_COLOR = color('#2FAD64');
      CATEGORY_IMAGE = 'systemsImage';
      break;
    case 'Practices':
      PRIMARY_COLOR = color('#3483EA');
      CATEGORY_IMAGE = practicesImage;
      break;
    case 'Spaces':
      PRIMARY_COLOR = color('#ED3350');
      CATEGORY_IMAGE = spacesImage;
      break;
    case 'Dialogues':
      PRIMARY_COLOR = color('#2BCED4');
      CATEGORY_IMAGE = dialoguesImage;
      break;
  }

  // If subtitle exists, make it all uppercase
  if (bookSubtitle) {
    bookSubtitle = bookSubtitle.toUpperCase();
  } else {
    // Otherwise, make it a blank string. Required to make the layout math work.
    bookSubtitle = '';
  }

  // If byline exists, make it all uppercase
  if (bookByLine) {
    bookByLine = bookByLine.toUpperCase();
  } else {
    // Otherwise, make it a blank string. Required to make the layout math work.
    bookByLine = '';
  }

  // Set background
  background(PRIMARY_COLOR);

  // Draw outlined boxes and tenprint backgrounds
  switch (bookCategory) {
    case 'Systems':
      drawOutlinedBoxes(Math.ceil(pageCount/6));
      for (var i = 0; i < thinGradientBoxes.length; i++) {
        thinGradientBoxes[i].display();
      }
      // Draw straight tenprint for this category
      drawStraightTenprint();
      break;

    case 'Practices':
      drawOutlinedBoxes(Math.ceil(pageCount/10));
      for (var i = 0; i < thickGradientBoxes.length; i++) {
        thickGradientBoxes[i].display();
      }
      // Draw curved tenprint for this category
      drawCurvedTenprint();
      break;

    case 'Spaces':
      drawOutlinedBoxes(Math.ceil(pageCount/6));
      for (var i = 0; i < thinGradientBoxes.length; i++) {
        thinGradientBoxes[i].display();
      }
      // Draw straight tenprint for this category
      drawStraightTenprint();
      break;

    case 'Dialogues':
      drawOutlinedBoxes(Math.ceil(pageCount/10));
      for (var i = 0; i < thickGradientBoxes.length; i++) {
        thickGradientBoxes[i].display();
      }
      // Draw curved tenprint for this category
      drawCurvedTenprint();
      break;
  }

  // TODO: Make this work in in p5.svg?
  // drawRadialGradient(150, 150, 100, PRIMARY_COLOR, "white");

  // If showElements == true, draw images and type.
  if (showElements) {
    // Title
    push();
    noStroke();
    fill(255);
    textSize(76);
    textLeading(76);
    textFont(aileronThin);
    textAlign(LEFT, TOP);
    var titleAscent = textAscent();
    var titleDescent = textDescent();
    // Get the height of a line of text by adding ascender height to descender height.
    var lineHeight = titleAscent + titleDescent;
    var titleHeight = 1;
    // Attempt to get width of a single line of text from the Canvas
    var titleWidth = drawingContext.measureText(bookTitle).width;
    // If the width is greater than the available space, set titleHeight to 2 because we know the text will overflow its container and break to a new line! Clever math.
    if (titleWidth > (width - RIGHT_PAGE_INSET)) {
      titleHeight = 2;
    }
    var titleY = MARGIN;
    var titleText = text(bookTitle, RIGHT_PAGE_INSET, titleY, width - RIGHT_PAGE_INSET); // Text wraps within text box
    pop();

    // IF subtitle exists, draw it!
    if (bookSubtitle) {
      push();
      noStroke();
      fill(255);
      textSize(15.5);
      textLeading(20);
      // Conditional font based on whether byline exists
      if (!bookByLine) {
        textFont(aileronSemiBold);
      }
      textAlign(LEFT, TOP);
      var subtitleAscent = textAscent();
      var subtitleDescent = textDescent();
      var subtitleHeight = 1;
      // Doing the same math that we do for the title. Measure width, and bump up height variable if width > available space
      var subtitleWidth = drawingContext.measureText(bookSubtitle).width;
      if (subtitleWidth > 300) {
        subtitleHeight = 2;
      }
      var subtitleY = (titleY) + (titleAscent + titleDescent) * titleHeight;
      text(bookSubtitle, RIGHT_PAGE_INSET, subtitleY, 300)
      pop();
    }

    // Draw byline if it exists
    if (bookByLine) {
      // Byline
      push();
      noStroke();
      fill(255);
      textSize(15.5);
      textLeading(20);
      textAlign(LEFT, TOP);
      textFont(aileronSemiBold);
      // Do some math to calculate Y coordinate based on the subtitle y coodinate and the title height
      var bylineY = (subtitleY + 20) + (subtitleAscent + subtitleDescent) * subtitleHeight;
      text(bookByLine, RIGHT_PAGE_INSET, bylineY, width - 30)
      pop();
    }

    // Draw author title
    push();
    noStroke();
    fill(255);
    textSize(18);
    textLeading(20);
    textAlign(LEFT, BOTTOM);
    textFont(aileronSemiBold);
    text(bookAuthor, RIGHT_PAGE_INSET, height - MARGIN, width - 30)
    pop();

    // Get random size for gradient circle
    var randomLogoSize = random(100, 400);

    // Make sure to (almost always) draw the radial gradient image  below the text
    if (bookSubtitle && bookByLine) {
      var radialGradientImageY = random(bylineY, height - 300);
    } else if (bookSubtitle) {
      var radialGradientImageY = random(subtitleY, height - 300);
    } else {
      var radialGradientImageY = random(titleY, height - 300);
    }

    // Draw radial gradient image
    image(radialGradientImage, random(RIGHT_PAGE_INSET, width - 150), radialGradientImageY, randomLogoSize, randomLogoSize);

    // Draw the logo on the front cover
    logo.resize(60, 0);
    image(logo, width-(MARGIN*2)-logo.width/2, height-MARGIN*2.2);

    // Draw the barcode
    var barcodeCanvas = document.getElementById('barcode');
    JsBarcode(barcodeCanvas, bookData[book_number]['isbn'], {
      background: 'transparent',
      lineColor: '#ffffff',
      fontSize: 18,
      font: "Arial",
      height: 30,
      width: 1
    });
    // Draw it using Canvas to get it onto the P5 canvas
    drawingContext.drawImage(barcodeCanvas, MARGIN, height-MARGIN*2);

    stroke(255);

    push();
    stroke(0)
    line(PAGE_WIDTH, 0, PAGE_WIDTH, height);
    push();
    strokeWeight(2);
    stroke(255);
    // Draw category icons on back cover
    switch (bookCategory) {
      case 'Systems':
        drawSystemsIcon(PAGE_WIDTH+25, MARGIN*1.5, .5);
        break;
      case 'Practices':
        drawPracticesIcon(PAGE_WIDTH+10, MARGIN*1.5, .5);
        break;
      case 'Spaces':
        drawSpacesIcon(PAGE_WIDTH+10, MARGIN*1.3, .5)
        break;
      case 'Dialogues':
        drawDialoguesIcon(PAGE_WIDTH+10, MARGIN*1.4, .5);
        break;
    }
    pop();
    push();
    translate(width/2, MARGIN*4);
    rotate(PI/2);
    noStroke();
    fill(255);
    textSize(18);
    textFont(aileronSemiBold);
    // Draw category text on back cover
    textAlign(LEFT, CENTER);
    text(bookTitle, -20, -2);
    pop();
    line(PAGE_WIDTH+50, 0, PAGE_WIDTH+50, height);
    pop();

    // Draw category icon on the spine
    push();
    strokeWeight(2);
    switch (bookCategory) {
      case 'Systems':
        drawSystemsIcon(MARGIN+20, MARGIN*1.8, .6);
        break;
      case 'Practices':
        drawPracticesIcon(MARGIN, MARGIN+10, .6);
        break;
      case 'Spaces':
        drawSpacesIcon(MARGIN, MARGIN*1.3, .6)
        break;
      case 'Dialogues':
        drawDialoguesIcon(MARGIN, MARGIN*1.4, .7);
        break;
    }
    pop();

    // Add logo to back cover
    image(logo, PAGE_WIDTH-MARGIN-logo.width, MARGIN);

    push();
    noStroke();
    fill(255);
    textSize(22);
    textFont(aileronSemiBold);
    // Draw book category text on spine
    text(bookCategory, MARGIN+50, MARGIN*2, (PAGE_WIDTH)-MARGIN*2);
    pop();

    // If abstract exists, draw it!
    if (bookAbstract) {
      push();
      strokeWeight(3);
      line(MARGIN, MARGIN*3, PAGE_WIDTH-MARGIN, MARGIN*3);
      pop();

      push();
      noStroke();
      fill(255);
      textSize(18);
      textLeading(28);
      textAlign(LEFT, TOP);
      textFont(aileronLight);
      text(bookAbstract, MARGIN, MARGIN*4, (PAGE_WIDTH)-MARGIN*2)
      pop();
    }
  }
}

// Create a box with a gradient in it
function GradientBox(boxHeight, boxWidth) {
  // Generate random x, y coordinates every time we call this function.
  this.randomX = random(RIGHT_PAGE_INSET, width);
  this.randomY = random(boxHeight, height - boxHeight);
  this.display = function() {
    push();
    // Rotate randomly for dynamic layout
    translate(this.randomX, this.randomY);
    rotate(random(360));
    // Draw gradient
    setGradient(0, 0, boxHeight, boxWidth, PRIMARY_COLOR, color(255, 255, 255), X_AXIS);
    pop();
  }
}

// Function to draw a gradient, taken from P5 documentation examples
function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  if (axis == Y_AXIS) { // Top to bottom gradient
    for (var i = y; i <= y + h; i++) {
      var inter = map(i, y, y + h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      strokeCap(SQUARE);
      line(x, i, x + w, i);
    }
  } else if (axis == X_AXIS) { // Left to right gradient
    for (var i = x; i <= x + w; i++) {
      var inter = map(i, x, x + w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      strokeCap(SQUARE);
      line(i, y, i, y + h);
    }
  }
}

// Draw a radial gradient
function drawRadialGradient(x, y, r, color1, color2) {
  // Use native canvas code instead of trying to hack it into P5
  var gradient = drawingContext.createRadialGradient(x, y, r, x, y, 0);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  drawingContext.fillStyle = gradient;
  ellipse(x, y, r*2);
}

// Draw a modified version of tenprint
function drawStraightTenprint() {
  stroke(255);
  strokeWeight(0.5);
  for (var y = 0; y < height; y += 200) {
    for (var x = 0; x < width; x += 200) {
      if (random(1) > 0.5) {
        line(x, y, x + 200, y + 200);
      } else {
        line(x, y + 200, x + 200, y);
      }
    }
  }
}

// Draw a modified version of tenprint with beziers
function drawCurvedTenprint() {
  push();
  stroke(255);
  noFill();
  strokeWeight(0.5);
  for (var y = 0; y < height; y += 200) {
    for (var x = 0; x < width; x += 200) {
      if (random(1) > 0.5) {
        bezier(x, y + 200, x + 200, y, x + random(width), y + random(height), x + random(width), y + random(height));
      } else {
        bezier(x, y + 200, x + 200, y, x + random(width), y + random(height), x + random(width), y + random(height));
      }
    }
  }
  pop();
}

// Draw gradient boxes with a box on top of them, to make it look outlined
function drawOutlinedBoxes(num) {
  for (var i = 0; i < num; i++) {
    push();
    var boxX = random(0, width);
    var boxY = random(0, height);
    var boxW = random(200);
    var boxH = random(300);
    // Draw gradient
    setGradient(boxX, boxY, boxW, boxH, PRIMARY_COLOR, color(255, 255, 255), X_AXIS),
      push();
    fill(PRIMARY_COLOR);
    strokeCap(SQUARE);
    noStroke();
    // Draw a box on top
    rect(boxX + 2, boxY + 2, boxW - 4, boxH - 4);
    pop();
  }
}

// Selector event for book dropdown
function selectorEvent() {
  book_number = selector.value();
  redraw();
}

// Save image function
function saveImage() {
  save();
}

// Regenerate drawing function
function regenerate() {
  redraw();
}

// Draw spaces category icon
function drawSpacesIcon(x, y, s) {
  push();
  translate(x, y);
  scale(s);
  beginShape();
  line(1.52448, 54.6094, 1.52448,18.0115);
  line(1.52448,18.0115, 21.6276,1.10431);
  line(21.6276,1.10431, 61.5245,5.74348);
  line(61.5245,5.74348, 41.4214,22.6507);
  line( 41.4214,22.6507, 41.4214,59.2486);
  line(41.4214,59.2486, 41.4214,22.6507);
  line( 1.52448,18.0115, 41.4214,22.6507);
  line( 41.4214,22.6507, 61.5245,5.74348);
  line(61.5245,5.74348, 61.5245,42.3414);
  line(61.5245,42.3414, 41.4214,59.2486);
  line(41.4214,59.2486, 1.52448,54.6094);
  line(1.52448,54.6094, 1.52448,18.0115);
  endShape();
  pop();
}

// Draw dialogues category icon
function drawDialoguesIcon(x, y, s) {
  push();
  translate(x, y);
  scale(s);
  beginShape();
  bezier(1.92499,19.5435, 22.5365,43.8241,40.8818,44.2558,61.8171,19.5435);
  bezier(61.925,19.5435, 41.3135,-4.84497,22.9681,-5.27663,2.03288,19.4356);
  ellipse(31.5, 19, 20);
  endShape();
  pop();
}

// Draw systems category icon
function drawSystemsIcon(x, y, s) {
  push();
  ellipseMode(CENTER);
  translate(x, y);
  scale(s);
  noFill();
  stroke(255);
  strokeCap(ROUND);
  //Outer circle
  ellipse(0, 0, 60, 60);
  // Inner circle
  ellipse(0, 0, 20, 20);
  //Top line
  line(0, -30, 0, -10);
  //Bottom line
  line(0, 30, 0, 10);
  // Left line
  line(-30, 0, -20, 0);
  // Right line
  line(30, 0, 20, 0);
  push();
  fill(255);
  // Left triangle
  triangle(-20, -5, -20, 5, -15, 0);
  // Right triangle
  triangle(20, 5, 20, -5, 15, 0);
  pop();
  pop();
}

// Draw practices category icon
function drawPracticesIcon(x, y, s) {
  push();
  ellipseMode(CENTER);
  translate(x, y);
  scale(s);
  noFill();
  stroke(255);
  strokeWeight(2);
  strokeCap(ROUND);
	beginShape();
  vertex(1.54999,55.717);
	bezierVertex(1.54999,55.717,54.2547,42.1674,42.5188,22.3231);
  bezierVertex(41.4519,20.5094,39.9582,19.0158,38.0378,18.2689);
  bezierVertex(21.5009,11.6542,4.00384,58.2775,37.6111,55.2902);
  bezierVertex(70.8983,52.4096,65.3504,12.7211,45.9329,6.21298);
  endShape();
	push();
  fill(255);
  translate(46, 7);
  rotate(PI / 3.0);
	triangle(-5, 3, 0, -7, 5, 5);
  pop();
  pop();
}

// Callback for toggle elements checkbox
function toggleElements() {
  showElements = !showElements;
  redraw();
}
