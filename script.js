// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initMobileMenu();
  initSmoothScrolling();
  initScrollAnimations();
  initHeaderScroll();
  initContactForm();
  initImageLazyLoading();
});

// Mobile Menu Functionality
function initMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (event) {
      const isClickInsideNav =
        navMenu.contains(event.target) || mobileMenu.contains(event.target);
      if (!isClickInsideNav && navMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const heroButtons = document.querySelectorAll('.btn[href^="#"]');

  [...navLinks, ...heroButtons].forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, observerOptions);

  // Add scroll animation class and observe elements
  const animateElements = document.querySelectorAll(
    ".service-card, .project-card, .branch-card, .about-content > *, .section-header"
  );
  animateElements.forEach((element) => {
    element.classList.add("scroll-animate");
    observer.observe(element);
  });
}

// Header Scroll Effect
function initHeaderScroll() {
  const header = document.querySelector(".header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;

    // Add/remove scrolled class for enhanced styling
    if (currentScrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Only hide header on mobile when scrolling down rapidly
    if (window.innerWidth <= 768) {
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        header.style.transform = "translateY(-100%)";
      } else {
        header.style.transform = "translateY(0)";
      }
    } else {
      // Always keep header visible on desktop
      header.style.transform = "translateY(0)";
    }

    lastScrollY = currentScrollY;
  });
}

// Contact Form Handling (for future contact page)
function initContactForm() {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      // Validate form
      if (validateContactForm(formObject)) {
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="loading"></span> Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
          showFormMessage(
            "Thank you! Your message has been sent successfully.",
            "success"
          );
          this.reset();
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
        }, 2000);
      }
    });
  }
}

// Form Validation
function validateContactForm(formData) {
  const errors = [];

  if (!formData.name || formData.name.trim().length < 2) {
    errors.push("Please enter a valid name (at least 2 characters)");
  }

  if (!formData.email || !isValidEmail(formData.email)) {
    errors.push("Please enter a valid email address");
  }

  if (!formData.phone || formData.phone.trim().length < 8) {
    errors.push("Please enter a valid phone number");
  }

  if (!formData.message || formData.message.trim().length < 10) {
    errors.push("Please enter a message (at least 10 characters)");
  }

  if (errors.length > 0) {
    showFormMessage(errors.join("<br>"), "error");
    return false;
  }

  return true;
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show form message
function showFormMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create new message
  const messageDiv = document.createElement("div");
  messageDiv.className = `form-message ${type}`;
  messageDiv.innerHTML = message;

  // Add styles
  messageDiv.style.cssText = `
        padding: 15px;
        margin: 20px 0;
        border-radius: 5px;
        font-weight: 500;
        ${
          type === "success"
            ? "background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;"
            : "background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;"
        }
    `;

  // Insert message
  const form = document.querySelector(".contact-form");
  if (form) {
    form.insertBefore(messageDiv, form.firstChild);

    // Remove message after 5 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }
}

// Lazy Loading for Images
function initImageLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = "0";
          img.style.transition = "opacity 0.3s ease";

          img.onload = () => {
            img.style.opacity = "1";
          };

          // Handle error loading
          img.onerror = () => {
            img.src =
              "https://via.placeholder.com/600x400/3498db/ffffff?text=Royal+Multiskills";
            img.style.opacity = "1";
          };

          observer.unobserve(img);
        }
      });
    });

    const images = document.querySelectorAll("img[data-src]");
    images.forEach((img) => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for older browsers
    const images = document.querySelectorAll("img[data-src]");
    images.forEach((img) => {
      img.src = img.dataset.src;
    });
  }
}

// Utility Functions

// Debounce function for performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Add to cart functionality (if needed for future enhancements)
function addToCart(courseId, courseName) {
  // This would typically integrate with a shopping cart system
  console.log(`Added course ${courseName} (ID: ${courseId}) to cart`);

  // Show confirmation message
  showNotification(
    `${courseName} has been added to your inquiry list!`,
    "success"
  );
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <i class="fas fa-${
          type === "success"
            ? "check-circle"
            : type === "error"
            ? "exclamation-circle"
            : "info-circle"
        }"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#27ae60"
            : type === "error"
            ? "#e74c3c"
            : "#3498db"
        };
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 300px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Add close functionality
  const closeButton = notification.querySelector(".notification-close");
  closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: 10px;
    `;

  closeButton.addEventListener("click", () => {
    removeNotification(notification);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    removeNotification(notification);
  }, 5000);
}

function removeNotification(notification) {
  if (notification.parentNode) {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }
}

// Initialize back to top button
function initBackToTop() {
  const backToTopButton = document.createElement("button");
  backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
  backToTopButton.className = "back-to-top";
  backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;

  document.body.appendChild(backToTopButton);

  // Show/hide button based on scroll position
  window.addEventListener(
    "scroll",
    throttle(() => {
      if (window.scrollY > 500) {
        backToTopButton.style.opacity = "1";
        backToTopButton.style.visibility = "visible";
      } else {
        backToTopButton.style.opacity = "0";
        backToTopButton.style.visibility = "hidden";
      }
    }, 100)
  );

  // Scroll to top functionality
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Initialize back to top button
initBackToTop();

// Performance optimization: Preload critical images
function preloadCriticalImages() {
  const criticalImages = [
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
}

// Initialize preloading
preloadCriticalImages();

// Add loading screen (optional)
function initLoadingScreen() {
  const loadingScreen = document.createElement("div");
  loadingScreen.id = "loading-screen";
  loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">
                <i class="fas fa-hard-hat"></i>
                <span>Royal Multiskills</span>
            </div>
            <div class="loading-spinner"></div>
        </div>
    `;

  loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;

  document.body.appendChild(loadingScreen);

  // Hide loading screen when page is fully loaded
  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 1000);
  });
}

// Comment out loading screen for now
// initLoadingScreen();

// Gallery Functionality
document.addEventListener("DOMContentLoaded", function () {
  initGalleryFilters();
  initGalleryStats();
});

// Gallery Filter Functionality
function initGalleryFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (filterButtons.length === 0) return; // Gallery not on current page

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");

        if (filterValue === "all" || itemCategory === filterValue) {
          item.classList.remove("hidden");
          item.style.display = "block";
        } else {
          item.classList.add("hidden");
          setTimeout(() => {
            if (item.classList.contains("hidden")) {
              item.style.display = "none";
            }
          }, 300);
        }
      });
    });
  });
}

// Lightbox Functionality
function openLightbox(element) {
  const galleryItem = element.closest(".gallery-item");
  const img = galleryItem.querySelector("img");
  const title = galleryItem.querySelector(".gallery-content h4").textContent;
  const description =
    galleryItem.querySelector(".gallery-content p").textContent;

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDesc = document.getElementById("lightbox-desc");

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxTitle.textContent = title;
  lightboxDesc.textContent = description;

  lightbox.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto"; // Restore scrolling
}

// Close lightbox with ESC key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
});

// Gallery Stats Animation
function initGalleryStats() {
  const stats = document.querySelectorAll(".stat-number");

  if (stats.length === 0) return; // Stats not on current page

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const stat = entry.target;
        const finalValue = stat.textContent;
        const isPercent = finalValue.includes("%");
        const isPlus = finalValue.includes("+");
        const numValue = parseInt(finalValue.replace(/[^\d]/g, ""));

        // Animate counter
        let currentValue = 0;
        const increment = numValue / 50; // 50 steps for smooth animation
        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= numValue) {
            currentValue = numValue;
            clearInterval(timer);
          }

          let displayValue = Math.floor(currentValue);
          if (isPercent) displayValue += "%";
          if (isPlus) displayValue += "+";

          stat.textContent = displayValue;
        }, 30);

        observer.unobserve(stat);
      }
    });
  }, observerOptions);

  stats.forEach((stat) => observer.observe(stat));
}

// Gallery Image Lazy Loading Enhancement
function enhanceGalleryLazyLoading() {
  if ("IntersectionObserver" in window) {
    const galleryImages = document.querySelectorAll(
      '.gallery-image img[loading="lazy"]'
    );

    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add("fade-in");
          imageObserver.unobserve(img);
        }
      });
    });

    galleryImages.forEach((img) => imageObserver.observe(img));
  }
}

// Initialize gallery enhancements
enhanceGalleryLazyLoading();
