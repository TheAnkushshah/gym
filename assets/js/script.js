'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () { navbar.classList.toggle("active"); }

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () { navbar.classList.remove("active"); }

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * Gallery Image Rotation - Shuffle one image every 10 seconds
 */

const galleryItems = document.querySelectorAll('.gallery-item');

// All 12 images for the 6 gallery slots
const allImages = [
  ['./assets/images/gallery-1.jpg', './assets/images/gallery-7.jpg'],
  ['./assets/images/gallery-2.jpg', './assets/images/gallery-8.jpg'],
  ['./assets/images/gallery-3.jpg', './assets/images/gallery-9.jpg'],
  ['./assets/images/gallery-4.jpg', './assets/images/gallery-10.jpg'],
  ['./assets/images/gallery-5.jpg', './assets/images/gallery-11.jpg'],
  ['./assets/images/gallery-6.jpg', './assets/images/gallery-12.jpg']
];

// Labels with icons for each of the 12 images
const allLabels = [
  [
    { icon: 'pulse-outline', text: 'Cardio Zone' },
    { icon: 'water-outline', text: 'Premium Washroom' }
  ],
  [
    { icon: 'walk-outline', text: 'Treadmills' },
    { icon: 'barbell-outline', text: 'Strength Zone' }
  ],
  [
    { icon: 'barbell-outline', text: 'Strength Machines' },
    { icon: 'fitness-outline', text: 'Premium Equipment' }
  ],
  [
    { icon: 'flame-outline', text: 'Hardcore Zone' },
    { icon: 'musical-notes-outline', text: 'DJ Corner' }
  ],
  [
    { icon: 'cafe-outline', text: 'Lounge Area' },
    { icon: 'tv-outline', text: 'Cardio Theatre' }
  ],
  [
    { icon: 'trophy-outline', text: 'Motivation Wall' },
    { icon: 'people-outline', text: 'Group Training' }
  ]
];

// Track current image index for each slot
const currentImageIndex = [0, 0, 0, 0, 0, 0];

// Update overlay text and icon
function updateOverlay(slotIndex) {
  const overlay = galleryItems[slotIndex].querySelector('.gallery-overlay');
  const icon = overlay.querySelector('ion-icon');
  const text = overlay.querySelector('p');
  
  const currentLabel = allLabels[slotIndex][currentImageIndex[slotIndex]];
  icon.setAttribute('name', currentLabel.icon);
  text.textContent = currentLabel.text;
}

// Shuffle one random image every 10 seconds
setInterval(() => {
  // Pick a random gallery item (0-5)
  const randomSlot = Math.floor(Math.random() * 6);
  
  const img = galleryItems[randomSlot].querySelector('.gallery-img');
  
  // Fade out
  img.style.opacity = '0';
  
  setTimeout(() => {
    // Toggle between the two images for this slot
    currentImageIndex[randomSlot] = (currentImageIndex[randomSlot] + 1) % 2;
    img.src = allImages[randomSlot][currentImageIndex[randomSlot]];
    
    // Update overlay label
    updateOverlay(randomSlot);
    
    // Fade in
    img.style.opacity = '1';
  }, 500);
}, 10000); // Every 10 seconds



/**
 * Video Modal - 360° View
 */

const playBtn = document.querySelector('[data-play-btn]');
const videoModal = document.querySelector('[data-video-modal]');
const modalCloseButtons = document.querySelectorAll('[data-modal-close]');

if (playBtn && videoModal) {
  playBtn.addEventListener('click', () => {
    videoModal.classList.add('active');
  });

  modalCloseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      videoModal.classList.remove('active');
    });
  });

  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
      videoModal.classList.remove('active');
    }
  });
}


/**
 * Contact Modal
 */

const contactModal = document.querySelector('[data-contact-modal]');
const contactBtn = document.querySelector('[data-contact-btn]');
const contactCloseBtn = document.querySelectorAll('[data-contact-close]');
const contactForm = document.querySelector('.contact-form');

const openContactModal = () => {
  contactModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

const closeContactModal = () => {
  contactModal.classList.remove('active');
  document.body.style.overflow = '';
  contactForm.reset();
  document.querySelectorAll('.form-group').forEach(group => group.classList.remove('error'));
}

contactBtn.addEventListener('click', (e) => {
  e.preventDefault();
  openContactModal();
});

contactCloseBtn.forEach(btn => {
  btn.addEventListener('click', closeContactModal);
});

// Close modal on backdrop click
document.querySelector('.modal-backdrop').addEventListener('click', closeContactModal);

// Form validation and submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const message = document.getElementById('message');
  
  let isValid = true;
  
  // Validate name
  if (name.value.trim().length < 2) {
    showError(name, 'Name must be at least 2 characters');
    isValid = false;
  } else {
    clearError(name);
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    showError(email, 'Please enter a valid email');
    isValid = false;
  } else {
    clearError(email);
  }
  
  // Validate phone
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  if (!phoneRegex.test(phone.value)) {
    showError(phone, 'Please enter a valid phone number');
    isValid = false;
  } else {
    clearError(phone);
  }
  
  // Validate message
  if (message.value.trim().length < 10) {
    showError(message, 'Message must be at least 10 characters');
    isValid = false;
  } else {
    clearError(message);
  }
  
  if (isValid) {
    console.log('Form submitted:', {
      name: name.value,
      email: email.value,
      phone: phone.value,
      message: message.value
    });
    
    // Show success message
    alert('Thank you! We will contact you soon.');
    closeContactModal();
  }
});

const showError = (input, message) => {
  const group = input.closest('.form-group');
  group.classList.add('error');
  group.querySelector('.form-error').textContent = message;
}

const clearError = (input) => {
  const group = input.closest('.form-group');
  group.classList.remove('error');
  group.querySelector('.form-error').textContent = '';
}