/**
 * ComponentLoader Module
 * Handles asynchronous fetching and injection of HTML template fragments.
 */
const ComponentLoader = (function() {
    'use strict';

    /**
     * Core fetching mechanism using Promises
     * @param {string} targetContainerId - The DOM ID to inject into
     * @param {string} componentFilePath - Relative path to HTML component
     * @returns {Promise}
     */
    async function fetchAndInject(targetContainerId, componentFilePath) {
        try {
            const response = await fetch(componentFilePath);
            if (!response.ok) {
                throw new Error(`HTTP Error Status: ${response.status} for ${componentFilePath}`);
            }
            const htmlString = await response.text();
            const container = document.getElementById(targetContainerId);
            
            if (container) {
                container.innerHTML = htmlString;
                return true;
            }
            return false;
        } catch (error) {
            console.error(`[ComponentLoader] Core injection failed for ${targetContainerId}:`, error);
            return false;
        }
    }

    return {
        load: fetchAndInject
    };
})();
