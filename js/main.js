(function () {
  'use strict';

  var currentLang = document.documentElement.lang || 'es';

  function openMenu() {
    var nav = document.getElementById('nav-main');
    if (nav) nav.classList.add('is-open');
  }

  function closeMenu() {
    var nav = document.getElementById('nav-main');
    if (nav) nav.classList.remove('is-open');
  }

  function toggleLang() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-es][data-en]').forEach(function (el) {
      el.textContent = el.getAttribute('data-' + currentLang) || el.textContent;
    });
    var btn = document.querySelector('.lang-toggle');
    if (btn) btn.textContent = currentLang === 'es' ? 'EN' : 'ES';
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
    var menuBtn = document.querySelector('.menu-btn');
    var nav = document.getElementById('nav-main');
    if (menuBtn && nav) {
      menuBtn.addEventListener('click', function () { nav.classList.toggle('is-open'); });
    }
    document.querySelectorAll('.nav-main a').forEach(function (a) {
      a.addEventListener('click', function () { closeMenu(); });
    });
    var langBtn = document.querySelector('.lang-toggle');
    if (langBtn) {
      langBtn.textContent = currentLang === 'es' ? 'EN' : 'ES';
      langBtn.addEventListener('click', toggleLang);
    }
    setActiveNav();
  });
})();
