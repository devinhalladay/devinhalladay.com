var numBallots = 30;
var degree = 0;

//temp
var min_x = 0;
var max_x = $(document).width();
var min_y = 0;
var max_y = $(document).height()/2;
var rand_x=0;
var rand_y=0;
//temp

function drawBallots() {
  for (var i = 0; i < numBallots; i++) {
    var $ballot = $("<div>", {
      text: "Vote!",
      "class": `ballot ballot-${i}`
    });

    $(".ballots").append($ballot);
  }

  $('.ballot').each(function() {
    plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    randAngle = Math.floor(Math.random()*70+50) * plusOrMinus;

    degree += randAngle;

    $(this).css({
      'transform': 'rotate('+ degree +'deg)',
      'left': Math.random() * ($('.ballots').width() - $(this).width()),
      'bottom': Math.random() * ($('.ballots').height() - $(this).height())
    });
  });

  var $yourBallot = $("<div>", {
    text: "Vote!",
    "class": `ballot ballot-yours`
  });

  $(".ballots").append($yourBallot);

  $('.ballot-yours').each(function() {
    plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    randAngle = Math.floor(Math.random()*70+50) * plusOrMinus;

    degree += randAngle;

    $(this).css({
      'transform': 'rotate('+ degree +'deg)',
      'left': Math.random() * ($('.ballots').width() - $(this).width()),
      'bottom': Math.random() * ($('.ballots').height() - $(this).height())
    });
  });
}

drawBallots();

$( window ).resize(function() {
  $('.ballots').empty();
  drawBallots();
});


// Arrow animation
var arrowLine = $('.arrow-line');
var arrowChevron = $('.arrow-chevron');

$('.cta').mouseenter(function() {
  arrowChevron.removeClass("anim-chevron--out");
  arrowLine.removeClass("anim-line--out");
  arrowChevron.addClass("anim-chevron--in");
  arrowLine.addClass("anim-line--in");
  console.log('mousein');
});

$('.cta').mouseout(function() {
  arrowChevron.removeClass("anim-chevron--in");
  arrowLine.removeClass("anim-line--in");
  arrowChevron.addClass("anim-chevron--out");
  arrowLine.addClass("anim-line--out");
  console.log('mouseout');
});
