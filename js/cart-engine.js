/**
 * CartEngine Module
 * Manages global cart state and DOM updates across dynamically loaded components.
 */
const CartEngine = (function() {
    'use strict';

    let _globalCartCount = 0;

    /**
     * Safely updates the text content to prevent XSS
     */
    function _updateCartDOM() {
        const badge = document.getElementById('globalCartCount');
        if (badge) {
            badge.textContent = _globalCartCount.toString().replace(/[^\d]/g, '');
            
            // Subtle animation feedback
            badge.style.transform = 'scale(1.3)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 200);
        }
    }

    function initializeListeners() {
        const triggers = document.querySelectorAll('.add-to-cart-trigger');
        
        triggers.forEach(button => {
            // Remove existing to prevent duplication on re-renders
            button.replaceWith(button.cloneNode(true)); 
        });

        const refreshedTriggers = document.querySelectorAll('.add-to-cart-trigger');
        refreshedTriggers.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                _globalCartCount += 1;
                _updateCartDOM();
            });
        });
    }

    return {
        init: initializeListeners,
        getCartCount: () => _globalCartCount
    };
})();
