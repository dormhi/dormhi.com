// dormhi.com - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {

    // --- Navbar scroll effect + active link + video overlay (throttled) ---
    var navbar = document.getElementById('navbar');
    var videoOverlay = document.getElementById('video-overlay');
    var heroSection = document.getElementById('home');
    var sections = document.querySelectorAll('.section');
    var navLinkAll = document.querySelectorAll('.nav-link');

    function onScroll() {
        var scrollY = window.scrollY;

        // Navbar scrolled state
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Video overlay fade
        if (videoOverlay && heroSection) {
            var heroHeight = heroSection.offsetHeight;
            var progress = Math.min(scrollY / heroHeight, 1);
            videoOverlay.style.opacity = progress * progress * 0.95;
        }

        // Active nav link on scroll
        var scrollPos = scrollY + 150;

        // Eger sayfanin en altindaysak direkt contact'i aktif yap
        if ((window.innerHeight + scrollY) >= document.body.offsetHeight - 50) {
            navLinkAll.forEach(function(link) {
                link.classList.remove('active');
            });
            var contactLink = document.querySelector('.nav-link[href="#contact"]');
            if (contactLink) contactLink.classList.add('active');
            return;
        }

        sections.forEach(function(section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinkAll.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    var scrollTicking = false;
    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            window.requestAnimationFrame(function() {
                onScroll();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();


    // --- Mobile hamburger toggle ---
    var hamburger = document.getElementById('nav-hamburger');
    var navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        var setMenu = function(open) {
            hamburger.classList.toggle('active', open);
            navLinks.classList.toggle('open', open);
            document.body.classList.toggle('menu-open', open);
            hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        };

        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            setMenu(!navLinks.classList.contains('open'));
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                setMenu(false);
            });
        });

        // Close menu when tapping outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('open') &&
                !navLinks.contains(e.target) &&
                !hamburger.contains(e.target)) {
                setMenu(false);
            }
        });

        // Close menu with Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('open')) {
                setMenu(false);
            }
        });

        // Reset menu state when resizing back to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                setMenu(false);
            }
        });
    }


    // --- Theme toggle (dark/light) ---
    var themeToggle = document.getElementById('theme-toggle');
    var savedTheme = localStorage.getItem('dormhi-theme') || 'dark';

    function applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('dormhi-theme', theme);

        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute('content', theme === 'dark' ? '#0a0a0f' : '#f0f2f5');
        }

        var icon = themeToggle.querySelector('i');
        if (icon) {
            if (theme === 'dark') {
                icon.className = 'fa-solid fa-moon';
            } else {
                icon.className = 'fa-solid fa-sun';
            }
        }
    }

    // Apply saved theme on load
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            var current = document.body.getAttribute('data-theme');
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }


    // --- Video background ---
    var bgVideo = document.getElementById('bg-video');
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var saveData = !!(navigator.connection && navigator.connection.saveData);

    if (bgVideo) {
        if (prefersReducedMotion || saveData) {
            // Respect reduced motion / data-saver: use static background
            bgVideo.removeAttribute('autoplay');
            bgVideo.pause();
            bgVideo.style.display = 'none';
        } else {
            bgVideo.muted = true;
            var playPromise = bgVideo.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(function() {
                    document.addEventListener('click', function() {
                        bgVideo.muted = true;
                        bgVideo.play();
                    }, { once: true });
                });
            }
        }
    }

});
