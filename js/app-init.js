/**
 * Application Initializer
 * Orchestrates the loading sequence of all split files and initializes scripts.
 */
document.addEventListener('DOMContentLoaded', async () => {
    'use strict';

    // 1. Define manifest of components to load
    const componentManifest = [
        { id: 'topbar-container', file: 'components/01-topbar.html' },
        { id: 'navbar-container', file: 'components/02-navbar.html' },
        { id: 'hero-container', file: 'components/03-hero.html' },
        { id: 'flow-cards-container', file: 'components/04-flow-cards.html' },
        { id: 'education-container', file: 'components/05-education.html' },
        { id: 'pain-relief-container', file: 'components/06-pain-relief.html' },
        { id: 'inside-box-container', file: 'components/07-inside-box.html' },
        { id: 'footer-container', file: 'components/08-footer.html' }
    ];

    // 2. Execute parallel loading for maximum speed
    const loadPromises = componentManifest.map(comp => 
        ComponentLoader.load(comp.id, comp.file)
    );

    try {
        // 3. Await all structural elements to settle in the DOM
        await Promise.all(loadPromises);
        
        // 4. Boot up operational engines
        CartEngine.init();
        FormValidator.initNewsletter();
        
        console.log("FemFlow Ecosystem: Boot Sequence Complete.");
    } catch (criticalError) {
        console.error("FemFlow Ecosystem: Fatal load exception.", criticalError);
    }
});
