// Language Toggle Functionality
(function() {
    let currentLang = 'zh';

    // Get both language toggle buttons
    const langToggleDesktop = document.getElementById('langToggle');
    const langToggleMobile = document.getElementById('langToggleMobile');

    // Get media elements
    const demoVideo = document.getElementById('demoVideo');
    const demoVideoBili = document.getElementById('demoVideoBili');
    const videoSourceZh = document.getElementById('videoSourceZh');
    const videoSourceEn = document.getElementById('videoSourceEn');
    const podcastAudio = document.getElementById('podcastAudio');
    const audioSourceZh = document.getElementById('audioSourceZh');
    const audioSourceEn = document.getElementById('audioSourceEn');
    const introductionVideo = document.getElementById('introductionVideo');
    const introVideoBili = document.getElementById('introVideoBili');
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

        // Toggle between Bilibili player (Chinese) and local video (English)
        if (currentLang === 'zh') {
            // Show Bilibili players
            if (demoVideoBili) demoVideoBili.classList.remove('hidden');
            if (introVideoBili) introVideoBili.classList.remove('hidden');
            // Hide and pause local videos
            if (demoVideo) {
                demoVideo.classList.add('hidden');
                demoVideo.pause();
            }
            if (introductionVideo) {
                introductionVideo.classList.add('hidden');
                introductionVideo.pause();
            }
        } else {
            // Hide Bilibili players
            if (demoVideoBili) demoVideoBili.classList.add('hidden');
            if (introVideoBili) introVideoBili.classList.add('hidden');
            // Show local videos
            if (demoVideo) demoVideo.classList.remove('hidden');
            if (introductionVideo) introductionVideo.classList.remove('hidden');
        }

        // Update video source for English only
        if (currentLang === 'en' && demoVideo && videoSourceEn) {
            videoSourceZh.src = '';
            videoSourceEn.src = 'assets/videos/demo-en.mp4';
            demoVideo.load();
        }

        if (currentLang === 'en' && introductionVideo && introVideoSourceEn) {
            introVideoSourceZh.src = '';
            introVideoSourceEn.src = 'assets/videos/introduction-en.mp4';
            introductionVideo.load();
        }

        // Update audio source based on language
        if (podcastAudio && audioSourceZh && audioSourceEn) {
            const currentTime = podcastAudio.currentTime;
            const wasPlaying = !podcastAudio.paused;

            if (currentLang === 'zh') {
                audioSourceZh.src = 'assets/audio/podcast-zh.mp3';
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

    // Initialize audio sources (audio still uses local files)
    if (audioSourceZh && audioSourceEn) {
        audioSourceZh.src = 'assets/audio/podcast-zh.mp3';
        audioSourceEn.src = '';
    }

    // Initialize video: show Bilibili players (Chinese), hide local videos (English)
    if (demoVideoBili) demoVideoBili.classList.remove('hidden');
    if (introVideoBili) introVideoBili.classList.remove('hidden');
    if (demoVideo) demoVideo.classList.add('hidden');
    if (introductionVideo) introductionVideo.classList.add('hidden');
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
