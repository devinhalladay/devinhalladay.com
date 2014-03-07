//= require vendor/jquery.browserwrapper.min

jQuery(document).ready(function ($) {
  $('#browser').browserWrapper({
    browserTitle:     'devinhalladay.com',
    browserURL:       'devinhalladay.com',
    favicon:          'http://devinhalladay.com/favicon.ico',
    shadow: '0',
    makeBrowserWork:  true
  });
});