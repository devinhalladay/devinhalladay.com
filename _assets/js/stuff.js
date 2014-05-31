//= require vendor/wufoo
//= require vendor/parsley.min
//= require vendor/parsley.extend
//= require vendor/imagesloaded.pkgd.min
//= require vendor/jquery.fluidbox.min
//= require foundation/foundation
//= require foundation/foundation.equalizer
//= require vendor/gridforms
// //= require vendor/mosaic

$(document).foundation();

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

  // $('.project-cover').mosaic({
  //   animation : 'slide'   //fade or slide
  // });
});