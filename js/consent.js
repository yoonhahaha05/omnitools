/**
 * Ad consent and ad-slot visibility.
 * The AdSense script stays unloaded until the visitor accepts cookies.
 * Empty or unfilled units stay hidden.
 */
(function () {
  var STORAGE_KEY = 'omnitools_ad_consent';
  var CLIENT = 'ca-pub-3261737439776294';

  function readChoice() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function writeChoice(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {}
  }

  function isEmbed() {
    return document.body.classList.contains('embed-mode') ||
      window.location.search.indexOf('embed=true') !== -1;
  }

  function pushUnits() {
    if (readChoice() !== 'granted') return;
    window.adsbygoogle = window.adsbygoogle || [];
    var nodes = document.querySelectorAll('ins.adsbygoogle:not([data-ad-inited])');
    nodes.forEach(function (el) {
      el.setAttribute('data-ad-inited', 'true');
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    });
    revealFilled();
  }

  function revealFilled() {
    document.querySelectorAll('.ad-slot-wrapper').forEach(function (wrap) {
      var ins = wrap.querySelector('ins.adsbygoogle');
      if (ins && ins.getAttribute('data-ad-status') === 'filled') {
        wrap.classList.add('is-filled');
      }
    });
  }

  function watchAds() {
    if (window.__omniAdWatch) return;
    window.__omniAdWatch = true;
    revealFilled();
    var observer = new MutationObserver(revealFilled);
    observer.observe(document.documentElement, {
      subtree: true,
      attributes: true,
      attributeFilter: ['data-ad-status']
    });
    var ticks = 0;
    var timer = setInterval(function () {
      revealFilled();
      ticks += 1;
      if (ticks > 20) clearInterval(timer);
    }, 500);
  }

  function loadAds() {
    if (readChoice() !== 'granted' || isEmbed()) return;
    watchAds();
    if (window.__omniAdsLoaded) {
      pushUnits();
      return;
    }
    window.__omniAdsLoaded = true;
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + CLIENT;
    script.crossOrigin = 'anonymous';
    script.onload = pushUnits;
    document.head.appendChild(script);
    pushUnits();
  }

  function applyChoice(choice) {
    if (choice === 'denied') {
      document.documentElement.setAttribute('data-ad-consent', 'denied');
    } else {
      document.documentElement.removeAttribute('data-ad-consent');
    }
  }

  function closeBanner() {
    var banner = document.getElementById('consent-banner');
    if (banner) banner.remove();
  }

  function showBanner() {
    if (isEmbed() || document.getElementById('consent-banner')) return;
    var banner = document.createElement('div');
    banner.id = 'consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Advertising cookies');
    banner.innerHTML =
      '<p class="consent-copy">Ads use cookies. The tool works either way, and what you type stays on this device.</p>' +
      '<div class="consent-actions">' +
        '<a class="consent-link" href="/pages/privacy">Privacy policy</a>' +
        '<button type="button" class="consent-reject" data-consent="denied">Use without ads</button>' +
        '<button type="button" class="consent-accept" data-consent="granted">Accept ads</button>' +
      '</div>';
    var header = document.querySelector('header');
    if (header && header.parentNode) header.insertAdjacentElement('afterend', banner);
    else document.body.insertBefore(banner, document.body.firstChild);
    banner.addEventListener('click', function (event) {
      var button = event.target.closest('[data-consent]');
      if (!button) return;
      var choice = button.getAttribute('data-consent');
      writeChoice(choice);
      applyChoice(choice);
      closeBanner();
      if (choice === 'granted') loadAds();
    });
  }

  function ensureManageLink() {
    if (isEmbed() || document.getElementById('consent-manage')) return;
    var links = document.querySelectorAll('a[href="/pages/privacy"]');
    var privacy = links[links.length - 1];
    if (!privacy || !privacy.parentElement) return;
    var button = document.createElement('button');
    button.id = 'consent-manage';
    button.type = 'button';
    button.textContent = 'Ad choices';
    button.addEventListener('click', showBanner);
    privacy.parentElement.appendChild(button);
  }

  function refresh() {
    if (isEmbed()) {
      applyChoice('denied');
      closeBanner();
      return;
    }
    var choice = readChoice();
    applyChoice(choice);
    if (choice === 'granted') loadAds();
  }

  function boot() {
    ensureManageLink();
    if (isEmbed()) {
      applyChoice('denied');
      return;
    }
    var choice = readChoice();
    applyChoice(choice);
    if (choice === 'granted') loadAds();
    else if (choice !== 'denied') showBanner();
  }

  window.OmniConsent = {
    refresh: refresh,
    open: showBanner
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
