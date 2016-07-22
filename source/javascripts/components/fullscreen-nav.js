$(document).ready(function() {
  // Open and close fullscreen navigation.
  $('#toggle').click(function () {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
  });
});

$(document).keyup(function(e) {
  // Close fullscreen navigation when esc is pressed
  if (e.keyCode == 27) { // escape key maps to keycode `27`
    $('#toggle').removeClass('active');
    $('#overlay').removeClass('open');
  }
});
