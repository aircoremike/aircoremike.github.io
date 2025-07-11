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

    // Simple hero positioning - just use a fixed margin that works
    function adjustHeroPosition() {
      const heroFlex = document.querySelector('.hero-flex');
      const heroImg = document.querySelector('.hero-img');
      if (heroFlex) {
        // Use simple, reliable fixed values based on device type
        if (window.innerWidth <= 768) {
          heroFlex.style.marginTop = '80px'; // Mobile
        } else {
          heroFlex.style.marginTop = '160px'; // Desktop/tablet
        }
        
        // DEBUG: Add red borders to see what's happening
        if (heroFlex) heroFlex.style.border = '3px solid red';
        if (heroImg) heroImg.style.border = '3px solid blue';
        
        // Log current navbar info for debugging
        const navbar = document.querySelector('.navbar');
        if (navbar) {
          const navbarRect = navbar.getBoundingClientRect();
          console.log('DEBUG: Navbar info:', {
            height: navbarRect.height,
            top: navbarRect.top,
            bottom: navbarRect.bottom,
            heroMarginTop: heroFlex.style.marginTop,
            windowWidth: window.innerWidth
          });
        }
        
        // Handle window resize
        if (!heroFlex.dataset.resizeListenerAdded) {
          heroFlex.dataset.resizeListenerAdded = 'true';
          window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
              heroFlex.style.marginTop = '80px';
            } else {
              heroFlex.style.marginTop = '160px';
            }
          });
        }
      }
    }
    
    // Call immediately and with fallbacks
    adjustHeroPosition();
    setTimeout(adjustHeroPosition, 100);

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

    // Simple shrinking navbar - desktop/landscape only
    const navbar = document.querySelector('.navbar');
    let hasShrunk = false;

    // DEBUG: Add border to navbar
    if (navbar) navbar.style.border = '3px solid green';

    function isDesktopOrLandscapeTablet() {
      return window.matchMedia('(min-width: 769px), (min-width: 1025px) and (orientation: landscape)').matches;
    }

    function handleNavbarShrink() {
      if (!navbar || !isDesktopOrLandscapeTablet()) {
        // Remove shrink on mobile/tablet portrait
        if (navbar) navbar.classList.remove('navbar-shrink');
        document.body.classList.remove('navbar-shrink');
        hasShrunk = false;
        return;
      }

      if (window.scrollY > 10 && !hasShrunk) {
        navbar.classList.add('navbar-shrink');
        document.body.classList.add('navbar-shrink');
        hasShrunk = true;
        
        // DEBUG: Log navbar info when shrinking
        setTimeout(() => {
          const navbarRect = navbar.getBoundingClientRect();
          console.log('DEBUG: Navbar SHRUNK:', {
            height: navbarRect.height,
            bottom: navbarRect.bottom,
            scrollY: window.scrollY
          });
        }, 350);
        
      } else if (window.scrollY <= 10 && hasShrunk) {
        navbar.classList.remove('navbar-shrink');
        document.body.classList.remove('navbar-shrink');
        hasShrunk = false;
        
        // DEBUG: Log navbar info when expanding
        setTimeout(() => {
          const navbarRect = navbar.getBoundingClientRect();
          console.log('DEBUG: Navbar EXPANDED:', {
            height: navbarRect.height,
            bottom: navbarRect.bottom,
            scrollY: window.scrollY
          });
        }, 350);
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
    // Exclude the first body section from scroll-based fade-in
    document.querySelectorAll('.section-fade:not(.body-flex)').forEach(function(el) {
      observer.observe(el);
    });
  }
  
  function animateHeroTitle() {
    var heroTitle = document.querySelector('.hero-flex h1');
    if (heroTitle) {
      // Delay the animation slightly for a nice effect
      setTimeout(() => {
        heroTitle.classList.add('hero-title-visible');
        // After h1 animation completes, wait 1 second then animate first body section
        setTimeout(() => {
          animateFirstBodySection();
        }, 1000);
      }, 300);
    }
  }
  
  function animateFirstBodySection() {
    var firstBodySection = document.querySelector('.body-flex');
    if (firstBodySection) {
      firstBodySection.classList.add('section-fade-visible');
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    var heroImg = document.querySelector('.hero-img');
    if (heroImg && !heroImg.complete) {
      heroImg.addEventListener('load', function() {
        animateHeroTitle();
        enableSectionFade();
      });
    } else {
      // Image already loaded or doesn't exist
      animateHeroTitle();
      enableSectionFade();
    }
  });
})();

// Carousel functionality - Pixel-perfect rewrite
(function() {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const arrowLeft = document.getElementById('carouselArrowLeft');
  const arrowRight = document.getElementById('carouselArrowRight');
  
  if (!track || slides.length === 0) return;
  
  let currentIndex = 0;
  const totalSlides = slides.length;
  
  // Check if mobile/tablet portrait
  function isMobile() {
    return window.innerWidth <= 700 || 
           (window.innerWidth <= 1024 && window.matchMedia('(orientation: portrait)').matches);
  }
  
  // Get precise measurements from the DOM
  function getSlideMetrics() {
    if (slides.length === 0) return null;
    
    const slideRect = slides[0].getBoundingClientRect();
    const slideWidth = slideRect.width;
    
    // Get actual gap from computed styles
    const trackStyle = window.getComputedStyle(track);
    const gap = parseFloat(trackStyle.gap || trackStyle.columnGap || '0');
    
    console.log('CSS gap from computed style:', trackStyle.gap, 'parsed:', gap);
    
    // For mobile, use viewport width as container (slides should overflow)
    // For desktop, use the actual carousel container width
    let containerWidth;
    if (isMobile()) {
      containerWidth = window.innerWidth; // Mobile: slides overflow viewport
    } else {
      containerWidth = track.parentElement.getBoundingClientRect().width; // Desktop: contained
    }
    
    return {
      slideWidth,
      gap,
      containerWidth,
      slideWithGap: slideWidth + gap
    };
  }
  
  // Calculate exact pixel position for a slide
  function calculatePosition(index) {
    const metrics = getSlideMetrics();
    if (!metrics) return 0;
    
    // Position to center the slide at index
    const slideOffset = index * metrics.slideWithGap;
    const centerOffset = (metrics.containerWidth - metrics.slideWidth) / 2;
    const finalPosition = centerOffset - slideOffset;
    
    console.log(`Calculate position for slide ${index}:`, {
      slideWidth: metrics.slideWidth,
      gap: metrics.gap,
      containerWidth: metrics.containerWidth,
      slideWithGap: metrics.slideWithGap,
      slideOffset: slideOffset,
      centerOffset: centerOffset,
      finalPosition: finalPosition
    });
    
    return finalPosition;
  }
  
  // Move to specific slide
  function goToSlide(index, skipTransition = false) {
    // Clamp index to valid range
    currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
    
    // Calculate exact pixel position
    const position = calculatePosition(currentIndex);
    console.log(`Going to slide ${currentIndex}, position: ${position}px`);
    
    // Temporarily disable transition if requested (for initial load)
    if (skipTransition) {
      track.style.transition = 'none';
    }
    
    track.style.transform = `translateX(${position}px)`;
    
    // Re-enable transition after the transform is applied
    if (skipTransition) {
      requestAnimationFrame(() => {
        track.style.transition = '';
      });
    }
    
    updateArrows();
  }
  
  // Update arrow states
  function updateArrows() {
    if (arrowLeft) arrowLeft.disabled = currentIndex === 0;
    if (arrowRight) arrowRight.disabled = currentIndex === totalSlides - 1;
  }
  
  // Navigation functions
  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      goToSlide(currentIndex + 1);
    }
  }
  
  function prevSlide() {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  }
  
  // Arrow click handlers
  if (arrowLeft) {
    arrowLeft.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
    });
  }
  
  if (arrowRight) {
    arrowRight.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
    });
  }
  
  // Touch/swipe and mouse drag handling
  const carouselContainer = track.parentElement.parentElement;
  let isInteracting = false;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  
  function handleStart(e) {
    if (e.touches && e.touches.length > 1) return; // Multi-touch
    
    isInteracting = true;
    isDragging = false;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    currentX = startX;
  }
  
  function handleMove(e) {
    if (!isInteracting) return;
    if (e.touches && e.touches.length > 1) return;
    
    currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = Math.abs(currentX - startX);
    
    // Mark as dragging if moved enough
    if (deltaX > 5) {
      isDragging = true;
    }
    
    // Prevent scrolling on touch devices during horizontal swipe
    if (e.touches && deltaX > 10) {
      e.preventDefault();
    }
  }
  
  function handleEnd(e) {
    if (!isInteracting) return;
    
    const deltaX = currentX - startX;
    const threshold = 50; // Minimum swipe distance
    
    if (isDragging && Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        prevSlide(); // Swipe right = previous
      } else {
        nextSlide(); // Swipe left = next
      }
    }
    
    isInteracting = false;
    isDragging = false;
    startX = 0;
    currentX = 0;
  }
  
  // Desktop click navigation (left/right sides)
  function handleClick(e) {
    // Don't navigate if we were dragging or on a touch device
    if (isDragging || isTouchDevice()) return;
    
    // Don't navigate if clicking on interactive elements
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    
    const rect = carouselContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const isLeftHalf = clickX < rect.width / 2;
    
    if (isLeftHalf) {
      prevSlide();
    } else {
      nextSlide();
    }
  }
  
  // Event listeners
  carouselContainer.addEventListener('mousedown', handleStart);
  carouselContainer.addEventListener('mousemove', handleMove);
  carouselContainer.addEventListener('mouseup', handleEnd);
  carouselContainer.addEventListener('mouseleave', handleEnd);
  carouselContainer.addEventListener('touchstart', handleStart, { passive: false });
  carouselContainer.addEventListener('touchmove', handleMove, { passive: false });
  carouselContainer.addEventListener('touchend', handleEnd);
  carouselContainer.addEventListener('click', handleClick);
  
  // Resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Recalculate position for current slide with new dimensions
      // Wait for layout to settle after resize
      requestAnimationFrame(() => {
        goToSlide(currentIndex);
      });
    }, 100);
  });
  
  // Initialize
  function init() {
    currentIndex = 0;
    console.log('Carousel init - Mobile:', isMobile(), 'Window width:', window.innerWidth);
    console.log('Track initial transform:', track.style.transform);
    
    // Ensure layout is ready before positioning
    requestAnimationFrame(() => {
      // Double-check that we have proper measurements
      const metrics = getSlideMetrics();
      console.log('Init metrics:', metrics);
      
      if (metrics && metrics.slideWidth > 0) {
        goToSlide(0, true); // Skip transition on initial load
      } else {
        // If measurements aren't ready, try again shortly
        setTimeout(() => {
          console.log('Retrying init with metrics:', getSlideMetrics());
          goToSlide(0, true); // Skip transition on initial load
        }, 100);
      }
    });
  }
  
  // Start after DOM is ready and styles are applied
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // Give extra time for CSS to load and apply
    setTimeout(init, 100);
  }
})();

// Apple-style Modal System
(function() {
  let currentModal = null;
  let imagesPreloaded = false;
  
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

  // Preload all modal images in the background
  function preloadModalImages() {
    if (imagesPreloaded) return;
    
    console.log('Preloading modal images...');
    const allImageUrls = new Set();
    
    // Collect all unique image URLs from all modals
    Object.values(modalData).forEach(data => {
      allImageUrls.add(data.heroImage);
      data.images.forEach(img => allImageUrls.add(img));
    });
    
    let loadedCount = 0;
    const totalImages = allImageUrls.size;
    
    // Preload each image
    allImageUrls.forEach(url => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loadedCount++;
        console.log(`Preloaded ${loadedCount}/${totalImages}: ${url}`);
        if (loadedCount === totalImages) {
          imagesPreloaded = true;
          console.log('All modal images preloaded successfully');
        }
      };
      img.src = url;
    });
  }

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
    
    // If images are preloaded, show modal immediately
    // Otherwise, wait for images to load (fallback for edge cases)
    if (imagesPreloaded) {
      console.log('Images already preloaded, showing modal immediately');
      requestAnimationFrame(() => {
        modal.classList.add('modal-opening');
        setTimeout(() => {
          modal.classList.remove('modal-opening');
          modal.classList.add('modal-visible');
        }, parseInt(getComputedStyle(document.documentElement).getPropertyValue('--modal-open-duration')) || 750);
      });
    } else {
      console.log('Images not preloaded, waiting for load...');
      // Fallback: wait for images to load (same as before)
      const images = modal.querySelectorAll('img');
      let loadedImages = 0;
      const totalImages = images.length;
      
      function checkAllImagesLoaded() {
        loadedImages++;
        if (loadedImages === totalImages) {
          requestAnimationFrame(() => {
            modal.classList.add('modal-opening');
            setTimeout(() => {
              modal.classList.remove('modal-opening');
              modal.classList.add('modal-visible');
            }, parseInt(getComputedStyle(document.documentElement).getPropertyValue('--modal-open-duration')) || 750);
          });
        }
      }
      
      if (totalImages === 0) {
        requestAnimationFrame(() => {
          modal.classList.add('modal-opening');
          setTimeout(() => {
            modal.classList.remove('modal-opening');
            modal.classList.add('modal-visible');
          }, parseInt(getComputedStyle(document.documentElement).getPropertyValue('--modal-open-duration')) || 750);
        });
      } else {
        images.forEach(img => {
          if (img.complete) {
            checkAllImagesLoaded();
          } else {
            img.addEventListener('load', checkAllImagesLoaded);
            img.addEventListener('error', checkAllImagesLoaded);
          }
        });
      }
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

  // Start preloading images after page load
  // Use a slight delay to not interfere with initial page rendering
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(preloadModalImages, 1000); // Wait 1 second after DOM ready
    });
  } else {
    setTimeout(preloadModalImages, 1000); // Page already loaded, start in 1 second
  }
})();

// Utility function for touch device detection
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}