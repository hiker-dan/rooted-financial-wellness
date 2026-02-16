/*
 * Scroll Animations (Progressive Enhancement)
 *
 * Content is ALWAYS visible by default.
 * This script adds a .js-ready class to <html> to signal that
 * animations are set up, only THEN do elements hide and fade in.
 * If this script fails for any reason, all content remains visible.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Respect user's motion preferences
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    // Don't add .js-ready, so all content stays fully visible
    return;
  }

  // Check for IntersectionObserver support
  if (!('IntersectionObserver' in window)) {
    // Old browser - keep content visible
    return;
  }

  // Select all elements with .animate-on-scroll class
  var animateElements = document.querySelectorAll('.animate-on-scroll');
  if (animateElements.length === 0) return;

  // Signal to CSS that animations are ready
  // This is what allows .animate-on-scroll elements to start hidden
  document.documentElement.classList.add('js-ready');

  // Create the Intersection Observer
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // Add visible class to trigger the CSS transition
        entry.target.classList.add('visible');
        // Stop watching this element
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
  });

  // Small delay to let the browser paint first, then observe
  requestAnimationFrame(function() {
    animateElements.forEach(function(element) {
      observer.observe(element);
    });
  });
});
