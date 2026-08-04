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

    const target = document.getElementById("social-links");

    if (!target) return;

    smoothScrollTo(target, 1200);
  });
}

/* ==========================================================
   Social Links
========================================================== */

function initializeSocialLinks() {
  const socialLinksContainer = document.querySelector(
    ".social-links__container",
  );

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
    platform,
  });
}

/* ==========================================================
   Eventos
========================================================== */

function sendEvent(eventName, parameters = {}) {
  gtag("event", eventName, parameters);
}

/* ==========================================================
   Animacion de scroll - mover en siguiente entregable
========================================================== */

function smoothScrollTo(element, duration = 1200) {
  const start = window.pageYOffset;

  const end = element.getBoundingClientRect().top + start;

  const distance = end - start;

  let startTime = null;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;

    const elapsed = currentTime - startTime;

    const progress = Math.min(elapsed / duration, 1);

    const eased = easeInOutCubic(progress);

    window.scrollTo(0, start + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}
