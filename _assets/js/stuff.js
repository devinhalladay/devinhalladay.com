//= require vendor/wufoo
//= require vendor/parsley.min
//= require vendor/parsley.extend
//= require vendor/imagesloaded.pkgd.min
//= require vendor/jquery.fluidbox.min

$(function () {
  $("figure a").fluidbox({
    closeTrigger: [
      { selector: '#fluidbox-overlay', event: 'click'},
      { selector: 'window', event: 'scroll'}
    ]
  });
});