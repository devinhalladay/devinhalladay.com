function initLazyload() {
  var lazyLoadInstance = new LazyLoad({
    elements_seslector: ".lazyload"
  });
}

function initMarquee() {
  const $mq = $('.marquee p');
  const el = "    <a href='mailto:studio@devinhalladay.com'>studio@devinhalladay.com</a> <span class='always-forward-circle'>→</span>    ";

  if ($mq) {
    $mq.append(el).append(el).append(el).marquee({
      duration: 8000,
      gap: 10,
      delayBeforeStart: 0,
      duplicated: true,
      allowCss3Support: true,
      startVisible: true
    });
  }
}

function changeTitleOnBlur() {
  var title = document.title;
  var alttitle = "Enjoy your day!";
  window.onblur = function () { document.title = alttitle; };
  window.onfocus = function () { document.title = title; };
}

function obliqueStrategy() {
  var o = ["Abandon normal instruments", "Accept advice", "Accretion", "A line has two sides", "Allow an easement (an easement is the abandonment of a stricture)", "Are there sections? Consider transitions", "Ask people to work against their better judgement", "Ask your body", "Assemble some of the instruments in a group and treat the group", "Balance the consistency principle with the inconsistency principle", "Be dirty", "Breathe more deeply", "Bridges -build -burn", "Cascades", "Change instrument roles", "Change nothing and continue with immaculate consistency", "Children's voices -speaking -singing", "Cluster analysis", "Consider different fading systems", "Consult other sources -promising -unpromising", "Convert a melodic element into a rhythmic element", "Courage!", "Cut a vital connection", "Decorate, decorate", "Define an area as 'safe' and use it as an anchor", "Destroy -nothing -the most important thing", "Discard an axiom", "Disconnect from desire", "Discover the recipes you are using and abandon them", "Distorting time", "Do nothing for as long as possible", "Don't be afraid of things because they're easy to do", "Don't be frightened of cliches", "Don't be frightened to display your talents", "Don't break the silence", "Don't stress one thing more than another", "Do something boring", "Do the washing up", "Do the words need changing?", "Do we need holes?", "Emphasize differences", "Emphasize repetitions", "Emphasize the flaws", "Faced with a choice, do both", "Feedback recordings into an acoustic situation", "Fill every beat with something", "Get your neck massaged", "Ghost echoes", "Give the game away", "Give way to your worst impulse", "Go slowly all the way round the outside", "Honor thy error as a hidden intention", "How would you have done it?", "Humanize something free of error", "Imagine the music as a moving chain or caterpillar", "Imagine the music as a set of disconnected events", "Infinitesimal gradations", "Intentions -credibility of -nobility of -humility of", "Into the impossible", "Is it finished?", "Is there something missing?", "Is the tuning appropriate?", "Just carry on", "Left channel, right channel, centre channel", "Listen in total darkness, or in a very large room, very quietly", "Listen to the quiet voice", "Look at a very small object, look at its centre", "Look at the order in which you do things", "Look closely at the most embarrassing details and amplify them", "Lowest common denominator check -single beat -single note -single", "riff", "Make a blank valuable by putting it in an exquisite frame", "Make an exhaustive list of everything you might do and do the last", "thing on the list", "Make a sudden, destructive unpredictable action; incorporate", "Mechanicalize something idiosyncratic", "Mute and continue", "Only one element of each kind", "(Organic) machinery", "Overtly resist change", "Put in earplugs", "Remember those quiet evenings", "Remove ambiguities and convert to specifics", "Remove specifics and convert to ambiguities", "Repetition is a form of change", "Reverse", "Short circuit", "Shut the door and listen from outside", "Simple subtraction", "Spectrum analysis", "Take a break", "Take away the elements in order of apparent non-importance", "Tape your mouth", "The inconsistency principle", "The tape is now the music", "Think of the radio", "Tidy up", "Trust in the you of now", "Turn it upside down", "Twist the spine", "Use an old idea", "Use an unacceptable color", "Use fewer notes", "Use filters", "Use 'unqualified' people", "Water", "What are you really thinking about just now? Incorporate", "What is the reality of the situation?", "What mistakes did you make last time?", "What would your closest friend do?", "What wouldn't you do?", "Work at a different speed", "You are an engineer", "You can only make one dot at a time", "You don't have to be ashamed of using your own ideas", "(blank white card)"];

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  var i = randomIntFromInterval(0, 116);

  var obliqueParent = $('.oblique-strategy');

  $('#obliquestrategies em').text(o[i]);
}

$(document).ready(function () {
  $('body').on('click', function (e) {
    if ($(e.target).attr('class') == 'oblique-strategy' || $(e.target).parents(".oblique-strategy").length) {
      return
    } else {
      var y = e.pageY;
      $('body').append('<div class="dot" style="top:' + y + 'px; left:' + e.pageX + 'px"></div>');
    }
  });

  changeTitleOnBlur();

  obliqueStrategy();
  initLazyload();
  initMarquee();
  initScrollBars();
});

function scollTopButton() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    $('.scroll-top-button').show();
  } else {
    $('.scroll-top-button').hide();
  }
}

function init() {
  initScrollBars();
  window.onscroll = function () { scollTopButton() };

  $('.refresh-oblique-strategy').click(function () {
    obliqueStrategy();
  })

  if ($('.block-gallery').length > 0) {
    var $blockGallery = $('.block-gallery').flickity({
      contain: true,
      wrapAround: true,
      imagesLoaded: true,
      cellSelector: '.gallery-slide',
      pageDots: false,
      adaptiveHeight: true,
      draggable: false
    });

    var $carouselStatus = $('.carousel-status');
    var flkty = $blockGallery.data('flickity');

    function updateStatus() {
      var cellNumber = flkty.selectedIndex + 1;
      $carouselStatus.text(cellNumber + ' of ' + flkty.slides.length);
    }
    updateStatus();
    $blockGallery.on('change.flickity', updateStatus);
  }
}

function initScrollBars() {
  const docHeight = $(document).height();

  $(".progress-1").animate({ height: "5%" });
  $(".progress-2").animate({ height: "5%" });
  $(".progress-3").animate({ width: "5%" });
  $(".progress-4").animate({ width: "5%" });
  $(".progress-5").animate({ width: "5%" });
  $(".progress-6").animate({ height: "5%" });
  $(".progress-7").animate({ height: "5%" });
  $(".progress-8").animate({ width: "5%" });

  window.onscroll = function () {
    scrollBars();
  };

  function scrollBars() {
    var winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    var height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    var scrolled = winScroll / height * 80;
    document.getElementById("progress-1").style.height = scrolled + 5 + "%";
    document.getElementById("progress-2").style.height = scrolled + 5 + "%";
    document.getElementById("progress-3").style.width = scrolled + 5 + "%";
    document.getElementById("progress-4").style.width = scrolled + 5 + "%";
    document.getElementById("progress-5").style.width = scrolled + 5 + "%";
    document.getElementById("progress-6").style.height = scrolled + 5 + "%";
    document.getElementById("progress-7").style.height = scrolled + 5 + "%";
    document.getElementById("progress-8").style.width = scrolled + 5 + "%";
  }
}




const FadePageTransition = Barba.BaseTransition.extend({
  start: function() {
    Promise.all([this.newContainerLoading, this.fadeOut()]).then(
      this.fadeIn.bind(this)
    );
  },
  fadeOut: function() {
    const oldContainer = this.oldContainer;
    return new Promise(function(resolve) {
      anime({
        targets: oldContainer,
        opacity: 0,
        translateY: 100,
        easing: "easeInCubic",
        duration: 300,
        complete: function() {
          resolve();
        }
      });
    });
  },
  fadeIn: function() {
    initMarquee();
    const _this = this;
    const oldContainer = this.oldContainer;
    const newContainer = this.newContainer;
    window.scrollTo(0, 0);
    oldContainer.style.display = "none";
    newContainer.style.visibility = "visible";
    newContainer.style.opacity = 0;
    newContainer.style.transform = "translateY(100px)";
    anime({
      targets: newContainer,
      opacity: 1,
      translateY: 0,
      easing: "easeOutCubic",
      duration: 600,
      complete: function() {
        _this.done();
      }
    });
  }
});

Barba.Pjax.getTransition = function() {
  return FadePageTransition;
};

document.addEventListener("DOMContentLoaded", function(e) {
  Barba.Pjax.start();
});

Barba.Dispatcher.on("newPageReady", function(e) {
  init();
  obliqueStrategy();
  initLazyload();
  // $('.dot').remove();

  $('.scroll-top-button').click(function() {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    return false;
  })
});