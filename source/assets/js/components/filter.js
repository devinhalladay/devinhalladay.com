$(document).ready(function() {
  $('[data-filter*="item-"]').css("background", "none").css("color",
    "#0E162D").css('border', '1px solid #0E162D');
  $('[data-filter*="all"]').css("background", "#0E162D").css("color", "#ffffff").css(
    "opacity", "1").css('border', '1px solid #0E162D');

  $('[data-filter*="item-"]').click(function() {
    $('[data-filter*="item-"]').css("background", "none").css("color",
      "#0E162D").css('border', '1px solid #0E162D');

    $('[data-filter*="all"]').css("background", "none").css("color",
      "#0E162D").css('border', '1px solid #0E162D');

    $(this).css("background", "#0E162D").css("color", "#ffffff").css(
      "opacity", "1").css('border', '1px solid #0E162D');
  });

  $('[data-filter*="all"]').click(function() {
    $('[data-filter*="item-"]').css("background", "none").css("color",
      "#0E162D").css('border', '1px solid #0E162D');

    $(this).css("background", "#0E162D").css("color", "#ffffff").css(
      "opacity", "1").css('border', '1px solid #0E162D');
  });
});

$(function(){
  $('.work').mixItUp();
});
