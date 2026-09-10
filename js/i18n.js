// dormhi.com - Internationalization (TR/EN)

(function() {

    var translations = {
        en: {
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.skills': 'Skills',
            'nav.portfolio': 'Portfolio',
            'nav.contact': 'Contact',

            'hero.title': "Hi, I'm Dormhi",
            'hero.subtitle': 'Computer Engineering Student | Software Developer',
            'hero.projects': 'My Projects',
            'hero.contact': 'Get in Touch',

            'about.title': 'About Me',
            'about.intro': "I have been striving to be the best in the fields of computers and software that I have been interested in since my childhood. I'm a Computer Engineering student passionate about building modern software solutions.",
            'about.education': 'Education',
            'about.educationDesc': 'Computer Engineering (3rd year)',
            'about.location': 'Location',
            'about.locationDesc': 'Turkiye',
            'about.languages': 'Languages',
            'about.interests': 'Interests',
            'about.interestsDesc': 'Algorithms, Machine Learning, AI, Web Development',

            'skills.title': 'Skills',
            'skills.frontend': 'Frontend',
            'skills.backend': 'Backend',
            'skills.tools': 'Tools',

            'portfolio.title': 'Portfolio',
            'portfolio.loading': 'Loading projects...',

            'contact.title': 'Contact',
            'contact.intro': 'Feel free to reach out through any of the channels below.',
            'contact.locationLabel': 'Location',
            'contact.locationValue': 'Turkiye',
            'contact.emailLabel': 'Email'
        },
        tr: {
            'nav.home': 'Ana Sayfa',
            'nav.about': 'Hakkimda',
            'nav.skills': 'Yetenekler',
            'nav.portfolio': 'Projeler',
            'nav.contact': 'Iletisim',

            'hero.title': 'Merhaba, ben Dormhi',
            'hero.subtitle': 'Bilgisayar Muhendisligi Ogrencisi | Yazilim Gelistirici',
            'hero.projects': 'Projelerim',
            'hero.contact': 'Iletisime Gec',

            'about.title': 'Hakkimda',
            'about.intro': 'Cocuklugumdan beri ilgi duydugum bilgisayar ve yazilim alanlarinda en iyi olmaya calisiyorum. Modern yazilim cozumleri uretmeye tutkulu bir Bilgisayar Muhendisligi ogrencisiyim.',
            'about.education': 'Egitim',
            'about.educationDesc': 'Bilgisayar Muhendisligi (3. sinif)',
            'about.location': 'Konum',
            'about.locationDesc': 'Turkiye',
            'about.languages': 'Diller',
            'about.interests': 'Ilgi Alanlari',
            'about.interestsDesc': 'Algoritmalar, Makine Ogrenimi, Yapay Zeka, Web Gelistirme',

            'skills.title': 'Yetenekler',
            'skills.frontend': 'On Yuz',
            'skills.backend': 'Arka Yuz',
            'skills.tools': 'Araclar',

            'portfolio.title': 'Projeler',
            'portfolio.loading': 'Projeler yukleniyor...',

            'contact.title': 'Iletisim',
            'contact.intro': 'Asagidaki kanallardan bana ulasabilirsiniz.',
            'contact.locationLabel': 'Konum',
            'contact.locationValue': 'Turkiye',
            'contact.emailLabel': 'E-posta'
        }
    };

    var currentLang = localStorage.getItem('dormhi-lang') || 'en';

    function applyTranslations(lang) {
        var dict = translations[lang];
        if (!dict) return;

        var elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(function(el) {
            var key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });

        document.documentElement.lang = lang;
        currentLang = lang;
        localStorage.setItem('dormhi-lang', lang);

        // Update toggle button text
        var langBtn = document.getElementById('lang-toggle');
        if (langBtn) {
            var span = langBtn.querySelector('span');
            if (span) {
                span.textContent = lang === 'en' ? 'TR' : 'EN';
            }
        }
    }

    function toggleLanguage() {
        var newLang = currentLang === 'en' ? 'tr' : 'en';
        applyTranslations(newLang);
    }

    // Init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            applyTranslations(currentLang);
            var langBtn = document.getElementById('lang-toggle');
            if (langBtn) {
                langBtn.addEventListener('click', toggleLanguage);
            }
        });
    } else {
        applyTranslations(currentLang);
        var langBtn = document.getElementById('lang-toggle');
        if (langBtn) {
            langBtn.addEventListener('click', toggleLanguage);
        }
    }

})();
