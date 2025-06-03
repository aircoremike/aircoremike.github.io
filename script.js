// Shrink header on scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }
  });
  
  // Toggle mobile nav
  document.querySelector(".hamburger").addEventListener("click", () => {
    document.getElementById("nav-menu").classList.toggle("show");
  });