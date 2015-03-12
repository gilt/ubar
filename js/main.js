(function() {
  var
    ubar = require('./ubar/ubar'),
    defaultConfig = require('./ubar/config'),
    Storage = require('./ubar/storage'),
    storage = new Storage(defaultConfig),
    bean = require('bean');

  function init () {
    var
      clearTestButton = document.querySelectorAll('.clear-test')[0],
      trueTestButton = document.querySelectorAll('.ubar-true-test')[0],
      falseTestButton = document.querySelectorAll('.ubar-false-test')[0],
      redirectTestButton = document.querySelectorAll('.ubar-redirect-test')[0],
      reload = document.querySelectorAll('.reload')[0],
      eventSpace = document.querySelectorAll('.event-space')[0];

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

    ubar.init();
  }

  document.addEventListener("DOMContentLoaded", init);

})();
