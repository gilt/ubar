(function() {
  /*
    For testing only. No need to do UMD syntax :)
  */
  var
    ubar = require('./ubar/ubar'),
    defaultConfig = require('./ubar/config'),
    Storage = require('./ubar/storage'),
    storage = new Storage(defaultConfig),
    bean = require('bean'),
    helpers = require('./ubar/helpers'),
    cookieValues = {};

  function setConfigValuesFromUrl () {
    var paramsArray, key, value;
    if (location.search) {
      var paramsArray = decodeURIComponent(window.location.search.substring(1)).split('&');
      for (var i = 0; i < paramsArray.length; i++) {
        key = paramsArray[i].split('=')[0];
        value = paramsArray[i].split('=')[1].replace('+', ' ');
        if (key in defaultConfig) {
          defaultConfig[key] = value;
        }
        if (key in cookieValues) {
          if (value === 'true') value = true;
          if (value === 'false') value = false;
          if (value === 'undefined') value = undefined;
          cookieValues[key] = value;
        }
      }
    }
  }

  function getStorageCookieValues () {
    cookieValues.ubar_redirect_cookie = storage.isUserRedirected() ? true : undefined;
    if (storage.isEnabled()) {
      cookieValues.ubar_cookie = true;
    } else if (storage.isDisabled()) {
      cookieValues.ubar_cookie = false;
    } else {
      cookieValues.ubar_cookie = undefined;
    }
  }

  // its funky...
  function setCookiesFromConfig () {
    storage.clear();
    if (cookieValues.ubar_cookie === true) {
      storage.enable();
    } else if (cookieValues.ubar_cookie === false) {
      storage.disable();
    }

    if (storage.ubar_redirect_cookie === true) storage.setRedirected();
  }

  function setPageCookieValues () {
    var
      cookieSelects = document.querySelectorAll('select.cookie'),
      dataKey,
      el;

    for (var i = 0; i < cookieSelects.length; i++) {
      el = cookieSelects[i];
      dataKey = el.getAttribute('name');

      for (var j = 0; j < el.options.length; j++) {
        if (compareDataAttrAndConfig(el.options[j].value, cookieValues[dataKey])) {
          el.selectedIndex = j;
          break;
        }
      }
    }
  }

  function setPageInputUrls () {
    var
      inputs = document.querySelectorAll('input.url_config'),
      dataKey,
      el;

    for (var i = 0; i < inputs.length; i++) {
      dataKey = inputs[i].getAttribute('name');
      if (defaultConfig[dataKey]) {
        inputs[i].value = defaultConfig[dataKey];
      }
    }
  }

  function setSelectConfigs () {
    var
      configSelects = document.querySelectorAll('select.select_config'),
      dataKey,
      el,
      elValue,
      configValue;

    for (var i = 0; i < configSelects.length; i++) {
      el = configSelects[i];
      dataKey = el.getAttribute('name');

      for (var j = 0; j < el.options.length; j++) {
        if (compareDataAttrAndConfig(el.options[j].value, defaultConfig[dataKey])) {
          el.selectedIndex = j;
          break;
        }
      }
    }
  }

  function compareDataAttrAndConfig (data, config) {
    if (typeof config === 'number') {
      data = parseFloat(data, 10);
    } else if (typeof config === 'boolean') {
      config = config.toString();
    } else if (data === 'undefined') {
      data = undefined;
    }
    return data === config;
  }

  function setConfigs () {
    getStorageCookieValues();
    setConfigValuesFromUrl();
    setCookiesFromConfig();
  }

  function setPageValues () {
    setPageCookieValues();
    setPageInputUrls();
    setSelectConfigs();
  }

  function init () {
    var refreshButton = document.querySelectorAll('.refresh-button')[0];

    setConfigs();
    setPageValues();

    bean.on(refreshButton, 'touchend click', function () {
      location.href = location.origin + location.pathname;
    });

    ubar.init(defaultConfig);
  }

  document.addEventListener("DOMContentLoaded", init);

})();
