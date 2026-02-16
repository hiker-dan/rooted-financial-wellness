/*
 * Scroll Animations
 *
 * Handles fade-in animations for elements as they scroll into view
 * Uses Intersection Observer for performance
 */

// ============================================
// FADE-IN ON SCROLL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Select all elements with .animate-on-scroll class
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  // Check if there are elements to animate
  if (animateElements.length === 0) return;

  // Intersection Observer options
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Start animation slightly before element enters viewport
  };

  // Create the Intersection Observer
  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add fade-in class when element is visible
        entry.target.classList.add('fade-in');

        // Optional: Stop observing after animation (performance optimization)
        // Comment out this line if you want animations to repeat on scroll up
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animate-on-scroll elements
  animateElements.forEach(element => {
    observer.observe(element);
  });
});

// ============================================
// STAGGERED ANIMATION (Optional Enhancement)
// ============================================

/*
 * If you want sequential animations for grouped elements,
 * you can add delay classes like this:
 */

document.addEventListener('DOMContentLoaded', function() {
  const animateGroups = document.querySelectorAll('.animate-group');

  animateGroups.forEach(group => {
    const children = group.querySelectorAll('.animate-on-scroll');

    children.forEach((child, index) => {
      // Add incremental delay to each child
      child.style.transitionDelay = `${index * 100}ms`;
    });
  });
});

// ============================================
// REDUCED MOTION SUPPORT
// ============================================

/*
 * Respect user's motion preferences
 * If user has "prefers-reduced-motion" enabled,
 * disable all animations
 */

document.addEventListener('DOMContentLoaded', function() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    // Remove animation classes
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
      element.classList.remove('animate-on-scroll');
      element.style.opacity = '1';
    });
  }
});
