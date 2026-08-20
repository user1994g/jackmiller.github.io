(function recoverFromRetiredBundle() {
  if (window.__jackLegacyBundleRecovery) {
    return;
  }
  window.__jackLegacyBundleRecovery = true;

  function fallback() {
    window.location.replace('/__boot-recovery/' + String(Date.now()));
  }

  function safeAsset(asset, directory, extension) {
    if (!asset) {
      return null;
    }

    var url = new URL(asset, window.location.origin);
    var pattern = new RegExp('^/static/' + directory + '/main\\.[A-Za-z0-9]+\\.' + extension + '$');
    return url.origin === window.location.origin && pattern.test(url.pathname) ? url.pathname : null;
  }

  var probePath = '/__boot-recovery/' + String(Date.now()) + '-' + Math.random().toString(36).slice(2) + '.html';

  fetch(probePath, { cache: 'no-store', headers: { Accept: 'text/html' } })
    .then(function (response) {
      return response.text();
    })
    .then(function (html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var currentStyle = doc.querySelector('link[href*="/static/css/main."]');
      var currentScript = doc.querySelector('script[src*="/static/js/main."]');
      var stylesheet = safeAsset(currentStyle && currentStyle.getAttribute('href'), 'css', 'css');
      var scriptSource = safeAsset(currentScript && currentScript.getAttribute('src'), 'js', 'js');

      if (stylesheet) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = stylesheet;
        document.head.appendChild(link);
      }

      if (!scriptSource) {
        throw new Error('Current build script was not found.');
      }

      var script = document.createElement('script');
      script.src = scriptSource;
      script.async = false;
      script.onerror = fallback;
      document.head.appendChild(script);
    })
    .catch(fallback);
}());
