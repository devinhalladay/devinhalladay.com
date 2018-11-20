// require('vendor/gridforms');
// require('vendor/parsley');

$(document).ready(function() {
  $('select[name="reason"]').change(function () {
    if ($(this).val() == "You're intersted in hiring me for a project.") {
      console.log($('#budget').parent().show());
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

    $('input[type="submit"]').val('Submitting...'); // set the submit button value to submitting...

    $('.contact-form :input').change(function(event) {
      $('input[type="submit"]').val('Submit!');
      $('input[type="submit"]').css("background-color", "#17aaff");
      $('input[type="submit"]').prop('disabled',false);
    });

    // get the form data
    var formData = $(this).serialize();
    // process the form
    $.ajax({
      type        : 'POST',
      url         : 'https://devinhalladay-contact.herokuapp.com', // POST to this URL
      data        : formData, // the data object
      dataType    : 'json', // expect JSON back from the server response
      encode      : true
    })
    // using the done promise callback
    .done(function(data) {

      // DEBUGGING ONLY
      // console.log(data);

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
        $('input[type="submit"]').css("background-color", "#ffffff");
        $('input[type="submit"]').css("color", "#0fcf7b");
        $('input[type="submit"]').css("border", "2px solid #0fcf7b");
        $('input[type="submit"]').css("box-shadow", "5px 5px 0px 0px #0fcf7b");
        $('input[type="submit"]').prop('disabled',true);
      }
    })
    .fail(function(data) {
      $('input[type="submit"]').val('Server error! Try again or email me at devin@devinhalladay.com.');
      $('input[type="submit"]').val('Success. Talk to you soon!');
      $('input[type="submit"]').css("background-color", "#ffffff");
      $('input[type="submit"]').css("color", "#e83131");
      $('input[type="submit"]').css("border", "2px solid #e83131");
      $('input[type="submit"]').css("box-shadow", "5px 5px 0px 0px #e83131");
    });
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
  });
});

$(document).ready(function() {
  $('form[data-parsley-validate]').parsley({
    trigger: 'change',
    successClass: "has-success",
    errorClass: "has-error",
    classHandler: function (el) {
      return el.$element.closest('div[data-field-span]');
    }
  });
});
