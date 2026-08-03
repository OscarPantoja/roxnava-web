/* ==========================================================
   Google Analytics
========================================================== */

window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag("js", new Date());

gtag("config", "G-97QXMS26HQ");


/* ==========================================================
   Inicialización
========================================================== */

initializeAnalytics();


/* ==========================================================
   Analytics
========================================================== */

function initializeAnalytics() {
    initializeHeroCTA();
    initializeSocialLinks();
}


/* ==========================================================
   Hero
========================================================== */

function initializeHeroCTA() {
    const heroButton = document.getElementById("hero-button");

    if (!heroButton) return;

    heroButton.addEventListener("click", () => {
        sendEvent("hero_cta_click");
    });
}


/* ==========================================================
   Social Links
========================================================== */

function initializeSocialLinks() {
    const socialLinksContainer = document.querySelector(".social-links__container");

    if (!socialLinksContainer) return;

    socialLinksContainer.addEventListener("click", (event) => {

        const card = event.target.closest(".social-card");

        if (!card || !socialLinksContainer.contains(card)) return;

        trackSocialClick(card.dataset.platform);

    });
}

function trackSocialClick(platform) {

    if (!platform) return;

    sendEvent("social_click", {
        platform
    });

}


/* ==========================================================
   Eventos
========================================================== */

function sendEvent(eventName, parameters = {}) {

    gtag("event", eventName, parameters);

}