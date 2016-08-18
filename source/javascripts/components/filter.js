$(document).ready(function() {
  $('[data-filter*="item-"]').css("background", "none").css("color",
    "#3d464d").css('border', '1px solid #3d464d');
  $('[data-filter*="all"]').css("background", "#17aaff").css("color", "#ffffff").css(
    "opacity", "1").css('border', '1px solid #17aaff');

  $('[data-filter*="item-"]').click(function() {
    $('[data-filter*="item-"]').css("background", "none").css("color",
      "#3d464d").css('border', '1px solid #3d464d');

    $('[data-filter*="all"]').css("background", "none").css("color",
      "#3d464d").css('border', '1px solid #3d464d');

    $(this).css("background", "#17aaff").css("color", "#ffffff").css(
      "opacity", "1").css('border', '1px solid #17aaff');
  });

  $('[data-filter*="all"]').click(function() {
    $('[data-filter*="item-"]').css("background", "none").css("color",
      "#3d464d").css('border', '1px solid #3d464d');

    $(this).css("background", "#17aaff").css("color", "#ffffff").css(
      "opacity", "1").css('border', '1px solid #17aaff');
  });
});

$(function(){
  $('.work').mixItUp();
});
