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
})();
