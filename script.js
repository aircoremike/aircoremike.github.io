document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }

  // Navbar logo and header shrink on scroll
  const navbar = document.querySelector('.navbar');
  function handleNavbarShrink() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    // Dynamically update body padding to match navbar height
    const navbarHeight = navbar.offsetHeight;
    document.body.style.paddingTop = navbarHeight + 'px';
  }
  window.addEventListener('scroll', handleNavbarShrink);
  window.addEventListener('resize', handleNavbarShrink); // Ensure correct state on resize
  handleNavbarShrink(); // Run on load
});