/**
 * Validation Module
 * Handles form security, regex checks, and input sanitization.
 */
const FormValidator = (function() {
    'use strict';

    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    function sanitizeInput(rawString) {
        if (!rawString) return '';
        const div = document.createElement('div');
        div.textContent = rawString;
        return div.innerHTML;
    }

    function bindNewsletterLogic() {
        const inputField = document.getElementById('newsletterInput');
        const submitBtn = document.getElementById('newsletterBtn');
        const statusText = document.getElementById('newsletterStatus');

        if (!inputField || !submitBtn || !statusText) return;

        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const rawVal = inputField.value.trim();
            const cleanVal = sanitizeInput(rawVal);

            statusText.style.display = 'block';

            if (cleanVal === '') {
                statusText.style.color = '#E04A6B';
                statusText.textContent = 'Please enter an email address.';
                return;
            }

            if (EMAIL_REGEX.test(cleanVal)) {
                statusText.style.color = '#52A388'; // Success green
                statusText.textContent = 'Successfully subscribed to the flow!';
                inputField.value = '';
            } else {
                statusText.style.color = '#E04A6B';
                statusText.textContent = 'Invalid email format detected. Try again.';
            }

            setTimeout(() => {
                statusText.style.display = 'none';
            }, 4000);
        });
    }

    return {
        initNewsletter: bindNewsletterLogic
    };
})();
