(function () {
  'use strict';

  // Smooth scrolling functionality
  $('a.page-scroll').click(function(event) {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        event.preventDefault(); // Prevent the default anchor click behavior
        $('html,body').animate({
          scrollTop: target.offset().top - 50
        }, 900);
        return false;
      }
    }
  });

  // Show Menu on Book
  $(window).bind('scroll', function() {
    var navHeight = $(window).height() - 500;
    if ($(window).scrollTop() > navHeight) {
      $('.navbar-default').addClass('on');
    } else {
      $('.navbar-default').removeClass('on');
    }
  });

  $('body').scrollspy({ 
    target: '.navbar-default',
    offset: 80
  });

  // Hide nav on click
  $(".navbar-nav li a").click(function (event) {
    // check if window is small enough so dropdown is created
    var toggle = $(".navbar-toggle").is(":visible");
    if (toggle) {
      $(".navbar-collapse").collapse('hide');
    }
  });

  // Portfolio isotope filter
  $(window).load(function() {
    var $container = $('.portfolio-items');
    $container.isotope({
      filter: '*',
      animationOptions: {
        duration: 750,
        easing: 'linear',
        queue: false
      }
    });
    $('.cat a').click(function() {
      $('.cat .active').removeClass('active');
      $(this).addClass('active');
      var selector = $(this).attr('data-filter');
      $container.isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });
      return false;
    });
  });

  // Nivo Lightbox 
  $('.portfolio-item a').nivoLightbox({
    effect: 'slideDown',  
    keyboardNav: true,                            
  });
  
  // Testimonial Slider
  var testimonialCarousel = $("#testimonial").owlCarousel({
    navigation: false, // Hide navigation buttons
    slideSpeed: 300,
    paginationSpeed: 400,
    singleItem: true,
    autoPlay: 10000, // Set autoplay interval to 10 seconds (10000 milliseconds)
    responsive: {
      1000: {
        items: 1,
      }
    },
    rewind: true, // Enable loop
    afterAction: function() {
      // If it's the last item, jump to the first without animation
      var current = this.currentItem;
      var maximum = this.maximumItem;
      if (current === maximum) {
        this.currentItem = 0;
        this.jumpTo(0);
      }
      // Enable/disable back button based on current slide
      $('.owl-nav-prev').prop('disabled', current === 0);
    }
  });

  // Stop and restart carousel on hover
  var interval;
  testimonialCarousel.on('mouseover', function() {
    clearInterval(interval);
  }).on('mouseleave', function() {
    interval = setInterval(function() {
      testimonialCarousel.trigger('owl.next');
    }, 10000); // Set autoplay interval to 10 seconds (10000 milliseconds)
  }).trigger('mouseleave'); // Start autoplay
  
  // Navigation buttons
  $('.owl-nav-prev').click(function() {
    testimonialCarousel.trigger('owl.prev');
  });
  
  $('.owl-nav-next').click(function() {
    testimonialCarousel.trigger('owl.next');
  });

}());

const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const presentDate = new Date();
const presentDayAsNumber = presentDate.getDay();
const presentDay = weekday[presentDayAsNumber];
const showDay = document.getElementById(presentDay);
const presentTime = presentDate.getHours();

function checkDay() {
  if (presentDay == 'Sunday') {
    showDay.classList.add('closed');
  } else {
    if (presentTime >= 9 && presentTime < 17) {
      showDay.classList.add('open');
    } else {
      showDay.classList.add('closed');
    }
  }
}
checkDay();

function showFacebookPage() {
  document.getElementById('portfolio-items').style.display = 'none';
  document.getElementById('facebookPage').style.display = 'flex';
}

function photo() {
  document.getElementById('portfolio-items').style.display = 'block';
  document.getElementById('facebookPage').style.display = 'none';
}
