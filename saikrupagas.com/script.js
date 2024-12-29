let currentPosition = 0;
const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.product-card');
const cardWidth = cards[0]?.offsetWidth || 0;

// Animation utilities
const fadeInUp = (element, delay = 0) => {
  anime({
    targets: element,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800,
    delay: delay,
    easing: 'easeOutCubic'
  });
};

const fadeIn = (element, delay = 0) => {
  anime({
    targets: element,
    opacity: [0, 1],
    duration: 800,
    delay: delay,
    easing: 'easeOutCubic'
  });
};

function moveCarousel(direction) {
    const maxPosition = -(cardWidth * (cards.length - 3));
    
    currentPosition += direction * cardWidth;
    
    // Limit the movement
    if (currentPosition > 0) currentPosition = 0;
    if (currentPosition < maxPosition) currentPosition = maxPosition;
    
    track.style.transform = `translateX(${currentPosition}px)`;
}

// Reset position on window resize
window.addEventListener('resize', () => {
    if (track) {
        currentPosition = 0;
        track.style.transform = `translateX(0)`;
    }
}); 

function toggleMenu() {
    const mobileNav = document.querySelector('.mobile-nav');
    const menuBtn = document.querySelector('.mobile-menu-btn span');
    
    mobileNav.classList.toggle('active');
    menuBtn.textContent = mobileNav.classList.contains('active') ? 'close' : 'menu';
    
    // Close menu when clicking on mobile nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            menuBtn.textContent = 'menu';
        });
    });
    
    // Close menu when clicking outside
    if (mobileNav.classList.contains('active')) {
        document.addEventListener('click', closeOnClickOutside);
    } else {
        document.removeEventListener('click', closeOnClickOutside);
    }
}

function closeOnClickOutside(e) {
    const mobileNav = document.querySelector('.mobile-nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target) && !e.target.closest('.mobile-menu-btn')) {
        mobileNav.classList.remove('active');
        menuBtn.querySelector('span').textContent = 'menu';
        document.removeEventListener('click', closeOnClickOutside);
    }
}

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        toggleMenu();
    });
});

// Close mobile menu when screen size changes to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) { // md breakpoint
        const mobileMenu = document.getElementById('mobileMenu');
        const menuButton = document.getElementById('menuButton');
        const body = document.body;
        
        mobileMenu.classList.remove('translate-y-0');
        mobileMenu.classList.add('-translate-y-full');
        menuButton.textContent = '☰';
        body.classList.remove('overflow-hidden');
    }
});

// Add loading state to buttons
function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.setAttribute('disabled', 'disabled');
        button.dataset.originalText = button.textContent;
        button.textContent = 'Loading...';
    } else {
        button.classList.remove('loading');
        button.removeAttribute('disabled');
        button.textContent = button.dataset.originalText;
    }
}

// Handle button clicks
document.querySelectorAll('.book-now').forEach(button => {
    button.addEventListener('click', async (e) => {
        setButtonLoading(button, true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setButtonLoading(button, false);
    });
}); 

function toggleCollapse(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById(id + 'Icon');
    
    // Toggle content visibility
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.classList.add('rotate-180');
    } else {
        content.style.maxHeight = '0px';
        icon.classList.remove('rotate-180');
        setTimeout(() => {
            content.classList.add('hidden');
        }, 300);
    }
} 

// Handle hero background opacity on scroll
function handleHeroBackgroundOpacity() {
    const hero = document.querySelector('.hero-bg');
    if (!hero) return;
    
    const heroHeight = hero.offsetHeight;
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const opacity = Math.max(0, 1 - (scrollPosition / heroHeight));
        hero.style.opacity = opacity;
    });
}

// Parallax scroll for hero images
function handleParallax() {
    const images = document.querySelectorAll('.hero-image-grid img');
    if (!images.length) return;
    
    let scrolled = window.pageYOffset;
    
    requestAnimationFrame(() => {
        images.forEach((img, index) => {
            // Different scroll speeds for each image
            const speed = index === 0 ? 0.15 : index === 1 ? 0.1 : 0.05;
            const yPos = -(scrolled * speed);
            // Combine parallax with any existing hover transform
            const scale = img.classList.contains('hover') ? 1.02 : 1;
            img.style.transform = `translateY(${yPos}px) scale(${scale})`;
        });
    });
}

// Handle hover effects
function setupImageHoverEffects() {
    const images = document.querySelectorAll('.hero-image-grid img');
    if (!images.length) return;
    
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.classList.add('hover');
            // Trigger transform update
            handleParallax();
        });
        
        img.addEventListener('mouseleave', () => {
            img.classList.remove('hover');
            // Trigger transform update
            handleParallax();
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    handleHeroBackgroundOpacity();
    setupImageHoverEffects();
    
    // Handle emergency CTA opacity when reaching footer
    const handleEmergencyCTAOpacity = () => {
        const emergencyCTA = document.querySelector('.emergency-cta');
        const footer = document.querySelector('footer');
        
        // Check if elements exist before proceeding
        if (!emergencyCTA || !footer) {
            return;
        }
        
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const emergencyHeight = emergencyCTA.offsetHeight;
        
        // Start fading when footer is approaching the emergency CTA
        const fadeStart = windowHeight - emergencyHeight;
        
        if (footerTop <= fadeStart) {
            const opacity = Math.max(0, footerTop / fadeStart);
            emergencyCTA.style.opacity = opacity;
        } else {
            emergencyCTA.style.opacity = 1;
        }
    };

    // Initialize emergency CTA behavior
    handleEmergencyCTAOpacity();
    
    // Use throttle to improve performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleParallax();
                handleEmergencyCTAOpacity();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Hero section animations
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    if (heroText) fadeInUp('.hero-text', 300);
    if (heroImage) fadeInUp('.hero-image', 500);
    
    // Animate sections on scroll
    const animateOnScroll = () => {
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85 && !element.classList.contains('animated')) {
                element.classList.add('animated');
                fadeInUp(element);
            }
        });
    };
    
    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                animateOnScroll();
                scrollTimeout = null;
            }, 50);  // Adjust this value to control throttle rate
        }
    });
    animateOnScroll(); // Initial check
});

function togglePhoneNumbers() {
    const phoneNumbers = document.querySelector('.phone-numbers');
    phoneNumbers.classList.toggle('hidden');
    phoneNumbers.classList.toggle('show');

    // Close when clicking outside
    document.addEventListener('click', function closePhoneNumbers(e) {
        if (!e.target.closest('.phone-numbers-container')) {
            phoneNumbers.classList.add('hidden');
            phoneNumbers.classList.remove('show');
            document.removeEventListener('click', closePhoneNumbers);
        }
    });
} 

function toggleMobileMenu() {
    const mobileNav = document.querySelector('.mobile-nav');
    const menuIcon = document.querySelector('.mobile-menu-btn .material-icons');
    if (!mobileNav || !menuIcon) return;
    
    if (mobileNav.classList.contains('active')) {
        // Closing animation
        mobileNav.classList.remove('active');
        menuIcon.textContent = 'menu';
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            mobileNav.style.display = 'none';
        }, 300);
    } else {
        // Opening animation
        mobileNav.style.display = 'block';
        // Force a reflow to ensure the display change takes effect
        mobileNav.offsetHeight;
        mobileNav.classList.add('active');
        menuIcon.textContent = 'close';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileNav = document.querySelector('.mobile-nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target) && mobileNav.classList.contains('active')) {
        toggleMobileMenu();
    }
}); 