//= require vendor/jquery.jamcity
//= require vendor/typed
//= require vendor/fluidbox
//= require vendor/lazyload
//= require vendor/mousetrap.min
//= require vendor/jquery-ui-custom

$(document).ready(function(){
  $(".jams").JamCity({
    apiKey: '02adf7de5c1121bbab028c6c07233e68',
    username: 'devinhalladay',
    fetch: 1
  });

  if ($(window).scrollTop() <= 0) {
    $('.site__header').css('background', 'rgb(16,17,19)');
  };

  Mousetrap.bind('enter', function(e) {
    console.log("4 8 15 16 23 42");
    (function looper(){
      // use callback function of the effect to call the outer looper function recursively.
      $('body').effect('pulsate', function(){
        setTimeout(looper); // add a timeout of needed
      });
    })();
  });
});

$(window).scroll(function(e) {
  var s = $(window).scrollTop(),
      opacityVal = (s / 8),
      oppOpacityVal = (8 / s);

  $('.site__hero--blurred').css('opacity', opacityVal);
  $('.site__hero').css('opacity', oppOpacityVal);

  if ($(window).scrollTop() <= 0) {
    $('.site__hero').css('opacity', 1);
  };

  $('.site__hero__headline').css({
    'top': "-" + ($(this).scrollTop() * 0.2) + "px"
  });

  if ($(window).scrollTop() > 0) {
    $('.site__header').css('background', 'rgba(16,17,19,0.86)');
  };

  if ($(window).scrollTop() <= 0) {
    $('.site__header').css('background', 'rgb(16,17,19)');
  };
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