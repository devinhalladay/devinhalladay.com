//= require vendor/jquery.jamcity
//= require vendor/typed
//= require vendor/fluidbox
//= require vendor/lazyload
// // = require vendor/mousetrap.min

$(document).ready(function(){
  $(".jams").JamCity({
    apiKey: '02adf7de5c1121bbab028c6c07233e68',
    username: 'devinhalladay',
    fetch: 1
  });

  // Mousetrap.bind('enter', function(e) {
  //   console.log("4 8 15 16 23 42");
  //   alert("4 8 15 16 23 42");
  // };
});

$(window).scroll(function(e) {
    var s = $(window).scrollTop(),
        opacityVal = (s / 120.0),
        oppOpacityVal = (120.0 / s);

    $('.site__hero--blurred').css('opacity', opacityVal);
    $('.site__hero').css('opacity', oppOpacityVal);

    if ($(window).scrollTop() < 0) {
      $('.site__hero').css('opacity', 1);
    };

    $('.site__hero__headline').css({
      'top': "-" + ($(this).scrollTop() * 0.2) + "px"
    });
});

$(function(){
  $(".console").typed({
    strings: ["4 ^600 8 ^600 15 ^600 16 ^600 23 ^600 42 "],
    typeSpeed: 0
  });
});


$(function () {
  $("figure a").fluidbox({
    closeTrigger: [
      { selector: '#fluidbox-overlay', event: 'click'},
      { selector: 'window', event: 'scroll'}
    ]
  });

  $(".fluidbox").fluidbox({
    closeTrigger: [
      { selector: '#fluidbox-overlay', event: 'click'},
      { selector: 'window', event: 'scroll'}
    ]
  });


  $("img").lazyload({
    effect : "fadeIn"
  });
});