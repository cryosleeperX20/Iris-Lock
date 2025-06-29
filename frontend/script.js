document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    const timelineSteps = document.querySelectorAll('.timeline-step');
    timelineSteps.forEach((step, index) => {
        setTimeout(() => {
            observer.observe(step);
        }, index * 200);
    });

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const btnGlow = button.querySelector('.btn-glow');
            if (btnGlow) {
                btnGlow.style.setProperty('--x', `${x}px`);
                btnGlow.style.setProperty('--y', `${y}px`);
                btnGlow.style.top = `${y}px`;
                btnGlow.style.left = `${x}px`;
            }
        });
    });

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ✅ Updated Redirection Logic
    const registerBtn = document.querySelector('.btn-primary');
    const loginBtn = document.querySelector('.btn-secondary');

    if (registerBtn) {
        registerBtn.addEventListener('click', function () {
            window.location.href = '../frontend/register.html';
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', function () {
            window.location.href = '../frontend/login.html';
        });
    }

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        const parallaxSpeed = 0.5;

        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });

    window.addEventListener('beforeunload', function () {
        observer.disconnect();
    });
});

function animateCounter(element, target, duration = 2000) {
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

window.IrisLock = {
    animateCounter,
};
