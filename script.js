document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('open');
  });

  // Optional: Close menu when a link is clicked
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('open');
    });
  });

  // Shrinking navbar on scroll (desktop/landscape tablet only)
  const navbar = document.querySelector('.navbar');
  const logoImg = document.querySelector('.logo img');
  const mainContent = document.querySelector('.main-content');
  let hasShrunk = false;
  let lastScrollY = 0;

  // Helper: Only enable on desktop/landscape tablet
  function isDesktopOrLandscapeTablet() {
    return window.matchMedia('(min-width: 769px), (min-width: 1025px) and (orientation: landscape)').matches;
  }

  function handleNavbarShrink() {
    if (!isDesktopOrLandscapeTablet()) {
      // Remove shrink if resizing to mobile/tablet portrait
      navbar.classList.remove('navbar-shrink');
      document.body.classList.remove('navbar-shrink');
      if (mainContent) mainContent.classList.remove('navbar-shrink');
      hasShrunk = false;
      return;
    }
    if (window.scrollY > 10 && !hasShrunk) {
      navbar.classList.add('navbar-shrink');
      document.body.classList.add('navbar-shrink');
      if (mainContent) mainContent.classList.add('navbar-shrink');
      hasShrunk = true;
    } else if (window.scrollY <= 10 && hasShrunk) {
      navbar.classList.remove('navbar-shrink');
      document.body.classList.remove('navbar-shrink');
      if (mainContent) mainContent.classList.remove('navbar-shrink');
      hasShrunk = false;
    }
  }

  // Listen for scroll and resize
  window.addEventListener('scroll', handleNavbarShrink);
  window.addEventListener('resize', handleNavbarShrink);
  // Initial check
  handleNavbarShrink();
});

// Fade-in on scroll for .section-fade, but only after hero image loads
(function() {
  function onEntry(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-fade-visible');
        observer.unobserve(entry.target);
      }
    });
  }
  function enableSectionFade() {
    var observer = new window.IntersectionObserver(onEntry, {
      threshold: 0.15
    });
    document.querySelectorAll('.section-fade').forEach(function(el) {
      observer.observe(el);
    });
  }
  document.addEventListener('DOMContentLoaded', function() {
    var heroImg = document.querySelector('.hero-img');
    if (heroImg && !heroImg.complete) {
      heroImg.addEventListener('load', enableSectionFade);
    } else {
      enableSectionFade();
    }
  });
})();

// Smooth scroll to anchor with navbar offset
(function() {
  function getNavbarHeight() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return 0;
    var styles = window.getComputedStyle(navbar);
    return navbar.offsetHeight + parseInt(styles.marginTop || 0) + parseInt(styles.marginBottom || 0);
  }
  function scrollToHash(hash) {
    var el = document.getElementById(hash.replace('#', ''));
    if (!el) return;
    var navbarHeight = getNavbarHeight();
    var rect = el.getBoundingClientRect();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var top = rect.top + scrollTop - navbarHeight - 8; // 8px extra spacing
    window.scrollTo({ top: top, behavior: 'smooth' });
  }
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
      var hash = link.getAttribute('href');
      if (hash && hash.length > 1 && document.getElementById(hash.replace('#', ''))) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          scrollToHash(hash);
          // Update URL hash without jumping
          if (history.pushState) {
            history.pushState(null, null, hash);
          } else {
            window.location.hash = hash;
          }
        });
      }
    });
    // Logo click scrolls to #home with offset
    var logo = document.querySelector('.logo');
    if (logo) {
      logo.style.cursor = 'pointer';
      logo.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToHash('#home');
        if (history.pushState) {
          history.pushState(null, null, '#home');
        } else {
          window.location.hash = '#home';
        }
      });
    }
  });
})();