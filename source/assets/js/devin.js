//= require vendor/jquery
//= require vendor/jquery.jamcity
//= require vendor/slick
//= require vendor/typed
//= require vendor/fluidbox
//= require vendor/responsive-nav
//= require vendor/jquery-ui-custom
//= require vendor/layzr
//= require vendor/instantclick.min

// Initiate slicknav for responsive navigation.
$(document).ready(function(){
  $(function(){
    $('.site__header__nav').slicknav();
  });
});

// Slick slider
$(document).ready(function(){
  $('.slick').slick();
});


// Parallax for hero headlines.
$(window).scroll(function(e) {
  var s = $(window).scrollTop(),
    opacityVal = (s / 120),
    oppOpacityVal = (120 / s);

  $('.site__hero__headline').css({
    'top': "-" + ($(this).scrollTop() * 0.2) + "px"
  });
});

// Typed function for the 404 page.
$(function(){
  $(".console").typed({
    strings: ["4 ^600 8 ^600 15 ^600 16 ^600 23 ^600 42 "],
    typeSpeed: 0
  });
});

// Newsletter form success popup.
$('#tlemail').keypress(function(e){
  var key = e.which;
  if (key == 13) {
    $('.form-success').toggle();
  }
});

// Change the page title when the tab is switched.
$(function () {
  var title = document.title;
  var alttitle = "Come back! ❤";
  window.onblur = function () { document.title = alttitle; };
  window.onfocus = function () { document.title = title; };
});
