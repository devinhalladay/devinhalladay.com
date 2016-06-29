// Wait until all assets are loaded to evaluate function
$( document ).ready(function() {
  $('#toggle').click(function () {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
  })
});
