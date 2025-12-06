// ============================================
// MAISON B - DISCOTHÈQUE IMMERSIVE
// Scripts Interactifs & Animations
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // POP-UPS MANAGEMENT
    // ==========================================

    const welcomePopup = document.getElementById('welcome-popup');
    const scrollPopup = document.getElementById('scroll-popup');

    // Afficher le popup de bienvenue après 1.5s
    setTimeout(() => {
        if (welcomePopup && !sessionStorage.getItem('welcomeShown')) {
            welcomePopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }, 1500);

    // Scroll Popup - Après 60 secondes de navigation
    let scrollPopupShown = false;
    setTimeout(() => {
        if (scrollPopup && !scrollPopupShown && !sessionStorage.getItem('scrollPopupShown')) {
            scrollPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
            scrollPopupShown = true;
            sessionStorage.setItem('scrollPopupShown', 'true');
        }
    }, 60000);

    // Fermer les popups
    document.querySelectorAll('.popup-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const popup = this.closest('.popup-overlay');
            if (popup) {
                popup.classList.remove('active');
                document.body.style.overflow = '';
                if (popup.id === 'welcome-popup') {
                    sessionStorage.setItem('welcomeShown', 'true');
                }
            }
        });
    });

    // Fermer popup en cliquant à l'extérieur
    document.querySelectorAll('.popup-overlay').forEach(popup => {
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Fermer avec Echap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.popup-overlay.active').forEach(popup => {
                popup.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });

    // Fermer popup et naviguer vers la section
    document.querySelectorAll('.popup-cta').forEach(btn => {
        btn.addEventListener('click', function() {
            const popup = this.closest('.popup-overlay');
            if (popup) {
                popup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // ==========================================
    // COUNTDOWN TIMERS
    // ==========================================

    function initCountdown() {
        const countdownMain = document.getElementById('countdown-main');
        if (!countdownMain) return;

        const eventDate = countdownMain.getAttribute('data-event-date');
        if (!eventDate) return;

        const targetDate = new Date(eventDate).getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                countdownMain.innerHTML = "<div class='countdown-ended'>L'événement a commencé !</div>";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((distance % (1000 * 60)) / 1000);

            const format = (num) => num < 10 ? '0' + num : num;

            // Main countdown
            const daysEl = document.getElementById('days-main');
            const hoursEl = document.getElementById('hours-main');
            const minsEl = document.getElementById('mins-main');
            const secsEl = document.getElementById('secs-main');

            if (daysEl) daysEl.textContent = format(days);
            if (hoursEl) hoursEl.textContent = format(hours);
            if (minsEl) minsEl.textContent = format(mins);
            if (secsEl) secsEl.textContent = format(secs);

            // Popup mini countdown
            const popupDays = document.getElementById('popup-days');
            const popupHours = document.getElementById('popup-hours');
            const popupMins = document.getElementById('popup-mins');

            if (popupDays) popupDays.textContent = format(days);
            if (popupHours) popupHours.textContent = format(hours);
            if (popupMins) popupMins.textContent = format(mins);
        };

        updateTimer();
        setInterval(updateTimer, 1000);
    }

    initCountdown();

    // ==========================================
    // HEADER & ANNOUNCEMENT BAR SCROLL EFFECT
    // ==========================================

    const header = document.getElementById('main-header');
    const announcementBar = document.getElementById('announcement-bar');
    const scrollBtn = document.getElementById('back-to-top');
    const floatingSocial = document.querySelector('.floating-social');
    const heroSection = document.getElementById('hero');
    const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;

    // Update scroll button icon and state
    const updateScrollButton = (scrollY) => {
        if (!scrollBtn) return;

        const scrollBtnIcon = scrollBtn.querySelector('i');

        if (scrollY < heroHeight - 100) {
            // On hero section - show as "scroll down" button
            scrollBtn.classList.add('visible');
            scrollBtn.classList.add('scroll-down-mode');
            if (scrollBtnIcon) {
                scrollBtnIcon.className = 'fas fa-arrow-down';
            }
        } else if (scrollY > 500) {
            // Past hero - show as "scroll up" button
            scrollBtn.classList.add('visible');
            scrollBtn.classList.remove('scroll-down-mode');
            if (scrollBtnIcon) {
                scrollBtnIcon.className = 'fas fa-arrow-up';
            }
        } else {
            // In between - hide button
            scrollBtn.classList.remove('visible');
            scrollBtn.classList.remove('scroll-down-mode');
        }
    };

    window.addEventListener('scroll', () => {
        const currentScrollY = window.pageYOffset;

        // Header scroll effect
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
            // Hide announcement bar when scrolled
            if (announcementBar) {
                announcementBar.classList.add('hidden');
            }
        } else {
            header.classList.remove('scrolled');
            // Show announcement bar when at top
            if (announcementBar) {
                announcementBar.classList.remove('hidden');
            }
        }

        // Floating social buttons - hide on hero section
        if (floatingSocial) {
            if (currentScrollY < heroHeight - 100) {
                floatingSocial.classList.add('hidden-on-hero');
            } else {
                floatingSocial.classList.remove('hidden-on-hero');
            }
        }

        // Update scroll button state
        updateScrollButton(currentScrollY);
    });

    // Initial state check
    updateScrollButton(window.pageYOffset);

    // Scroll button click handler - scroll up or down depending on state
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            if (scrollBtn.classList.contains('scroll-down-mode')) {
                // Scroll down to events section
                const eventsSection = document.getElementById('events');
                if (eventsSection) {
                    eventsSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.scrollTo({
                        top: heroHeight,
                        behavior: 'smooth'
                    });
                }
            } else {
                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ==========================================
    // MOBILE MENU
    // ==========================================

    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mainNav.classList.toggle('active');

            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // HERO TITLE ANIMATION ON SCROLL
    // ==========================================

    const heroContentUltra = document.querySelector('.hero-content-ultra');
    if (heroContentUltra) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                const opacity = 1 - (scrolled / (window.innerHeight * 0.7));
                const translateY = scrolled * 0.4;
                heroContentUltra.style.transform = `translateY(${translateY}px)`;
                heroContentUltra.style.opacity = Math.max(0, opacity);
            }
        });
    }

    // ==========================================
    // SMOOTH SCROLL
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#billetterie') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 130;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // BLOG FILTERS
    // ==========================================

    const filterPills = document.querySelectorAll('.filter-pill');
    const blogCards = document.querySelectorAll('.blog-card');

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filter = pill.getAttribute('data-filter');

            blogCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ==========================================
    // GALLERY LIGHTBOX
    // ==========================================

    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
    const lightboxNext = lightbox ? lightbox.querySelector('.lightbox-next') : null;

    let currentImageIndex = 0;
    const galleryImages = [];

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            galleryImages.push(img.src);
        }

        item.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox(galleryImages[index]);
        });
    });

    function openLightbox(src) {
        if (lightbox && lightboxImg) {
            lightboxImg.src = src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        if (lightboxImg) lightboxImg.src = galleryImages[currentImageIndex];
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        if (lightboxImg) lightboxImg.src = galleryImages[currentImageIndex];
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        }
    });

    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================

    const revealElements = document.querySelectorAll(
        '.section-header, .featured-event-card, .event-card, .blog-card, ' +
        '.blog-featured, .vip-card-new, .gallery-item, .contact-info-card, ' +
        '.contact-form-new, .newsletter-section'
    );

    const animStyle = document.createElement('style');
    animStyle.textContent = `
        .reveal-element {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal-element.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .countdown-ended {
            text-align: center;
            font-size: 1.5rem;
            color: var(--color-accent);
            padding: 20px;
            animation: pulse 1s infinite;
        }
    `;
    document.head.appendChild(animStyle);

    revealElements.forEach(el => el.classList.add('reveal-element'));

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // ==========================================
    // FEATURE NUMBERS ANIMATION
    // ==========================================

    const featureNumbers = document.querySelectorAll('.feature-number');
    let featuresAnimated = false;

    const animateFeatures = () => {
        if (featuresAnimated) return;

        const heroFeatures = document.querySelector('.hero-features');
        if (!heroFeatures) return;

        const rect = heroFeatures.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            featuresAnimated = true;

            featureNumbers.forEach(feature => {
                const text = feature.textContent;
                const numMatch = text.match(/\d+/);
                if (numMatch) {
                    const target = parseInt(numMatch[0]);
                    const suffix = text.replace(/\d+/, '');
                    let current = 0;
                    const increment = target / 40;
                    const stepTime = 50;

                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            feature.textContent = target + suffix;
                            clearInterval(counter);
                        } else {
                            feature.textContent = Math.floor(current) + suffix;
                        }
                    }, stepTime);
                }
            });
        }
    };

    window.addEventListener('scroll', animateFeatures);
    animateFeatures();

    // ==========================================
    // CONTACT FORM
    // ==========================================

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.submit-btn');
            const originalContent = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Envoyé !';
                submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00cc66)';

                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 2000);
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const btn = this.querySelector('.newsletter-btn');
            const originalContent = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = 'linear-gradient(135deg, #00ff88, #00cc66)';

            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.background = '';
                this.reset();
            }, 3000);
        });
    }

    // ==========================================
    // DYNAMIC SPOTLIGHT COLOR EFFECTS
    // ==========================================

    const heroSectionGlow = document.getElementById('hero');
    if (heroSectionGlow) {
        const glows = heroSectionGlow.querySelectorAll('.ambient-glow');
        let hue = 0;

        setInterval(() => {
            hue = (hue + 0.3) % 360;
            if (glows[0]) {
                glows[0].style.background = `radial-gradient(circle, hsla(${hue % 60 + 330}, 100%, 50%, 0.25) 0%, transparent 70%)`;
            }
        }, 100);
    }

    // ==========================================
    // CURSOR GLOW EFFECT
    // ==========================================

    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(255, 0, 64, 0.08) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 9998;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(cursorGlow);

    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    function updateCursorGlow() {
        glowX += (cursorX - glowX) * 0.1;
        glowY += (cursorY - glowY) * 0.1;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(updateCursorGlow);
    }
    updateCursorGlow();

    // ==========================================
    // PARALLAX EFFECT ON SPOTLIGHTS
    // ==========================================

    const ambientGlows = document.querySelectorAll('.ambient-glow');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        if (scrolled < window.innerHeight) {
            // Parallax on ambient glows
            ambientGlows.forEach((glow, index) => {
                const speed = 0.15 + (index * 0.1);
                glow.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    });

    // ==========================================
    // VIDEO PLAY CONTROLS
    // ==========================================

    const playButtons = document.querySelectorAll('.play-big-btn, .play-icon-card');
    playButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const video = this.closest('.blog-featured-media, .video-container')?.querySelector('video');
            if (video) {
                if (video.paused) {
                    video.play();
                    video.muted = false;
                } else {
                    video.pause();
                }
            }
        });
    });

    // ==========================================
    // SHARE BUTTON
    // ==========================================

    const shareBtn = document.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'MAISON B - DJ MARKO Live',
                        text: 'Ne manquez pas le DJ Set exclusif de DJ Marko à la Maison B !',
                        url: window.location.href
                    });
                } catch (err) {
                    console.log('Partage annulé');
                }
            } else {
                navigator.clipboard.writeText(window.location.href);
                shareBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
                }, 2000);
            }
        });
    }

    // ==========================================
    // LOAD MORE BUTTON
    // ==========================================

    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.add('fa-spin');

            setTimeout(() => {
                icon.classList.remove('fa-spin');
            }, 1500);
        });
    }

    // ==========================================
    // AUDIO VISUALIZER ANIMATION
    // ==========================================

    const audioBars = document.querySelectorAll('.audio-visualizer .bar');
    audioBars.forEach((bar, index) => {
        setInterval(() => {
            const height = Math.random() * 30 + 10;
            bar.style.height = height + 'px';
        }, 200 + index * 50);
    });

    // ==========================================
    // LAZY LOADING IMAGES
    // ==========================================

    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================

    console.log(`
%c🎵 MAISON B - Discothèque

Site chargé avec succès !
L'élévation de vos nuits.
    `,
    'background: linear-gradient(135deg, #ff0040, #ff00ff); color: white; padding: 20px; font-size: 14px; font-weight: bold; border-radius: 10px;'
    );

});
