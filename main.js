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

// Contact form — validation + Web3Forms submit
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

form?.addEventListener('submit', async (e) => {
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

  const data = new FormData(form);
  data.append('access_key', 'd6036cc9-cfb2-4eb0-865b-e37998a27d6e');

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data
    });
    const json = await res.json();
    if (json.success) {
      form.reset();
      submitBtn.style.display = 'none';
      successMsg?.classList.add('visible');
    } else {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Verstuur bericht';
      alert('Er ging iets mis. Probeer het opnieuw.');
    }
  } catch {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Verstuur bericht';
    alert('Er ging iets mis. Probeer het opnieuw.');
  }
});

// Remove error state on input
form?.querySelectorAll('input, select, textarea').forEach(field => {
  field.addEventListener('input', () => field.classList.remove('error'));
});
