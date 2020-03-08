function initLazyload() {
  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazyload"
  });
}

function initMixitUp() {
  if ($('.archive').length > 0) {
    var config = {
      animation: {
        enable: false
      },
      selectors: {
        target: '.archive-project'
      }
    }

    var mixer = mixitup('.archive', config);

    $('.archive').on('mixEnd', function (e, state) {
      $('.archive-group').each(function () {
        var that = $(this);
        var archiveGroupContents = $(this).find('.archive-group-contents');

        // Show all archive groups
        that.show();

        // If archive group contains no visible projects, hide the group
        if (archiveGroupContents.find('.archive-project:visible').length == 0) {
          that.hide();
        }
      })
    });
  }
}

function changeTitleOnBlur() {
  var title = document.title;
  var alttitle = "Enjoy your day!";
  window.onblur = function () { document.title = alttitle; };
  window.onfocus = function () { document.title = title; };
}

$(document).ready(function () {
  $('body').on('click', function (e) {
      var y = e.pageY;
        // direction = Math.round(Math.random()) == 0 ? 'left' : 'right';
        // setInterval(function () {
        //   dot.animate({
        //     top: '+=14',
        //     left: direction == 'left' ? '+=14' : '-=0',
        //   }, 500);

        //   dot.animate({
        //     top: '-=40',
        //     left: direction == 'left' ? '-=40' : '+=40',
        //   }, 1000);
        // });
        $('body').snowfall({ flakeOriginX: e.pageX, flakeOriginY: e.pageY, image: "/assets/images/bubble-blue.png", flakeCount: 1, minSize: 10, maxSize: 46 });

      if ($('.dot').length > 0) {
        $('.clear-bubbles-button').show();
      }
  });

  $('.clear-bubbles-button').click(function() {
    $('.dot').remove();
    $(this).hide();
  })

  changeTitleOnBlur();

  initLazyload();
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

  if ($('.block-gallery').length > 0) {
    var $blockGallery = $('.block-gallery').flickity({
      contain: true,
      wrapAround: true,
      imagesLoaded: true,
      cellSelector: '.gallery-slide',
      pageDots: false,
      adaptiveHeight: true,
      draggable: false,
      autoPlay: 2800,
      selectedAttraction: 0.2,
      friction: 0.8
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
  initScrollBars();
  initLazyload();
  initMixitUp();
  window.onscroll = function () { scollTopButton() };

  $('.scroll-top-button').click(function() {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    return false;
  });

  if ($('.dot').length > 0) {
    $('.clear-bubbles-button').show();
  } else {
    $('.clear-bubbles-button').hide();
  }
});