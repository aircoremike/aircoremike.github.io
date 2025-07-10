// Modular Modal System (BEM + state classes)
(function() {
  // Helper: lock/unlock background scroll
  function lockScroll() {
    document.body.style.overflow = 'hidden';
  }
  function unlockScroll() {
    document.body.style.overflow = '';
  }

  // Close all open modals
  function closeAllModals() {
    document.querySelectorAll('.modal').forEach(function(modal) {
      modal.classList.remove('modal--open');
      modal.classList.add('modal--closed');
      modal.setAttribute('aria-hidden', 'true');
    });
    unlockScroll();
  }

  // Open a specific modal by selector
  function openModal(modalSelector) {
    closeAllModals();
    var modal = document.querySelector(modalSelector);
    if (modal) {
      modal.classList.remove('modal--closed');
      modal.classList.add('modal--open');
      modal.setAttribute('aria-hidden', 'false');
      lockScroll();
    }
  }

  // Event delegation for modal triggers
  document.addEventListener('click', function(e) {
    var trigger = e.target.closest('[data-modal-target]');
    if (trigger) {
      var target = trigger.getAttribute('data-modal-target');
      if (target) {
        openModal(target);
        e.preventDefault();
      }
    }
  });

  // Overlay and close button logic
  document.addEventListener('click', function(e) {
    // Overlay click
    var overlay = e.target.classList.contains('modal__overlay') ? e.target : null;
    if (overlay) {
      closeAllModals();
    }
    // Close button
    var closeBtn = e.target.closest('.modal__close');
    if (closeBtn) {
      closeAllModals();
    }
  });

  // ESC key closes modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Only one modal open at a time (enforced by openModal)
  // Expose for future use
  window.ModalSystem = {
    open: openModal,
    closeAll: closeAllModals
  };
})();
