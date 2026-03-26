// script.js

// Theme Toggle Functionality
const themeToggleButton = document.getElementById('theme-toggle');
themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

// Before/After Slider Logic
const sliderBefore = document.getElementById('before');
const sliderAfter = document.getElementById('after');
const sliderHandle = document.getElementById('slider-handle');

sliderHandle.addEventListener('input', () => {
    const value = sliderHandle.value;
    sliderBefore.style.width = `${value}%`;
    sliderAfter.style.width = `${100 - value}%`;
});

// Scroll Reveal Animations
document.addEventListener('scroll', () => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
});

// Form Handling
const form = document.getElementById('contact-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    fetch('/submit', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        form.reset();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});