/**
 * Main Application Orchestrator
 * Sticky navigation, mobile menu, scroll progress, scroll reveal, back to top
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const navToggleBtn = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  if (navToggleBtn && navLinks) {
    navToggleBtn.addEventListener("click", () => {
      const isOpened = navLinks.classList.toggle("active");
      navToggleBtn.setAttribute("aria-expanded", isOpened);
      navToggleBtn.innerHTML = isOpened ? `
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      ` : `
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      `;
    });

    // Close menu when clicking outside or link
    document.addEventListener("click", (e) => {
      if (!navToggleBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        navToggleBtn.setAttribute("aria-expanded", "false");
        navToggleBtn.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  }

  // 2. Active Link Highlighting
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav-link");
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  // 3. Scroll Progress & Sticky Nav & Back to Top
  const nav = document.querySelector(".site-nav");
  const scrollProgress = document.getElementById("scroll-progress");
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / (docHeight || 1)) * 100;

    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    if (nav) {
      if (scrollY > 30) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 4. Scroll Reveal with IntersectionObserver
  window.initScrollReveal = function () {
    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add("active"));
    }
  };

  window.initScrollReveal();

  // 5. Hero Video Interactive Controls
  const heroVideo = document.getElementById("hero-video-player");
  const videoToggleBtn = document.getElementById("hero-video-toggle");
  const soundToggleBtn = document.getElementById("hero-sound-toggle");
  const playIcon = document.getElementById("video-play-icon");
  const pauseIcon = document.getElementById("video-pause-icon");
  const mutedIcon = document.getElementById("sound-muted-icon");
  const unmutedIcon = document.getElementById("sound-unmuted-icon");

  if (heroVideo && videoToggleBtn) {
    videoToggleBtn.addEventListener("click", () => {
      if (heroVideo.paused) {
        heroVideo.play();
        if (playIcon) playIcon.style.display = "none";
        if (pauseIcon) pauseIcon.style.display = "block";
      } else {
        heroVideo.pause();
        if (playIcon) playIcon.style.display = "block";
        if (pauseIcon) pauseIcon.style.display = "none";
      }
    });
  }

  if (heroVideo && soundToggleBtn) {
    soundToggleBtn.addEventListener("click", () => {
      heroVideo.muted = !heroVideo.muted;
      if (heroVideo.muted) {
        if (mutedIcon) mutedIcon.style.display = "block";
        if (unmutedIcon) unmutedIcon.style.display = "none";
      } else {
        if (mutedIcon) mutedIcon.style.display = "none";
        if (unmutedIcon) unmutedIcon.style.display = "block";
      }
    });
  }
});
