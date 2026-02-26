/* ===============================
   MOBILE MENU
================================ */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});


/* ===============================
   NAVBAR SCROLL EFFECT
================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


/* ===============================
   HERO PARALLAX (SLOWED)
================================ */
const hero = document.getElementById('hero');
const heroBg = hero.querySelector('.hero-bg');
const heroContent = hero.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;

    if (scrolled < heroHeight) {
        const yPos = scrolled * 0.25;
        const scale = 1 + (scrolled / heroHeight) * 0.04;
        const opacity = 1 - (scrolled / heroHeight);
        const textY = scrolled * 0.12;

        heroBg.style.transform = `translateY(${yPos}px) scale(${scale})`;
        heroContent.style.opacity = opacity;
        heroContent.style.transform = `translateY(-${textY}px)`;
    }
});


/* ===============================
   REVEAL SECTION (SLOWED)
================================ */
const revealSection = document.getElementById('reveal-section');
const revealBg = revealSection.querySelector('.reveal-bg');
const revealTitle = revealSection.querySelector('.reveal-title');
const revealSubtitle = revealSection.querySelector('.reveal-subtitle');
const revealFeatures = revealSection.querySelectorAll('.reveal-feature');

window.addEventListener('scroll', () => {
    const rect = revealSection.getBoundingClientRect();
    let rawProgress = 1 - (rect.top / window.innerHeight);
    const scrollProgress = Math.max(0, Math.min(1.5, rawProgress * 0.7));

    if (scrollProgress > 0 && scrollProgress < 1.5) {

        // Background
        revealBg.style.transform = `scale(${1 + scrollProgress * 0.15})`;
        revealBg.style.opacity = Math.max(0, 1 - scrollProgress * 0.4);

        // Title
        revealTitle.style.opacity =
            scrollProgress < 0.5 ? 1 : Math.max(0, 1 - (scrollProgress - 0.5) * 2);
        revealTitle.style.transform =
            scrollProgress > 0.5 ? `translateY(${-(scrollProgress - 0.5) * 60}px)` : `translateY(0)`;

        // Subtitle
        revealSubtitle.style.opacity =
            scrollProgress < 0.6 ? 1 : Math.max(0, 1 - (scrollProgress - 0.6) * 2);
        revealSubtitle.style.transform =
            scrollProgress > 0.6 ? `translateY(${-(scrollProgress - 0.6) * 60}px)` : `translateY(0)`;

        // Features
        revealFeatures.forEach((feature, index) => {
            const start = 0.4 + index * 0.15;
            if (scrollProgress >= start) {
                const p = Math.min(1, (scrollProgress - start) / 0.3);
                feature.style.opacity = p;
                feature.style.transform = `translateY(${80 - p * 80}px)`;
            }
        });
    }
});


/* ===============================
   STICKY SECTIONS (SLOWED)
================================ */
document.querySelectorAll('.sticky-section').forEach(section => {
    const content = section.querySelector('.sticky-content');

    window.addEventListener('scroll', () => {
        const rect = section.getBoundingClientRect();
        let progress = 1 - rect.top / window.innerHeight;
        progress = Math.max(0, Math.min(1.2, progress * 0.8));

        if (progress > 0) {
            content.style.opacity =
                progress < 0.3 ? progress * 2 : progress > 1 ? Math.max(0, 1 - (progress - 1) * 2) : 1;
            content.style.transform = `scale(${0.85 + progress * 0.1})`;
        }
    });
});


/* ===============================
   PARALLAX SECTIONS (SLOWED)
================================ */
document.querySelectorAll('.parallax-section').forEach(section => {
    const bg = section.querySelector('.parallax-bg');
    const content = section.querySelector('.parallax-content');

    window.addEventListener('scroll', () => {
        const rect = section.getBoundingClientRect();
        let progress = 1 - rect.top / window.innerHeight;
        progress = Math.max(-0.5, Math.min(1.5, progress * 0.8));

        bg.style.transform = `translateY(${(progress - 0.5) * 15}%) scale(${1.15 - Math.abs(progress - 0.5) * 0.15})`;

        const opacity =
            progress < 0.3 ? progress * 2 :
            progress > 0.7 ? Math.max(0, 1 - (progress - 0.7) * 2) : 1;

        content.style.opacity = opacity;

        const textOffset = (progress - 0.5) * 60;
        content.querySelectorAll('h2, p').forEach(el => {
            el.style.transform = `translateY(${textOffset}px)`;
        });
    });
});


/* ===============================
   INTERSECTION OBSERVER (SLOW STAGGER)
================================ */
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -120px 0px'
};

const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-element').forEach(el => fadeObserver.observe(el));


/* ===============================
   FEATURE ITEMS STAGGER (SLOW)
================================ */
document.querySelectorAll('.feature-item').forEach((item, index) => {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 400);
            }
        });
    }, observerOptions);

    obs.observe(item);
});


/* ===============================
   COURT CARDS (SLOW)
================================ */
document.querySelectorAll('.court-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(60px)';
    card.style.transition = 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1)';

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 300);
            }
        });
    }, observerOptions);

    obs.observe(card);
});


/* ===============================
   MEMBERSHIP CARDS (SLOW)
================================ */
document.querySelectorAll('.membership-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(60px)';
    card.style.transition = 'all 1s cubic-bezier(0.22, 1, 0.36, 1)';

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = card.classList.contains('bg-orange-500')
                        ? 'translateY(0) scale(1.1)'
                        : 'translateY(0) scale(1)';
                }, index * 400);
            }
        });
    }, observerOptions);

    obs.observe(card);
});


/* ===============================
   SMOOTH ANCHOR SCROLL
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});


console.log('✅ Base Performance – Cinematic Scroll Loaded');




    const slides = document.querySelectorAll('.carousel-img');
    let currentSlide = 0;

    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 3000); // 5 seconds per slide


 // Form Submission to Google Sheets
const form = document.getElementById("contactForm");
const successMessage = document.getElementById("formMessage");
const errorMessage = document.getElementById("errorMessage");
const btnText = document.getElementById("btnText");
const btnLoader = document.getElementById("btnLoader");

// REPLACE THIS WITH YOUR ACTUAL GOOGLE APPS SCRIPT WEB APP URL
const scriptURL = "https://script.google.com/macros/s/AKfycbws2iUpz9UawVZg3KhPRAFjWnFUKMNFFT4GHaP0Jhs6G9pPnF8t3o2GEIXG1NVg5bo/exec";

// IMPORTANT: Prevent default form submission and page reload
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // This prevents page reload and scrolling to top
  
  // Hide any previous messages
  if (successMessage) successMessage.style.display = "none";
  if (errorMessage) errorMessage.style.display = "none";
  
  // Validate form
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value.trim();
  
  if (!name || !email || !subject || !message) {
    errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fill in all required fields.';
    errorMessage.style.display = "block";
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter a valid email address.';
    errorMessage.style.display = "block";
    return;
  }

  // Show loader
  if (btnText) btnText.style.display = "none";
  if (btnLoader) btnLoader.style.display = "inline";
  if (form.querySelector(".submit-btn")) form.querySelector(".submit-btn").disabled = true;

  const formData = new FormData(form);
  formData.append("timestamp", new Date().toLocaleString());

  try {
    // Actual submission to Google Apps Script
    const response = await fetch(scriptURL, {
      method: "POST",
      body: formData,
      mode: "no-cors",  // Keep as no-cors for Google Apps Script
    });
    
    // Show success message (with no-cors we assume success)
    if (successMessage) {
      successMessage.style.display = "block";
      successMessage.innerHTML = '✅ Service request submitted successfully!';
    }
    form.reset();

    // Scroll to success message smoothly
    if (successMessage) {
      successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    // Hide success message after 5 seconds
    setTimeout(() => {
      if (successMessage) successMessage.style.display = "none";
    }, 5000);
    
  } catch (error) {
    console.error("Error!", error);
    if (errorMessage) {
      errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Unable to send message. Please try again or contact us directly.';
      errorMessage.style.display = "block";
      errorMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } finally {
    // Reset button
    if (btnText) btnText.style.display = "inline";
    if (btnLoader) btnLoader.style.display = "none";
    if (form.querySelector(".submit-btn")) form.querySelector(".submit-btn").disabled = false;
  }
}); // <-- This closing bracket and parenthesis are now correct!