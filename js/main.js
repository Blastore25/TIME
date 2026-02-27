(function () {
  'use strict';

  var STORAGE_LANG = 'time-lang';
  var currentLang = localStorage.getItem(STORAGE_LANG) || document.documentElement.lang || 'es';

  function closeMenu() {
    var nav = document.getElementById('nav-main');
    if (nav) nav.classList.remove('is-open');
  }

  function applyLang() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-es][data-en]').forEach(function (el) {
      el.textContent = el.getAttribute('data-' + currentLang) || el.textContent;
    });
    var btn = document.querySelector('.lang-toggle');
    if (btn) btn.textContent = currentLang === 'es' ? 'EN' : 'ES';
  }

  function toggleLang() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem(STORAGE_LANG, currentLang);
    applyLang();
  }

  function setActiveNav() {
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    var file = path.split('/').pop() || 'index.html';
    if (file === '' || file === 'index.html') file = 'index.html';
    document.querySelectorAll('.nav-main a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var linkFile = href.replace(/^\//, '') || 'index.html';
      if (linkFile === file || (file === 'index.html' && (linkFile === '' || linkFile === 'index.html'))) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLang();

    var menuBtn = document.querySelector('.menu-btn');
    var nav = document.getElementById('nav-main');
    if (menuBtn && nav) {
      menuBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        nav.classList.toggle('is-open');
      });
    }
    document.querySelectorAll('.nav-main a').forEach(function (a) {
      a.addEventListener('click', function () { closeMenu(); });
    });
    var langBtn = document.querySelector('.lang-toggle');
    if (langBtn) langBtn.addEventListener('click', toggleLang);

    document.querySelectorAll('.logo-video').forEach(function (video) {
      video.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var link = video.closest('a');
        window.location.href = (link && link.getAttribute('href')) || 'index.html';
      });
    });

    document.addEventListener('click', function (e) {
      if (!nav || !nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || (menuBtn && menuBtn.contains(e.target))) return;
      closeMenu();
    });

    setActiveNav();
    initCarousels();
    initScrollAnimations();
    initSplashIntro();
  });

  function initSplashIntro() {
    if (!document.body.classList.contains('page-inicio')) return;
    var splash = document.getElementById('splash-intro');
    var logo = splash && splash.querySelector('.splash-intro__logo');
    if (!splash) return;
    var splashHidden = false;
    function hideSplash() {
      if (splashHidden) return;
      splashHidden = true;
      document.body.classList.remove('splash-active');
      document.body.classList.add('page-reveal');
      splash.classList.add('splash-intro--done');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          document.body.classList.add('reveal-done');
        });
      });
      setTimeout(function () {
        splash.style.display = 'none';
      }, 2100);
    }
    if (logo) {
      logo.addEventListener('animationend', hideSplash);
    }
    setTimeout(hideSplash, 5000);
  }

  function initCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
      var track = carousel.querySelector('.carousel-track');
      var slides = carousel.querySelectorAll('.carousel-slide');
      var dots = carousel.querySelectorAll('.carousel-dot');
      
      if (!track || slides.length === 0) return;

      var currentIndex = 0;
      var autoplayInterval = null;
      var isDragging = false;
      var startX = 0;
      var currentTranslate = 0;
      var prevTranslate = 0;

      function goToSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        track.style.transform = 'translateX(' + (-currentIndex * 100) + '%)';
        
        dots.forEach(function (dot, i) {
          dot.classList.toggle('active', i === currentIndex);
        });
      }

      function nextSlide() {
        goToSlide(currentIndex + 1);
      }

      function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, 3000);
      }

      function stopAutoplay() {
        if (autoplayInterval) {
          clearInterval(autoplayInterval);
          autoplayInterval = null;
        }
      }

      dots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
          goToSlide(index);
          stopAutoplay();
          startAutoplay();
        });
      });

      function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
      }

      function dragStart(event) {
        isDragging = true;
        startX = getPositionX(event);
        carousel.style.cursor = 'grabbing';
        stopAutoplay();
        track.style.transition = 'none';
      }

      function dragMove(event) {
        if (!isDragging) return;
        event.preventDefault();
        var currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startX;
        track.style.transform = 'translateX(' + (currentTranslate - currentIndex * carousel.offsetWidth) + 'px)';
      }

      function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        carousel.style.cursor = 'grab';
        track.style.transition = 'transform 0.4s ease-in-out';
        
        var movedBy = currentTranslate - prevTranslate;
        
        if (movedBy < -50 && currentIndex < slides.length - 1) {
          currentIndex += 1;
        } else if (movedBy > 50 && currentIndex > 0) {
          currentIndex -= 1;
        }
        
        prevTranslate = currentTranslate;
        goToSlide(currentIndex);
        startAutoplay();
      }

      carousel.addEventListener('mousedown', dragStart);
      carousel.addEventListener('mousemove', dragMove);
      carousel.addEventListener('mouseup', dragEnd);
      carousel.addEventListener('mouseleave', dragEnd);

      carousel.addEventListener('touchstart', dragStart);
      carousel.addEventListener('touchmove', dragMove);
      carousel.addEventListener('touchend', dragEnd);

      goToSlide(0);
      startAutoplay();

      carousel.addEventListener('mouseenter', stopAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);
    });
  }

  function initScrollAnimations() {
    var cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
      card.classList.add('animate-on-scroll');
    });

    var animated = document.querySelectorAll('.animate-on-scroll');
    if (animated.length === 0) return;

    var observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.15
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var el = entry.target;
        var rootHeight = (entry.rootBounds && entry.rootBounds.height) ? entry.rootBounds.height : window.innerHeight;
        var top = entry.boundingClientRect.top;
        var bottom = entry.boundingClientRect.bottom;

        if (entry.isIntersecting) {
          if (top < rootHeight / 2) {
            el.classList.add('animate-from-top');
            el.classList.remove('animate-from-bottom');
          } else {
            el.classList.add('animate-from-bottom');
            el.classList.remove('animate-from-top');
          }
          el.classList.add('is-visible');
        } else {
          el.classList.remove('is-visible');
          if (bottom < 0) {
            el.classList.add('animate-from-top');
            el.classList.remove('animate-from-bottom');
          } else {
            el.classList.add('animate-from-bottom');
            el.classList.remove('animate-from-top');
          }
        }
      });
    }, observerOptions);

    animated.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
