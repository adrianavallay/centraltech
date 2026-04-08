// ========================================
// CENTRAL TECH - Landing Page Scripts
// ========================================

document.addEventListener('DOMContentLoaded', function () {

  // --- Theme switch (dark/light) ---
  var themeToggle = document.getElementById('themeToggle');
  var savedTheme = localStorage.getItem('ct-theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
  }

  themeToggle.addEventListener('change', function () {
    if (themeToggle.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('ct-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('ct-theme', 'light');
    }
  });

  // --- Navbar scroll effect & Scroll Top button ---
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Mobile menu toggle ---
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close menu on link click
  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('active');
      var spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = navbar.offsetHeight + 16;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll animations ---
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  var animateElements = document.querySelectorAll(
    '.service-card, .why__feature, .why__box, .location-card, .partner-mini, .hero__card, .fulfillment__step, .ff-card, .flex-platform-card, .platform-card'
  );
  animateElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });

  // --- Pickit scroll animations ---
  var pickitObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('pickit-visible');
        pickitObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  var pickitElements = document.querySelectorAll('.pickit-animate');
  pickitElements.forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.15) + 's';
    pickitObserver.observe(el);
  });

  // --- Contact form ---
  var contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;
    var servicio = document.getElementById('servicio').value;
    var mensaje = document.getElementById('mensaje').value;

    // Build WhatsApp message
    var text = 'Hola! Me contacto desde la web de CentralTech.\n\n';
    text += 'Nombre: ' + nombre + '\n';
    text += 'Email: ' + email + '\n';
    if (telefono) text += 'Teléfono: ' + telefono + '\n';
    if (servicio) text += 'Servicio: ' + servicio + '\n';
    if (mensaje) text += 'Mensaje: ' + mensaje + '\n';

    // For now, show a success message
    var btn = contactForm.querySelector('button[type="submit"]');
    var originalText = btn.textContent;
    btn.textContent = 'Consulta enviada!';
    btn.style.background = '#25D366';
    btn.style.borderColor = '#25D366';
    btn.disabled = true;

    setTimeout(function () {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });

  // --- Contact section scroll reveal ---
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(function (el) {
    revealObserver.observe(el);
  });

  // Staggered card reveal
  var cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var cards = entry.target.querySelectorAll('.contact__card');
        cards.forEach(function (card) {
          card.classList.add('revealed');
        });
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  var contactInfo = document.querySelector('.contact__info');
  if (contactInfo) cardObserver.observe(contactInfo);

  // --- Active nav link on scroll ---
  var sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function () {
    var scrollPos = window.scrollY + navbar.offsetHeight + 100;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      var id = section.getAttribute('id');
      var link = navMenu.querySelector('a[href="#' + id + '"]');
      if (link && !link.classList.contains('btn')) {
        if (scrollPos >= top && scrollPos < bottom) {
          link.style.color = '#F27B20';
        } else {
          link.style.color = '';
        }
      }
    });
  });
});
