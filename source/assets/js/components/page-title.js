// Change the page title when the tab is switched.
$(function () {
  var title = document.title;
  var alttitle = "Enjoy your day!";
  window.onblur = function () { document.title = alttitle; };
  window.onfocus = function () { document.title = title; };
});
