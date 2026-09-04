// dormhi.com - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {

    // --- Navbar scroll effect ---
    var navbar = document.getElementById('navbar');
    var lastScroll = 0;

    window.addEventListener('scroll', function() {
        var currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // --- Mobile hamburger toggle ---
    var hamburger = document.getElementById('nav-hamburger');
    var navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close menu when a link is clicked
        var links = navLinks.querySelectorAll('.nav-link');
        links.forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // --- Active nav link on scroll ---
    var sections = document.querySelectorAll('.section');
    var navLinkAll = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        var scrollPos = window.scrollY + 100;

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
    });

    // --- Force video autoplay ---
    var bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
        bgVideo.muted = true;
        bgVideo.play().catch(function() {
            document.addEventListener('click', function() {
                bgVideo.muted = true;
                bgVideo.play();
            }, { once: true });
        });
    }

});
