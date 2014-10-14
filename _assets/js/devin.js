//= require vendor/jquery.jamcity

$(document).ready(function(){
  $(".jams").JamCity({
    apiKey: '02adf7de5c1121bbab028c6c07233e68',
    username: 'devinhalladay',
    fetch: 1
  });
});

$(window).scroll(function(e) {
    var s = $(window).scrollTop(),
        opacityVal = (s / 150.0),
        oppOpacityVal = (150.0 / s);

    $('.site__hero--blurred').css('opacity', opacityVal);
    $('.site__hero').css('opacity', oppOpacityVal);

    if ($(window).scrollTop() < 0) {
      $('.site__hero').css('opacity', 1);
    };

    $('.site__hero__headline').css({
      'top': "-" + ($(this).scrollTop() * 0.2) + "px"
    });
});