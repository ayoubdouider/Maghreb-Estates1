// Nav scroll shadow
const nav = document.getElementById('top')?.closest('.nav') || document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger?.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Contact form — basic validation + fake submit
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  form.querySelectorAll('[required]').forEach(field => {
    field.classList.remove('error');
    if (!field.value.trim()) {
      field.classList.add('error');
      valid = false;
    }
  });

  if (!valid) return;

  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Versturen...';

  // Simulate async send (replace with real endpoint / Formspree / Netlify Forms)
  setTimeout(() => {
    form.reset();
    submitBtn.style.display = 'none';
    successMsg?.classList.add('visible');
  }, 900);
});

// Remove error state on input
form?.querySelectorAll('input, select, textarea').forEach(field => {
  field.addEventListener('input', () => field.classList.remove('error'));
});
