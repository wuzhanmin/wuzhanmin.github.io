// Language Toggle Functionality
(function() {
    let currentLang = 'zh';

    // Get both language toggle buttons
    const langToggleDesktop = document.getElementById('langToggle');
    const langToggleMobile = document.getElementById('langToggleMobile');

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
})();
