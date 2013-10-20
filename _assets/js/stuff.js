//= require vendor/responsive-nav.min
//= require vendor/ss-standard
//= require vendor/wufoo
//= require vendor/jquery.fitvids
//= require vendor/parsley.min
//= require vendor/parsley.extend

$(function() {
  var nav = responsiveNav(".nav-collapse");
});

$(".video-pusher").fitVids();

$(".post-sharing-button").on("click", function() {
    $(".sharing-menu").toggleClass("IsOpen")
});