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

// Carousel functionality
(function() {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const arrowLeft = document.getElementById('carouselArrowLeft');
  const arrowRight = document.getElementById('carouselArrowRight');
  let current = 0;
  const slideCount = slides.length;

  function goToSlide(idx) {
    current = idx;
    
    if (
      window.innerWidth <= 700 ||
      (window.innerWidth <= 1024 && window.matchMedia('(orientation: portrait)').matches)
    ) {
      // Mobile: slides are 80vw wide with 1rem gaps
      const slideWidth = 80; // vw
      const gapSize = 1 * 100 / window.innerWidth * 16; // Convert 1rem to vw
      const viewportWidth = 100; // vw
      
      // Calculate the position to center the current slide
      const centerPosition = (viewportWidth - slideWidth) / 2;
      const slideOffset = current * (slideWidth + gapSize);
      const translate = centerPosition - slideOffset;
      
      track.style.transform = `translateX(${translate}vw)`;
    } else {
      // Desktop: slides are 33.33vw wide with 2rem gaps
      const slideWidth = 33.33; // vw
      const gapSize = 2 * 100 / window.innerWidth * 16; // Convert 2rem to vw
      const viewportWidth = 100; // vw
      
      // Calculate the position to center the current slide
      const centerPosition = (viewportWidth - slideWidth) / 2;
      const slideOffset = current * (slideWidth + gapSize);
      const translate = centerPosition - slideOffset;
      
      track.style.transform = `translateX(${translate}vw)`;
    }
    updateArrows();
  }

  function updateArrows() {
    if (!arrowLeft || !arrowRight) return;
    arrowLeft.disabled = current === 0;
    arrowRight.disabled = current === slideCount - 1;
  }

  // Initialize carousel
  function initCarousel() {
    goToSlide(0);
  }

  if (arrowLeft && arrowRight) {
    arrowLeft.addEventListener('click', function(e) {
      e.stopPropagation();
      if (current > 0) goToSlide(current - 1);
    });
    arrowRight.addEventListener('click', function(e) {
      e.stopPropagation();
      if (current < slideCount - 1) goToSlide(current + 1);
    });
  }

  // Touch/click navigation
  let startX = null;
  let endX = null;
  let dragging = false;
  let isTouch = false;

  // Use the carousel container for touch events
  const carouselContainer = track.parentElement.parentElement;

  function onTouchStart(e) {
    if (e.touches && e.touches.length > 1) return; // Only single-finger
    dragging = true;
    isTouch = !!e.touches;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    endX = startX;
  }
  function onTouchMove(e) {
    if (!dragging) return;
    if (e.touches && e.touches.length > 1) return;
    endX = e.touches ? e.touches[0].clientX : e.clientX;
    // Prevent vertical scroll if horizontal swipe is detected
    if (isTouch && Math.abs(endX - startX) > 10) {
      e.preventDefault();
    }
  }
  function onTouchEnd(e) {
    if (!dragging || startX === null || endX === null) return;
    const dx = endX - startX;
    if (Math.abs(dx) > 50) {
      if (dx < 0 && current < slideCount - 1) goToSlide(current + 1);
      else if (dx > 0 && current > 0) goToSlide(current - 1);
    }
    dragging = false;
    startX = null;
    endX = null;
    isTouch = false;
  }

  // Click for desktop: left side goes back, right side goes forward
  function onClick(e) {
    if (isTouchDevice()) return;
    // Don't advance if clicking on a button or interactive element
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    
    // Get click position relative to the carousel container
    const rect = carouselContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const containerWidth = rect.width;
    const isLeftSide = clickX < containerWidth / 2;
    
    if (isLeftSide && current > 0) {
      // Clicked on left side - go to previous slide
      goToSlide(current - 1);
    } else if (!isLeftSide && current < slideCount - 1) {
      // Clicked on right side - go to next slide
      goToSlide(current + 1);
    }
  }

  // Remove old listeners from track
  track.removeEventListener('mousedown', onTouchStart);
  track.removeEventListener('mousemove', onTouchMove);
  track.removeEventListener('mouseup', onTouchEnd);
  track.removeEventListener('mouseleave', onTouchEnd);
  track.removeEventListener('touchstart', onTouchStart);
  track.removeEventListener('touchmove', onTouchMove);
  track.removeEventListener('touchend', onTouchEnd);
  track.removeEventListener('click', onClick);

  // Add listeners to carousel container
  carouselContainer.addEventListener('mousedown', onTouchStart);
  carouselContainer.addEventListener('mousemove', onTouchMove);
  carouselContainer.addEventListener('mouseup', onTouchEnd);
  carouselContainer.addEventListener('mouseleave', onTouchEnd);
  carouselContainer.addEventListener('touchstart', onTouchStart, { passive: false });
  carouselContainer.addEventListener('touchmove', onTouchMove, { passive: false });
  carouselContainer.addEventListener('touchend', onTouchEnd);
  carouselContainer.addEventListener('click', onClick);

  // Init with delay to ensure CSS is fully loaded
  if (track && slides.length > 0) {
    // Small delay to ensure proper initialization after CSS loads
    setTimeout(() => {
      initCarousel();
    }, 50);
    
    // Re-center on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        goToSlide(current); // Re-apply current slide position with new dimensions
      }, 100);
    });
  }
})();

// Apple-style Modal System
(function() {
  let currentModal = null;
  
  // Modal data for each material
  const modalData = {
    stainless: {
      title: "Stainless Steel",
      heroImage: "assets/ball-transfer-unit.png",
      images: [
        "assets/c5-galaxy_1280.jpg",
        "assets/c17-globemaster-iii_1280.jpg", 
        "assets/pallet-drop_1280.jpg"
      ],
      description: `Stainless steel hollow balls represent the pinnacle of engineering excellence in precision bearing applications. Our proprietary manufacturing process creates seamless, perfectly spherical components that deliver exceptional performance in the most demanding environments.

The superior corrosion resistance of stainless steel makes these hollow balls ideal for aerospace, marine, and industrial applications where environmental factors would compromise lesser materials. Each ball undergoes rigorous quality control testing to ensure dimensional accuracy and surface finish that meets the exacting standards of modern precision machinery.

With their lightweight construction and remarkable durability, stainless steel hollow balls provide an optimal balance of strength, weight reduction, and longevity that traditional solid bearings simply cannot match.`
    }
  };

  function createModal(materialType) {
    const data = modalData[materialType];
    if (!data) return;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-container">
        <div class="modal-header">
          <h1>${data.title}</h1>
          <button class="modal-close" aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div class="modal-content">
          <div class="modal-hero">
            <img src="${data.heroImage}" alt="${data.title}" class="modal-hero-image">
          </div>
          <div class="modal-body">
            <div class="modal-images">
              ${data.images.map(img => `
                <div class="modal-image-item">
                  <img src="${img}" alt="${data.title} application">
                </div>
              `).join('')}
            </div>
            <div class="modal-description">
              <p>${data.description}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    return modal;
  }

  function openModal(materialType) {
    if (currentModal) closeModal();
    
    const modal = createModal(materialType);
    if (!modal) return;
    
    currentModal = modal;
    
    // Calculate scrollbar width to prevent horizontal shifting
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Apply styles to prevent scrolling and shifting
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    
    // Also apply scrollbar compensation to navbar to prevent it from shifting
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.paddingRight = `${scrollbarWidth}px`;
    }
    
    document.body.appendChild(modal);
    
    // Wait for all images to load before animating
    const images = modal.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;
    
    function checkAllImagesLoaded() {
      loadedImages++;
      if (loadedImages === totalImages) {
        // All images loaded, now animate in
        requestAnimationFrame(() => {
          modal.classList.add('modal-opening');
          // After a brief moment, transition to visible state
          setTimeout(() => {
            modal.classList.remove('modal-opening');
            modal.classList.add('modal-visible');
          }, parseInt(getComputedStyle(document.documentElement).getPropertyValue('--modal-open-duration')) || 750);
        });
      }
    }
    
    if (totalImages === 0) {
      // No images to load, animate immediately
      requestAnimationFrame(() => {
        modal.classList.add('modal-opening');
        // After a brief moment, transition to visible state
        setTimeout(() => {
          modal.classList.remove('modal-opening');
          modal.classList.add('modal-visible');
        }, parseInt(getComputedStyle(document.documentElement).getPropertyValue('--modal-open-duration')) || 750);
      });
    } else {
      // Set up image loading listeners
      images.forEach(img => {
        if (img.complete) {
          checkAllImagesLoaded();
        } else {
          img.addEventListener('load', checkAllImagesLoaded);
          img.addEventListener('error', checkAllImagesLoaded); // Count errors as "loaded" to prevent hanging
        }
      });
    }
    
    // Close handlers
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    
    // Prevent scroll propagation to background
    modal.addEventListener('scroll', (e) => {
      e.stopPropagation();
    });
    
    // Prevent wheel events from affecting background when modal scroll reaches limits
    modal.addEventListener('wheel', (e) => {
      const { scrollTop, scrollHeight, clientHeight } = modal;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;
      
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
    }, { passive: false });
    
    // Also prevent touchmove events on mobile
    modal.addEventListener('touchmove', (e) => {
      const { scrollTop, scrollHeight, clientHeight } = modal;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;
      
      if ((isAtTop && e.touches[0].clientY > e.touches[0].startY) || 
          (isAtBottom && e.touches[0].clientY < e.touches[0].startY)) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  function closeModal() {
    if (!currentModal) return;
    
    // Start closing animation
    currentModal.classList.remove('modal-visible');
    currentModal.classList.add('modal-closing');
    
    // Wait for animation to complete before restoring scrollbar
    setTimeout(() => {
      // Remove modal-open classes and inline styles
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
      document.body.style.paddingRight = '';
      
      // Remove scrollbar compensation from navbar
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.style.paddingRight = '';
      }
      
      if (currentModal) {
        document.body.removeChild(currentModal);
        currentModal = null;
      }
    }, 500); // Use close duration (0.50s = 500ms)
  }

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentModal) {
      closeModal();
    }
  });

  // Global function to open modals
  window.openMaterialModal = openModal;
})();

// Utility function for touch device detection
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}