//= require vendor/jquery.jamcity
//= require vendor/typed
//= require vendor/fluidbox
// // = require vendor/jribbble.min
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

// API Ref: http://api.dribbble/players/:id/shots

// $(document).ready(function(){
//   $.jribbble.getShotsByPlayerId('devinhalladay', function (playerShots) {
//     var html = [];
//     $.each(playerShots.shots, function (i, shot) {
//       html.push('<div class="project grid__col grid__col--4-of-12">');
//       html.push('<a href="' + shot.url + '">');
//       html.push('<h2>' + shot.title + '</h2>');
//       html.push('<figure>')
//       html.push('<img src="' + shot.image_url + '" ');
//       html.push('alt="' + shot.title + '"></figure></a></div>');
//     });

//     $('.dribbble-shots').html(html.join(''));
//   }, {page: 1, per_page: 6});
// });