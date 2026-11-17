(function () {
  'use strict';

  var header = document.querySelector('.header');
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  var links = document.querySelectorAll('.nav a[href^="#"]:not(.nav-cta)');

  // footer year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // header state on scroll
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // mobile menu
  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '✕' : '☰';
  }
  toggle.addEventListener('click', function () {
    setMenu(!nav.classList.contains('open'));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  // scroll reveal (added by JS, so the page stays visible without it)
  var targets = document.querySelectorAll(
    '.section-intro, .about-copy, .section-heading, .service-card, .portfolio-heading, .project, .process-grid > div, .contact-panel, .values-strip'
  );
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 3) * 90 + 'ms';
      io.observe(el);
    });
  }

  // active nav link on scroll
  var sections = Array.prototype.map.call(links, function (a) {
    return document.querySelector(a.getAttribute('href'));
  });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) spy.observe(s); });
  }

  // service card spotlight
  document.querySelectorAll('.service-card').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // hero parallax tilt (desktop only)
  var visual = document.querySelector('.hero-visual');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (visual && !reduce && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('pointermove', function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 18;
      var y = (e.clientY / window.innerHeight - 0.5) * 18;
      visual.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    });
  }
})();
