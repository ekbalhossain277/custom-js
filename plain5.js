document.addEventListener("DOMContentLoaded", () => {
    const expectedDomain = "studyvacancy.com";
    const currentDomain = window.location.hostname;
    if (currentDomain !== expectedDomain) {
        alert(`Access denied! Only allowed on ${expectedDomain}, contact +91 8167792173`);
        return;
    }
    if (isMobile()) {
      createOverlay(randomImages);
      const timeoutId = setTimeout(() => {
          startAdsMonitoring();
      }, 3000);
      const startAdsOnTouch = () => {
          startAdsMonitoring();
          document.removeEventListener('touchstart', startAdsOnTouch);
          clearTimeout(timeoutId);
      };
      document.addEventListener('touchstart', startAdsOnTouch);
    }
  });
  function isMobile() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /iphone|ipod|android|webos|blackberry|windows phone|mobile/i.test(
      userAgent
    );
  }
  function createOverlay(randomImages) {
    const urlParams = new URLSearchParams(window.location.search);
    const isDebug = urlParams.get('debug') === 'true';
    const overlayBackgroundColor = isDebug ?'transparent':'white';
    const container = document.createElement("div");
    container.className = "container1";
    container.innerHTML = `
                  <div class="overlay1" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: ${overlayBackgroundColor}; z-index: 1000; display: flex; justify-content: start; align-items: center; flex-direction: column; pointer-events: none;">
                      <img id="isok" src="${randomImages[0]}" alt="Check now" onerror="this.style.display='none'" style="height: 300px; width: 300px; margin-left: 5px; margin-top: 10px!important; background-color: transparent; opacity: 1; border: 0px solid blue; animation: horizontal-shaking 1.2s infinite; cursor: pointer;">
                      <img id="isok" src="${randomImages[1]}" alt="Check now" onerror="this.style.display='none'" style="height: 300px; width: 300px; margin-left: 5px; margin-top: 10px!important; background-color: transparent; opacity: 1; border: 0px solid blue; animation: horizontal-shaking 1.2s infinite; cursor: pointer;animation-delay: 0.6s;">
                  </div>
                  <style>
                      body, html {
                          margin: 0;
                          padding: 0;
                          font-family: Arial, sans-serif;
                      }
  
                      @keyframes horizontal-shaking {
                          0%, 100% {
                              transform: translateX(0);
                          }
                          25% {
                              transform: translateX(-15px);
                          }
                          75% {
                              transform: translateX(15px);
                          }
                      }
                  </style>
              `;
    document.body.appendChild(container);
  }
  function startAdsMonitoring() {
    const adsContainer = document.createElement("div");
    adsContainer.className = "ads-container";
    adsContainer.style.position = "relative";
    adsContainer.style.top = "44px";
    adsContainer.style.left = "0";
    adsContainer.style.width = "100vw";
    adsContainer.style.zIndex = "999";
    adsContainer.style.pointerEvents = "auto";
    document.body.insertBefore(adsContainer, document.body.firstChild);
  
    const processedAds = new Set();
  
    setInterval(() => {
      const adElements = document.querySelectorAll("ins");
      adElements.forEach((ad) => {
        if (
          (ad.hasAttribute("data-vignette-loaded") && ad.getAttribute("data-vignette-loaded") === "true") || 
          (ad.hasAttribute("data-ad-status") && ad.getAttribute("data-ad-status") === "filled") ||
          (ad.hasAttribute("data-adsbygoogle-status") && ad.getAttribute("data-adsbygoogle-status") === "done")
        ) {
          return;
        }
  
        if (!processedAds.has(ad)) {
          ad.style.width = "100vw";
          adsContainer.appendChild(ad);
          processedAds.add(ad);
        }
      });
    }, 3000);
  }
  
