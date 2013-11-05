//= require vendor/responsive-nav.min
//= require vendor/ss-standard
//= require vendor/wufoo
//= require vendor/jquery.fitvids
//= require vendor/parsley.min
//= require vendor/parsley.extend
//= require vendor/kudos

$(function() {
  var nav = responsiveNav(".nav-collapse");
});

$(".video-pusher").fitVids();

$(".post-sharing-button").on("click", function() {
    $(".sharing-menu").toggleClass("IsOpen")
});

function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}

r(function() {
  /*
   * Create Kudos Please widget
   */
  new KudosPlease({
    el : '.kudos--default',
    duration : 1500,
    status : {
    }
  });
});