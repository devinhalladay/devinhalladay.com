//= require vendor/lazyloadxt
//= require vendor/picturefill

// Wait until all assets are loaded to evaluate function
$( document ).ready(function() {
  $('#toggle').click(function () {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
  });

  $.extend($.lazyLoadXT, {
    edgeY:  200
  });
});

$(document).keyup(function(e) {
  if (e.keyCode == 27) { // escape key maps to keycode `27`
    $('#toggle').removeClass('active');
    $('#overlay').removeClass('open');
  }
});

$(document).ready(function() {

  $('select[name="reason"]').change(function () {
    if ($(this).val() == "You're intersted in hiring me for a project.") {
      $('#budget').parent().show();
      $('select[name="budget"]').prop('disabled', false);
    } else {
      $('#budget').parent().hide();
      $('select[name="budget"]').prop('disabled', true);
    }
  });

  // process the form
  $('.contact-form').submit(function(event) {

    $('#name').removeClass('has-error'); // remove the error class
    $('#email').removeClass('has-error'); // remove the error class
    $('#message').removeClass('has-error'); // remove the error class

    // get the form data
    // there are many ways to get this data using jQuery (you can use the class or id also)
    var formData = $(this).serialize();
    // process the form
    $.ajax({
      type        : 'POST',
      url         : 'https://devinhalladay-contact.herokuapp.com', // the url where we want to POST
      data        : formData, // our data object
      dataType    : 'json', // what type of data do we expect back from the server
      encode          : true
    })
    // using the done promise callback
    .done(function(data) {

      // log data to the console so we can see
      console.log(data);

      // handle errors and validation messages
      if ( ! data.success) {

        // handle name errors
        if (data.errors.name) {
          $('#name').addClass('has-error');
        }

        // handle email errors
        if (data.errors.email) {
          $('#email').addClass('has-error');
        }

        // message email errors
        if (data.errors.message) {
          $('#message').addClass('has-error');
        }
      } else {
        $('input[type="submit"]').val('Success. Talk to you soon!');
        $('input[type="submit"]').css("background-color", "#0fcf7b");
        $('input[type="submit"]').prop('disabled',true);
      }
    });
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
  });
});
