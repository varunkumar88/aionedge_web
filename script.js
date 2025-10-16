// Demos Page Carousel
document.addEventListener('DOMContentLoaded', function() {
    const demosSlides = document.querySelectorAll('.demos-carousel-slide');
    const demosIndicators = document.querySelectorAll('.demos-indicator');
    
    if (demosSlides.length > 0) {
        let currentDemosSlide = 0;
        const demosSlideInterval = 6000; // Change slide every 6 seconds to match zoom animation

        function showDemosSlide(index) {
            // Remove active class from all slides and indicators
            demosSlides.forEach(slide => slide.classList.remove('active'));
            demosIndicators.forEach(indicator => indicator.classList.remove('active'));

            // Add active class to current slide and indicator
            demosSlides[index].classList.add('active');
            demosIndicators[index].classList.add('active');
        }

        function nextDemosSlide() {
            currentDemosSlide = (currentDemosSlide + 1) % demosSlides.length;
            showDemosSlide(currentDemosSlide);
        }

        // Auto-rotate slides
        let demosAutoRotate = setInterval(nextDemosSlide, demosSlideInterval);

        // Click on indicators to show specific slide
        demosIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentDemosSlide = index;
                showDemosSlide(currentDemosSlide);
                // Reset auto-rotate timer
                clearInterval(demosAutoRotate);
                demosAutoRotate = setInterval(nextDemosSlide, demosSlideInterval);
            });
        });

        // Pause auto-rotate on hover
        const demosCarousel = document.querySelector('.demos-carousel');
        if (demosCarousel) {
            demosCarousel.addEventListener('mouseenter', function() {
                clearInterval(demosAutoRotate);
            });
            
            demosCarousel.addEventListener('mouseleave', function() {
                demosAutoRotate = setInterval(nextDemosSlide, demosSlideInterval);
            });
        }
    }
});

// Demo Video Player - No Controls, No Branding
document.addEventListener('DOMContentLoaded', function() {
    const videoContainers = document.querySelectorAll('.demo-video-container');
    
    videoContainers.forEach(container => {
        container.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            const startTime = this.getAttribute('data-start') || '0';
            
            // Create iframe with no controls and no branding
            const iframe = document.createElement('iframe');
            iframe.className = 'demo-iframe';
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&start=${startTime}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0`;
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', '');
            
            // Replace thumbnail with iframe
            this.innerHTML = '';
            this.appendChild(iframe);
            
            // Remove click listener
            this.style.cursor = 'default';
        });
    });
});

// Main Navigation Active State on Scroll (for Home page sections)
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 150;
        
        // Get all sections on the page
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});

// Section Navigation Active State
document.addEventListener('DOMContentLoaded', function() {
    const sectionNavLinks = document.querySelectorAll('.section-nav-link');
    
    if (sectionNavLinks.length > 0) {
        // Highlight active section on scroll
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY + 200;
            
            sectionNavLinks.forEach(link => {
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const sectionTop = targetSection.offsetTop;
                    const sectionBottom = sectionTop + targetSection.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        sectionNavLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                }
            });
        });
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const usecase = formData.get('usecase') || formData.get('message');
        
        // Basic validation
        if (!name || !email || !company || !usecase) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Send data to backend API
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                company: company,
                usecase: usecase
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showNotification('Thanks! We\'ll contact you shortly.', 'success');
                this.reset();
            } else {
                showNotification(data.message || 'Something went wrong. Please try again.', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Failed to send message. Please try again.', 'error');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .about-text, .contact-item, .stat');
    animateElements.forEach(el => observer.observe(el));
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment the line below to enable typing animation
        // typeWriter(heroTitle, originalText, 50);
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (target >= 1000 ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (target >= 1000 ? '+' : '');
        }
    }
    
    updateCounter();
}

// Initialize counter animations
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                if (number) {
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Dashboard chart animation observer
const dashboardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const chartBars = entry.target.querySelectorAll('.bar');
            const chartLine = entry.target.querySelector('.chart-line');
            
            // Reset and restart bar animations
            chartBars.forEach((bar, index) => {
                bar.style.animation = 'none';
                bar.offsetHeight; // Trigger reflow
                bar.style.animation = `barGrow 2s ease-out forwards`;
                bar.style.animationDelay = `${0.2 + (index * 0.2)}s`;
            });
            
            // Restart line animation
            if (chartLine) {
                chartLine.style.animation = 'none';
                chartLine.offsetHeight; // Trigger reflow
                chartLine.style.animation = 'chartLineFlow 3s ease-in-out infinite';
            }
            
            dashboardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    const dashboardChart = document.querySelector('.chart-placeholder');
    if (dashboardChart) {
        dashboardObserver.observe(dashboardChart);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading state with spinning logo
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgb(99, 102, 241) 0%, rgb(139, 92, 246) 100%);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    }
    
    body.loaded .loading-screen {
        opacity: 0;
        visibility: hidden;
    }
    
    .loading-logo {
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
    }
    
    .loading-text {
        color: white;
        font-size: 2rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        animation: pulse 1.5s ease-in-out infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
    }
`;
document.head.appendChild(loadingStyles);

// Create loading screen element
const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading-screen';
loadingScreen.innerHTML = `
    <img src="AIonedgeicon.png" alt="AIONedge" class="loading-logo">
    <div class="loading-text">AIONedge</div>
`;
document.body.insertBefore(loadingScreen, document.body.firstChild);

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll('.section-header, .features-grid, .about-content, .contact-content');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

console.log('AI Solutions website loaded successfully! 🚀');
