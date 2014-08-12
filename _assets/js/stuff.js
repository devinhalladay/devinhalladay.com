$(document).foundation();

//= require vendor/jquery.fluidbox.min

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
});