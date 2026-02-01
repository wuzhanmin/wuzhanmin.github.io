// Language Toggle Functionality
(function() {
    let currentLang = 'zh';

    // Get both language toggle buttons
    const langToggleDesktop = document.getElementById('langToggle');
    const langToggleMobile = document.getElementById('langToggleMobile');

    // Get media elements
    const demoVideo = document.getElementById('demoVideo');
    const videoSourceZh = document.getElementById('videoSourceZh');
    const videoSourceEn = document.getElementById('videoSourceEn');
    const podcastAudio = document.getElementById('podcastAudio');
    const audioSourceZh = document.getElementById('audioSourceZh');
    const audioSourceEn = document.getElementById('audioSourceEn');
    const introductionVideo = document.getElementById('introductionVideo');
    const introVideoSourceZh = document.getElementById('introVideoSourceZh');
    const introVideoSourceEn = document.getElementById('introVideoSourceEn');

    // Function to toggle language
    function toggleLanguage() {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';

        // Update button text for both buttons
        const buttonText = currentLang === 'zh' ? 'EN' : '中文';
        if (langToggleDesktop) langToggleDesktop.textContent = buttonText;
        if (langToggleMobile) langToggleMobile.textContent = buttonText;

        // Show/hide elements based on language
        document.querySelectorAll('[data-lang]').forEach(element => {
            if (element.getAttribute('data-lang') === currentLang) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        });

        // Update video source based on language
        if (demoVideo && videoSourceZh && videoSourceEn) {
            const currentTime = demoVideo.currentTime;
            const wasPlaying = !demoVideo.paused;

            if (currentLang === 'zh') {
                videoSourceZh.src = 'assets/videos/demo-zh.mp4';
                videoSourceEn.src = '';
            } else {
                videoSourceZh.src = '';
                videoSourceEn.src = 'assets/videos/demo-en.mp4';
            }

            demoVideo.load();
            demoVideo.currentTime = currentTime;

            if (wasPlaying) {
                demoVideo.play().catch(err => console.log('Auto-play prevented:', err));
            }
        }

        // Update audio source based on language
        if (podcastAudio && audioSourceZh && audioSourceEn) {
            const currentTime = podcastAudio.currentTime;
            const wasPlaying = !podcastAudio.paused;

            if (currentLang === 'zh') {
                audioSourceZh.src = 'assets/audio/podcast-zh.m4a';
                audioSourceEn.src = '';
            } else {
                audioSourceZh.src = '';
                audioSourceEn.src = 'assets/audio/podcast-en.m4a';
            }

            podcastAudio.load();
            podcastAudio.currentTime = currentTime;

            if (wasPlaying) {
                podcastAudio.play().catch(err => console.log('Auto-play prevented:', err));
            }
        }

        // Update introduction video source based on language
        if (introductionVideo && introVideoSourceZh && introVideoSourceEn) {
            const currentTime = introductionVideo.currentTime;
            const wasPlaying = !introductionVideo.paused;

            if (currentLang === 'zh') {
                introVideoSourceZh.src = 'assets/videos/introduction-zh.mp4';
                introVideoSourceEn.src = '';
            } else {
                introVideoSourceZh.src = '';
                introVideoSourceEn.src = 'assets/videos/introduction-en.mp4';
            }

            introductionVideo.load();
            introductionVideo.currentTime = currentTime;

            if (wasPlaying) {
                introductionVideo.play().catch(err => console.log('Auto-play prevented:', err));
            }
        }

        // Update demoVideo poster attribute
        if (demoVideo) {
            demoVideo.poster = currentLang === 'zh'
                ? 'assets/images/demo-poster-zh.jpg'
                : 'assets/images/demo-poster-en.jpg';
        }

        // Update introductionVideo poster attribute
        if (introductionVideo) {
            introductionVideo.poster = currentLang === 'zh'
                ? 'assets/images/introduction-poster-zh.jpg'
                : 'assets/images/introduction-poster-en.jpg';
        }

        // Update download links based on language
        const downloadCta = document.getElementById('downloadCta');
        const footerDownload = document.getElementById('footerDownload');

        if (downloadCta) {
            downloadCta.href = currentLang === 'zh'
                ? 'assets/pdf/product-manual-zh.pdf'
                : 'assets/pdf/product-manual-en.pdf';
        }

        if (footerDownload) {
            footerDownload.href = currentLang === 'zh'
                ? 'assets/pdf/product-manual-zh.pdf'
                : 'assets/pdf/product-manual-en.pdf';
        }
    }

    // Attach event listeners to both buttons
    if (langToggleDesktop) {
        langToggleDesktop.addEventListener('click', toggleLanguage);
    }

    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', toggleLanguage);
    }

    // Initialize - show Chinese by default
    document.querySelectorAll('[data-lang]').forEach(element => {
        if (element.getAttribute('data-lang') === currentLang) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    });

    // Initialize video and audio sources
    if (videoSourceZh && videoSourceEn) {
        videoSourceZh.src = 'assets/videos/demo-zh.mp4';
        videoSourceEn.src = '';
    }
    if (audioSourceZh && audioSourceEn) {
        audioSourceZh.src = 'assets/audio/podcast-zh.m4a';
        audioSourceEn.src = '';
    }
    if (introVideoSourceZh && introVideoSourceEn) {
        introVideoSourceZh.src = 'assets/videos/introduction-zh.mp4';
        introVideoSourceEn.src = '';
    }

    // Initialize video posters with Chinese version
    if (demoVideo) {
        demoVideo.poster = 'assets/images/demo-poster-zh.jpg';
    }

    if (introductionVideo) {
        introductionVideo.poster = 'assets/images/introduction-poster-zh.jpg';
    }
})();

// Scroll animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('section > div');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});
