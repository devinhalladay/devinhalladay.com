$(document).ready(function () {

  function init() {
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

  init();

  $(document).on('click', 'a', function (e) {
    let link = $(this).attr('href');

    $('.recto').first().load(link + ' .page-container', function () {
      window.history.replaceState(null, null, link);
      $(this).addClass('open');
      init();
    });

    e.preventDefault();
  });


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

