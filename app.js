/* ============================================================
   AI Tools Lab — app.js
   Theme toggle, scroll header, mobile nav, TOC highlight
   ============================================================ */

(function () {
  'use strict';

  // --- Force Light Theme ---
  const root = document.documentElement;
  root.setAttribute('data-theme', 'light');

  // --- Scroll Header Shadow ---
  var header = document.querySelector('.site-header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var scroll = window.scrollY;
      if (scroll > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = scroll;
    }, { passive: true });
  }

  // --- Mobile Nav ---
  var mobileToggle = document.querySelector('.mobile-nav-toggle');
  var mobileMenu = document.querySelector('.mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(!isOpen));
      mobileToggle.innerHTML = isOpen
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      });
    });
  }

  // --- TOC Active Highlighting ---
  var tocLinks = document.querySelectorAll('.toc-list a');
  if (tocLinks.length > 0) {
    var headings = [];
    tocLinks.forEach(function (link) {
      var id = link.getAttribute('href');
      if (id && id.startsWith('#')) {
        var el = document.getElementById(id.slice(1));
        if (el) headings.push({ el: el, link: link });
      }
    });

    function updateTOC() {
      var scrollY = window.scrollY + 120;
      var active = null;
      for (var i = headings.length - 1; i >= 0; i--) {
        if (headings[i].el.offsetTop <= scrollY) {
          active = headings[i];
          break;
        }
      }
      tocLinks.forEach(function (l) { l.classList.remove('active'); });
      if (active) active.link.classList.add('active');
    }

    window.addEventListener('scroll', updateTOC, { passive: true });
    updateTOC();
  }
})();
