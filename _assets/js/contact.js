
$(document).ready(function() {

  var el = {
    form: $('#contact')
  };

  el.submit = {
    button: $('input[type=submit]', el.form)
  };

  el.fields = {
    all: $('.required:not(:last-child)', el.form),
    required: $('.required', el.form),
    email: $('.email', el.form),
    numeric: $('.numeric', el.form),
    alpha: $('.alpha', el.form)
  };

  var form = {
    ie: (function() {
      // IE Detection code by James Padolsey
      // https://gist.github.com/padolsey/527683
      var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');

      while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
      );

      return v > 4 ? v : undef;
    }()),

    init: function() {
      // keep valid state
      this.valid = true;

      if (this.ie) {
        el.form.addClass('ie' + this.ie);

        // use classes to target certain elements in ie6
        if (el.form.hasClass('ie6')) {
          el.form.find('input[type=text]').addClass('input-text');
          el.form.find('textarea').addClass('textarea');
        }
      }

      this.events();
    },

    errors: {
      clearAll: function() {
        // clear error messages
        $('.error', el.form).removeClass('error');
        $('.error-message', el.form).remove();
      },

      show: function(message, el) {
        $(el)
          .addClass('error')
          .append('<span class=\"error-message\">' + message + '</span>');

        // mark form as invalid
        form.valid = false;
      }
    },

    validate: function() {
      var self = this;

      // reset initial from valid state
      form.valid = true;

      // clear errors
      this.errors.clearAll();

      el.fields.all.each(function(i, el) {
        // get data from fields
        // only input and textarea fields can have validations at the moment
        var data = $(this).find('input, textarea').val();

        // check if this field needs validation
        var required = $(el).hasClass('required'),
          email = $(el).hasClass('email'),
          numeric = $(el).hasClass('numeric'),
          alpha = $(el).hasClass('alpha');

        // return early if not a required field and no data to check
        if (!required && !data)
          return;

        // if required and no data filled in, show an error
        if (required && !data)
          return self.errors.show('This field is required', el);

        if (email && !(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(data)))
          return self.errors.show('Please enter a valid email address', el);

        if (numeric && !(/^[0-9]+$/.test(data)))
          return self.errors.show('Please enter a number without spaces, dots or commas', el);

        if (alpha && !(/^[a-zA-Z ]+$/.test(data)))
          return self.errors.show('This field accepts only letters &amp; spaces', el);
      });
    },

    buttonState: {
      active: function() {
        el.submit.button
          .removeClass()
          .val('Send');
      },
      sending: function() {
        el.submit.button
          .removeClass()
          .addClass('sending')
          .val('Sending');
      },
      failed: function() {
        el.submit.button
          .removeClass()
          .addClass('try-again')
          .val('Try Again');
      },
      sent: function() {
        el.submit.button
          .removeClass()
          .addClass('sent')
          .val('Sent')
          .attr('disabled', true);
      }
    },

    submit: function() {
      var self = this;

      $.post('/post.php', el.form.serialize() + '&request_method=ajax', function(response) {
        // does the word 'PASS' exist in response
        var success = /PASS/.test(response) ? true : false;

        if (success) {
          // form submitted and response received
          setTimeout(function() {
            self.buttonState.sent();
          }, 1000);
        } else {
          // fallback to non-ajax submission
          // since the validation said the form was OK
          // but the server responded with a FAIL
          el.form
            .unbind('submit')
            .submit();
        }
      });
    },

    events: function() {
      var self = this;

      el.form.submit(function() {
        // validate form
        self.validate();
        self.buttonState.sending();

        // submit form if valid
        if (self.valid) {
          self.submit();
        } else {
          setTimeout(function() {
            self.buttonState.failed();
          }, 1000);
        }

        // prevent default action
        return false;
      });
    }
  };

  form.init();
});
