// This script highlights the nav link based on the section in view
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
  
    // Use the Intersection Observer API to track sections in view
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5
    };
  
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
  
    sections.forEach((section) => {
      observer.observe(section);
    });
  
    function handleIntersect(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove active class from all links
          navLinks.forEach((link) => link.classList.remove("active"));
          // Add active class to the current link
          const id = entry.target.getAttribute("id");
          const currentLink = document.querySelector(`nav a[href="#${id}"]`);
          if (currentLink) {
            currentLink.classList.add("active");
          }
        }
      });
    }
  });
  