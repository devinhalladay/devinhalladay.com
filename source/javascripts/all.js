// Wait until all assets are loaded to evaluate function
$( document ).ready(function() {
  $('#toggle').click(function () {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
  });
});

$(document).keyup(function(e) {
  if (e.keyCode == 27) { // escape key maps to keycode `27`
    $('#toggle').removeClass('active');
    $('#overlay').removeClass('open');
  }
});
