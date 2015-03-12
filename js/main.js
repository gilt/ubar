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
      redirectTestButton = document.querySelectorAll('.ubar-redirect-test')[0];

    bean.on(clearTestButton, 'touchend', function() {
      storage.clear();
      alert('Cleared cookies!');
    });

    bean.on(falseTestButton, 'touchend', function() {
      storage.disable();
      alert('Ubar off!');
    });

    bean.on(trueTestButton, 'touchend', function() {
      storage.enable();
      alert('Ubar on!');
    });

    bean.on(redirectTestButton, 'touchend', function () {
      storage.enable();
      storage.setRedirected();
      alert('Cookies on!');
    });

    ubar.init();
  }

  document.addEventListener("DOMContentLoaded", init);

})();
