document.addEventListener('DOMContentLoaded', function() {
  // Navbar and mobile menu logic, now as a function for re-initialization after navbar injection
  window.initNavbarScripts = function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    if (menuToggle && mobileNav) {
      menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('open');
      });
    }

    // Active link underline for nav links
    function setActiveNavLink(link) {
      document.querySelectorAll('.nav-links li a, .mobile-nav li a').forEach(a => {
        a.classList.remove('active-link');
      });
      if (link) link.classList.add('active-link');
    }

    // Set active link on page load based on URL only
    function setActiveLinkByUrl() {
      const path = window.location.pathname;
      const isHome = path === '/' || path.endsWith('/index.html');
      let found = false;
      document.querySelectorAll('.nav-links li a, .mobile-nav li a').forEach(link => {
        const href = link.getAttribute('href');
        // For Home, match href="#", href="index.html", or href="/"
        if (
          (isHome && (href === '#' || href === 'index.html' || href === '/' || href === './' || href === './index.html')) ||
          (!isHome && href && (href === path.split('/').pop() || href === '#' + path.split('/').pop().replace('.html', '')))
        ) {
          link.classList.add('active-link');
          found = true;
        } else {
          link.classList.remove('active-link');
        }
      });
      // If no match, default to first nav link
      if (!found) {
        const first = document.querySelector('.nav-links li a, .mobile-nav li a');
        if (first) first.classList.add('active-link');
      }
    }
    setActiveLinkByUrl();

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

    // Smooth scroll to anchor with navbar offset
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

    // Logo click always goes home
    var logoLink = document.querySelector('.logo a');
    if (logoLink) {
      logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'index.html';
      });
    }
  };

  // Initial call to navbar scripts
  window.initNavbarScripts();
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
    
  });
})();

// Global: Always navigate to index.html when clicking the logo in the navbar
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var logoLink = document.querySelector('.logo a');
    if (logoLink) {
      logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'index.html';
      });
    }
  });
})();

// =====================
// Modal System (modular, scroll lock, BEM, animation)
// =====================
(function() {
  const modals = Array.from(document.querySelectorAll('.modal'));
  const triggers = Array.from(document.querySelectorAll('[data-modal-target]'));
  let openModals = 0;
  let lastScrollY = 0;
  let lastScrollX = 0;

  // Helper: Lock body scroll and preserve scroll position
  function lockBodyScroll() {
    if (openModals === 0) {
      lastScrollY = window.scrollY;
      lastScrollX = window.scrollX;
      document.body.classList.add('modal-open');
      document.body.style.top = `-${lastScrollY}px`;
      document.body.style.left = `-${lastScrollX}px`;
      document.body.style.right = '0';
      document.body.style.position = 'fixed';
      document.body.style.width = '100vw';
    }
    openModals++;
  }

  // Helper: Unlock body scroll and restore scroll position
  function unlockBodyScroll() {
    openModals = Math.max(0, openModals - 1);
    if (openModals === 0) {
      document.body.classList.remove('modal-open');
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo(lastScrollX, lastScrollY);
    }
  }

  // Open modal by id
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    if (modal.classList.contains('modal--open')) return;
    lockBodyScroll();
    modal.classList.remove('modal--closed');
    modal.classList.add('modal--open');
    // Animate in
    requestAnimationFrame(() => {
      modal.classList.add('modal--animating-in');
      modal.classList.remove('modal--animating-out');
      setTimeout(() => {
        modal.classList.remove('modal--animating-in');
      }, 350);
    });
  }

  // Close modal by element
  function closeModal(modal) {
    if (!modal.classList.contains('modal--open')) return;
    modal.classList.remove('modal--open');
    modal.classList.add('modal--animating-out');
    setTimeout(() => {
      modal.classList.remove('modal--animating-out');
      modal.classList.add('modal--closed');
      unlockBodyScroll();
    }, 350);
  }

  // Click triggers
  triggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      const target = trigger.getAttribute('data-modal-target');
      if (target) openModal(target);
    });
  });

  // Overlay and close button logic
  modals.forEach(modal => {
    // Overlay click
    const overlay = modal.querySelector('.modal__overlay');
    if (overlay) {
      overlay.addEventListener('click', function(e) {
        closeModal(modal);
      });
    }
    // Close button
    const closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        closeModal(modal);
      });
    }
    // Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('modal--open')) {
        closeModal(modal);
      }
    });
  });

  // Prevent background scroll on touch devices (iOS overscroll fix)
  modals.forEach(modal => {
    const container = modal.querySelector('.modal__container');
    if (!container) return;
    container.addEventListener('touchmove', function(e) {
      // Allow scroll only inside modal__container
      e.stopPropagation();
    }, { passive: false });
    modal.addEventListener('touchmove', function(e) {
      // Prevent scroll on overlay
      if (e.target === modal) e.preventDefault();
    }, { passive: false });
  });

  // Expose for manual control if needed
  window.ModalSystem = {
    open: openModal,
    close: closeModal
  };
})();