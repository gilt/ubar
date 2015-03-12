(function() {
  var
    ubar = require('./ubar/ubar'),
    defaultConfig = require('./ubar/config'),
    Storage = require('./ubar/storage'),
    storage = new Storage(defaultConfig),
    bean = require('bean'),

    clearTestButton = document.querySelectorAll('.clear-test')[0],
    falseTestButton = document.querySelectorAll('.ubar-true-test')[0],
    trueTestButton = document.querySelectorAll('.ubar-false-test')[0];

    bean.on(clearTestButton, 'touchend', function() {
      storage.clear();
      alert('Cleared cookies!');
    });

    bean.on(falseTestButton, 'touchend', function() {
      storage.disable();
      alert('Ubar off!');
    });

    bean.on(clearTestButton, 'touchend', function() {
      storage.enable();
      alert('Ubar on!');
    });

    ubar.init();

})();
