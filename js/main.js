(function() {
  var
    ubar = require('./ubar/ubar'),
    defaultConfig = require('./ubar/config'),
    Storage = require('./ubar/storage'),
    storage = new Storage(defaultConfig),
    bean = require('bean');

  function setConfigValue () {
    if (location.search) {
      var params = location.search.replace('?', '').split('=');
      var index = params.indexOf('timing_config');
      if (index > -1) {
        return { app_store_redirect : params[index+1] + ' seconds' };
      } else {
        return {};
      }
    }
  }

  function init () {
    var
      clearTestButton = document.querySelectorAll('.clear-test')[0],
      trueTestButton = document.querySelectorAll('.ubar-true-test')[0],
      falseTestButton = document.querySelectorAll('.ubar-false-test')[0],
      redirectTestButton = document.querySelectorAll('.ubar-redirect-test')[0],
      reload = document.querySelectorAll('.reload')[0],
      eventSpace = document.querySelectorAll('.event-space')[0],
      selectTiming = document.querySelectorAll('.app-redirect-config')[0],
      fallbackTimingTest = document.querySelectorAll('.ubar-timing-test')[0];

    bean.on(clearTestButton, 'touchend', function() {
      storage.clear();
      eventSpace.innerHTML = 'Event: Cleared cookies!';
    });

    bean.on(falseTestButton, 'touchend', function() {
      storage.disable();
      eventSpace.innerHTML = 'Event: Ubar off!';
    });

    bean.on(trueTestButton, 'touchend', function() {
      storage.enable();
      eventSpace.innerHTML = 'Event: Ubar on!';
    });

    bean.on(redirectTestButton, 'touchend', function () {
      storage.enable();
      storage.setRedirected();
      eventSpace.innerHTML = 'Event: Cookies on!';
    });

    bean.on(reload, 'touchend', function () {
      location.reload();
    });

    bean.on(fallbackTimingTest, 'touchend', function () {
      debugger
      window.location.href = window.location.origin + "?timing_config=" + selectTiming.options[selectTiming.selectedIndex].value;
    });

    ubar.init(setConfigValue());
  }

  document.addEventListener("DOMContentLoaded", init);

})();
