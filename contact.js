// Contact Page Specific JavaScript

document.addEventListener("DOMContentLoaded", function () {
  initFAQ();
  initContactFormEnhancements();
  initFormValidation();
});

// FAQ Functionality
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all FAQ items
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

// Enhanced Contact Form
function initContactFormEnhancements() {
  const form = document.getElementById("contactForm");
  const inputs = form.querySelectorAll("input, select, textarea");

  // Add floating label effect
  inputs.forEach((input) => {
    // Add input event listeners for validation feedback
    input.addEventListener("input", function () {
      validateField(this);
    });

    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("focus", function () {
      removeFieldError(this);
    });
  });
}

// Advanced Form Validation
function initFormValidation() {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
      submitForm();
    }
  });
}

// Validate individual field
function validateField(field) {
  const fieldName = field.name;
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = "";

  // Remove existing error state
  removeFieldError(field);

  // Required field validation
  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = "This field is required";
  }

  // Specific field validations
  switch (fieldName) {
    case "name":
      if (value && value.length < 2) {
        isValid = false;
        errorMessage = "Name must be at least 2 characters long";
      }
      break;

    case "email":
      if (value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = "Please enter a valid email address";
      }
      break;

    case "phone":
      if (value && !isValidPhone(value)) {
        isValid = false;
        errorMessage = "Please enter a valid phone number";
      }
      break;

    case "message":
      if (value && value.length < 10) {
        isValid = false;
        errorMessage = "Message must be at least 10 characters long";
      }
      break;
  }

  if (!isValid) {
    addFieldError(field, errorMessage);
  } else {
    addFieldSuccess(field);
  }

  return isValid;
}

// Validate entire form
function validateForm() {
  const form = document.getElementById("contactForm");
  const requiredFields = form.querySelectorAll("[required]");
  let isFormValid = true;

  requiredFields.forEach((field) => {
    if (!validateField(field)) {
      isFormValid = false;
    }
  });

  return isFormValid;
}

// Add error styling and message to field
function addFieldError(field, message) {
  const formGroup = field.closest(".form-group");

  // Add error class
  field.classList.add("error");
  formGroup.classList.add("has-error");

  // Remove existing error message
  const existingError = formGroup.querySelector(".field-error");
  if (existingError) {
    existingError.remove();
  }

  // Add error message
  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error";
  errorDiv.textContent = message;
  formGroup.appendChild(errorDiv);

  // Style the error elements
  field.style.borderColor = "#e74c3c";
  errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 5px;
        display: block;
    `;
}

// Add success styling to field
function addFieldSuccess(field) {
  field.classList.add("success");
  field.style.borderColor = "#27ae60";
}

// Remove error styling and message from field
function removeFieldError(field) {
  const formGroup = field.closest(".form-group");

  field.classList.remove("error", "success");
  formGroup.classList.remove("has-error");
  field.style.borderColor = "#e0e6ed";

  const errorMessage = formGroup.querySelector(".field-error");
  if (errorMessage) {
    errorMessage.remove();
  }
}

// Enhanced email validation
function isValidEmail(email) {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

// Enhanced phone validation
function isValidPhone(phone) {
  // Remove all non-digit characters for validation
  const cleanPhone = phone.replace(/\D/g, "");

  // Check for Singapore phone numbers (8 digits) or international format
  const singaporeRegex = /^[689]\d{7}$/;
  const internationalRegex = /^\+\d{8,15}$/;

  return (
    singaporeRegex.test(cleanPhone) ||
    internationalRegex.test(phone) ||
    cleanPhone.length >= 8
  );
}

// Submit form with enhanced handling
function submitForm() {
  const form = document.getElementById("contactForm");
  const submitBtn = form.querySelector(".submit-btn");
  const formData = new FormData(form);

  // Create form data object
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  // Show loading state
  showLoadingState(submitBtn);

  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    // Simulate random success/failure for demonstration
    const isSuccess = Math.random() > 0.1; // 90% success rate

    if (isSuccess) {
      showFormSuccess();
      form.reset();

      // Send confirmation email notification (simulation)
      console.log("Form submitted successfully:", formObject);
    } else {
      showFormError(
        "There was an error sending your message. Please try again."
      );
    }

    hideLoadingState(submitBtn);
  }, 2000);
}

// Show loading state on submit button
function showLoadingState(button) {
  button.disabled = true;
  button.innerHTML = `
        <div class="loading-spinner"></div>
        Sending Message...
    `;
}

// Hide loading state on submit button
function hideLoadingState(button) {
  button.disabled = false;
  button.innerHTML = `
        <i class="fas fa-paper-plane"></i>
        Send Message
    `;
}

// Show form success message
function showFormSuccess() {
  const message = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
        </div>
    `;
  showFormMessage(message, "success");
}

// Show form error message
function showFormError(errorText) {
  const message = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <h3>Error Sending Message</h3>
            <p>${errorText}</p>
        </div>
    `;
  showFormMessage(message, "error");
}

// Show form message with animation
function showFormMessage(messageHTML, type) {
  // Remove existing message
  const existingMessage = document.querySelector(".form-notification");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create message container
  const messageContainer = document.createElement("div");
  messageContainer.className = `form-notification ${type}`;
  messageContainer.innerHTML = messageHTML;

  // Style the message
  messageContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        text-align: center;
        max-width: 400px;
        width: 90%;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

  // Style the content
  const icon = messageContainer.querySelector("i");
  const heading = messageContainer.querySelector("h3");
  const paragraph = messageContainer.querySelector("p");

  if (icon) {
    icon.style.cssText = `
            font-size: 3rem;
            color: ${type === "success" ? "#27ae60" : "#e74c3c"};
            margin-bottom: 1rem;
        `;
  }

  if (heading) {
    heading.style.cssText = `
            color: #2c3e50;
            margin-bottom: 1rem;
            font-size: 1.3rem;
        `;
  }

  if (paragraph) {
    paragraph.style.cssText = `
            color: #666;
            line-height: 1.6;
            margin: 0;
        `;
  }

  // Add backdrop
  const backdrop = document.createElement("div");
  backdrop.className = "message-backdrop";
  backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9998;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

  // Add to DOM
  document.body.appendChild(backdrop);
  document.body.appendChild(messageContainer);

  // Animate in
  setTimeout(() => {
    backdrop.style.opacity = "1";
    messageContainer.style.opacity = "1";
  }, 100);

  // Remove after 5 seconds or on click
  const removeMessage = () => {
    backdrop.style.opacity = "0";
    messageContainer.style.opacity = "0";

    setTimeout(() => {
      if (backdrop.parentNode) backdrop.remove();
      if (messageContainer.parentNode) messageContainer.remove();
    }, 300);
  };

  setTimeout(removeMessage, 5000);
  backdrop.addEventListener("click", removeMessage);
}

// Format phone number as user types
function formatPhoneNumber(input) {
  let value = input.value.replace(/\D/g, "");

  if (value.startsWith("65")) {
    // Singapore number with country code
    value = value.substring(2);
  }

  if (value.length === 8) {
    // Format as XXXX XXXX
    value = value.replace(/(\d{4})(\d{4})/, "$1 $2");
  }

  input.value = value;
}

// Add phone number formatting
document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      formatPhoneNumber(this);
    });
  }
});

// Character counter for textarea
function addCharacterCounter() {
  const messageTextarea = document.getElementById("message");
  if (messageTextarea) {
    const formGroup = messageTextarea.closest(".form-group");
    const counter = document.createElement("div");
    counter.className = "character-counter";
    counter.style.cssText = `
            text-align: right;
            font-size: 0.8rem;
            color: #7f8c8d;
            margin-top: 5px;
        `;

    const updateCounter = () => {
      const length = messageTextarea.value.length;
      counter.textContent = `${length} characters`;

      if (length < 10) {
        counter.style.color = "#e74c3c";
      } else {
        counter.style.color = "#7f8c8d";
      }
    };

    messageTextarea.addEventListener("input", updateCounter);
    formGroup.appendChild(counter);
    updateCounter();
  }
}

// Initialize character counter
document.addEventListener("DOMContentLoaded", addCharacterCounter);

// OpenStreetMap with Leaflet Implementation
let map;
let markers = [];

// Initialize Map when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Small delay to ensure all elements are loaded
  setTimeout(initMap, 100);
});

// Initialize Leaflet Map
function initMap() {
  try {
    const mapElement = document.getElementById("map");
    if (!mapElement) {
      console.error("Map element not found");
      return;
    }

    // Center point between both branches (approximately)
    const centerPoint = [1.3521, 103.8198];

    // Branch locations
    const branches = [
      {
        name: "Royal Multiskills - Little India Branch",
        position: [1.306426, 103.854037],
        address: "37A Veerasamy Road (2nd Floor)<br>Singapore-207340",
        landmark: "Near Tekka Centre",
        type: "Head Office",
        phone: "(+65) 9336 0515, (+65) 8504 0032",
        email: "training@royalmultiskills.com.sg",
      },
      {
        name: "Royal Multiskills - Woodlands Branch",
        position: [1.443159, 103.786683],
        address:
          "280 Woodlands Industrial Park E5<br>Harvest@Woodlands #01-22<br>Singapore-757322",
        landmark: "Near Driving Centre",
        type: "Branch Office",
        phone: "(+65) 9336 0515, (+65) 9182 1506",
        fax: "(+65) 6909 1420",
      },
    ];

    // Initialize map
    map = L.map("map").setView(centerPoint, 12);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Custom icon for markers
    const createCustomIcon = (color, number) => {
      return L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            background-color: ${color};
            width: 30px;
            height: 30px;
            border-radius: 50% 50% 50% 0;
            border: 3px solid white;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
          ">
            <span style="
              color: white;
              font-weight: bold;
              font-size: 12px;
              transform: rotate(45deg);
            ">${number}</span>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
      });
    };

    // Add markers for each branch
    branches.forEach((branch, index) => {
      const color = index === 0 ? "#e74c3c" : "#3498db";
      const icon = createCustomIcon(color, index + 1);

      const marker = L.marker(branch.position, { icon: icon }).addTo(map);

      // Create popup content
      const popupContent = createPopupContent(branch);
      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: "custom-popup",
      });

      // Store marker
      markers.push(marker);

      // Add click event for popup
      marker.on("click", function () {
        this.openPopup();
      });
    });

    // Fit map to show all markers
    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.1));

    // Handle window resize
    window.addEventListener("resize", function () {
      setTimeout(function () {
        map.invalidateSize();
        if (markers.length > 0) {
          const group = new L.featureGroup(markers);
          map.fitBounds(group.getBounds().pad(0.1));
        }
      }, 100);
    });

    // Add branch card click handlers
    initBranchCardClickHandlers();
  } catch (error) {
    console.error("Error initializing map:", error);
    showMapError();
  }
}

// Initialize click handlers for branch cards
function initBranchCardClickHandlers() {
  const branchCards = document.querySelectorAll(".clickable-branch");
  const showAllButton = document.getElementById("show-all-branches");

  branchCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      focusOnBranch(index);
      updateBranchCardActiveState(card);
    });
  });

  if (showAllButton) {
    showAllButton.addEventListener("click", () => {
      showAllBranches();
      clearBranchCardActiveState();
    });
  }
}

// Focus map on specific branch
function focusOnBranch(branchIndex) {
  if (!map || !markers[branchIndex]) return;

  const marker = markers[branchIndex];

  // Generate random nearby location (within ~500m radius)
  const basePosition = marker.getLatLng();
  const randomLat = basePosition.lat + (Math.random() - 0.5) * 0.008; // ~500m
  const randomLng = basePosition.lng + (Math.random() - 0.5) * 0.008; // ~500m

  // Animate to the random location with higher zoom
  map.setView([randomLat, randomLng], 16, {
    animate: true,
    duration: 1.5,
  });

  // Open the marker popup after animation
  setTimeout(() => {
    marker.openPopup();

    // Add a temporary pulse effect to the marker
    const markerElement = marker.getElement();
    if (markerElement) {
      markerElement.style.animation = "pulse 2s ease-in-out 3";
    }
  }, 1600);
}

// Show all branches on map
function showAllBranches() {
  if (!map || markers.length === 0) return;

  const group = new L.featureGroup(markers);
  map.fitBounds(group.getBounds().pad(0.1), {
    animate: true,
    duration: 1.5,
  });

  // Close all popups
  markers.forEach((marker) => {
    marker.closePopup();
  });
}

// Update active state of branch cards
function updateBranchCardActiveState(activeCard) {
  const allCards = document.querySelectorAll(".clickable-branch");
  allCards.forEach((card) => card.classList.remove("active"));
  activeCard.classList.add("active");
}

// Clear active state from all branch cards
function clearBranchCardActiveState() {
  const allCards = document.querySelectorAll(".clickable-branch");
  allCards.forEach((card) => card.classList.remove("active"));
}

// Create popup content for markers
function createPopupContent(branch) {
  let contactInfo = `<p><strong>Phone:</strong> ${branch.phone}</p>`;

  if (branch.email) {
    contactInfo += `<p><strong>Email:</strong> ${branch.email}</p>`;
  }

  if (branch.fax) {
    contactInfo += `<p><strong>Fax:</strong> ${branch.fax}</p>`;
  }

  return `
    <div class="custom-marker-content">
      <h4 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 1.1rem;">${
        branch.name
      }</h4>
      <p style="margin: 5px 0; color: #555;"><strong>Address:</strong><br>${
        branch.address
      }</p>
      ${contactInfo}
      <p style="margin: 8px 0; color: #3498db; font-weight: 600;"><strong>Landmark:</strong> ${
        branch.landmark
      }</p>
      <div style="margin-top: 10px;">
        <span style="
          background: ${branch.type === "Head Office" ? "#e74c3c" : "#3498db"};
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
        ">
          ${branch.type}
        </span>
      </div>
    </div>
  `;
}

// Show error message if map fails to load
function showMapError() {
  const mapElement = document.getElementById("map");
  if (mapElement) {
    mapElement.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f8f9fa; color: #666; text-align: center; padding: 2rem; border-radius: 15px;">
        <div>
          <i class="fas fa-map-marker-alt" style="font-size: 3rem; margin-bottom: 1rem; color: #bbb;"></i>
          <h4 style="margin-bottom: 1rem; color: #555;">Map Unavailable</h4>
          <p style="margin: 0; line-height: 1.5;">Unable to load the map. Please use the address information provided above to locate our branches.</p>
        </div>
      </div>
    `;
  }
}
