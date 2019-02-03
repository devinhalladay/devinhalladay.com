function init() {
  if ($('.block-gallery').length > 0) {
    let $blockGallery = $('.block-gallery').flickity({
      contain: true,
      wrapAround: true,
      imagesLoaded: true,
      cellSelector: '.gallery-slide',
      pageDots: false,
      adaptiveHeight: true
    });

    var $carouselStatus = $('.carousel-status');
    var flkty = $blockGallery.data('flickity');

    function updateStatus() {
      var cellNumber = flkty.selectedIndex + 1;
      $carouselStatus.text(cellNumber + '/' + flkty.slides.length);
    }
    updateStatus();
    $blockGallery.on('change.flickity', updateStatus);
  }

  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.children[1];
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";

        this.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
      }
    });
  }
}

$(document).ready(function () {
  // $(document).on('click', 'a', function (e) {
  //   let link = $(this).attr('href');

  //   $('.recto').first().load(link + ' .page-container', function () {
  //     window.history.replaceState(null, null, link);
  //     $(this).addClass('open');
  //     init();
  //   });

  //   e.preventDefault();
  // });


  const docHeight = $(document).height();

  $(".progress-1").animate({ height: "5%" });
  $(".progress-2").animate({ height: "5%" });
  $(".progress-3").animate({ width: "5%" });
  $(".progress-4").animate({
    width: "5%"
  });
  $(".progress-5").animate({
    width: "5%"
  });
  $(".progress-6").animate({
    height: "5%"
  });
  $(".progress-7").animate({
    height: "5%"
  });
  $(".progress-8").animate({
    width: "5%"
  });

  window.onscroll = function () {
    myFunction();
  };

  function myFunction() {
    var winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    var height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    var scrolled = winScroll / height * 95;
    document.getElementById("progress-1").style.height = scrolled + 5 + "%";
    document.getElementById("progress-2").style.height = scrolled + 5 + "%";
    document.getElementById("progress-3").style.width = scrolled + 5 + "%";
    document.getElementById("progress-4").style.width = scrolled + 5 + "%";
    document.getElementById("progress-5").style.width = scrolled + 5 + "%";
    document.getElementById("progress-6").style.height = scrolled + 5 + "%";
    document.getElementById("progress-7").style.height = scrolled + 5 + "%";
    document.getElementById("progress-8").style.width = scrolled + 5 + "%";
  }
})




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
});