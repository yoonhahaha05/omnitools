/**
 * Ads load for every visit. Embedded widgets stay without ads.
 * Empty or unfilled units stay hidden.
 */
(function () {
  var CLIENT = 'ca-pub-3261737439776294';

  function isEmbed() {
    return document.body.classList.contains('embed-mode') ||
      window.location.search.indexOf('embed=true') !== -1;
  }

  function pushUnits() {
    if (isEmbed()) return;
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
    if (isEmbed()) return;
    document.documentElement.removeAttribute('data-ad-consent');
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

  function refresh() {
    if (isEmbed()) {
      document.documentElement.setAttribute('data-ad-consent', 'denied');
      return;
    }
    loadAds();
  }

  window.OmniConsent = {
    refresh: refresh
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refresh);
  } else {
    refresh();
  }
})();
