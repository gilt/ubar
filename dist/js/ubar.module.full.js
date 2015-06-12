(function(exports, moduleName) {
'use strict';

function create () {

  /**
   * Polyfill for the Array.prototype.reduce method
   * Taken from github.com/inexorabletash/polyfill.
   * https://github.com/inexorabletash/polyfill/blob/efdd3211a40f21f8fdd2c382074b0679cc294525/es5.js
  */
  function arrayReducePolyfill (fun /*, initialValue */) {
    if (this === void 0 || this === null) { throw new TypeError(); }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function") { throw new TypeError(); }

    // no value to return if no initial value and an empty array
    if (len === 0 && arguments.length === 1) { throw new TypeError(); }

    var k = 0;
    var accumulator;
    if (arguments.length >= 2) {
      accumulator = arguments[1];
    } else {
      do {
        if (k in t) {
          accumulator = t[k++];
          break;
        }

        // if array contains no values, no initial value to return
        if (++k >= len) { throw new TypeError(); }
      }
      while (true);
    }

    while (k < len) {
      if (k in t) {
        accumulator = fun.call(undefined, accumulator, t[k], k, t);
      }
      k++;
    }

    return accumulator;
  }
  /**
   * Polyfill for the Object.create method
   * Taken from Mozilla.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill
  */
  function objectCreatePolyfill (prototype) {
    var Temp = function () {}, result;

    if (arguments.length > 1) {
      throw Error('Second argument not supported');
    }
    if (typeof prototype != 'object') {
      throw new TypeError('Argument must be an object');
    }

    Temp.prototype = prototype;
    result = new Temp();
    Temp.prototype = null;
    return result;
  }

  /**
   * Polyfill for the String.prototype.trim method
   * Taken from Mozilla.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
  */
  function stringTrimPolyfill () {
    // Make sure we trim BOM and NBSP
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    return this.replace(rtrim, '');
  }

  Object.create = Object.create || objectCreatePolyfill;
  Array.prototype.reduce = Array.prototype.reduce || arrayReducePolyfill;
  String.prototype.trim = String.prototype.trim || stringTrimPolyfill;

  return {};
}

if (typeof define === 'function' && define.amd) {
  define(moduleName, [], create);

} else if (typeof module === 'object' && module.exports) {
  /*
    Using CommonJS syntax, we have to explicitly require each
    module because browserify uses static module analysis.
  */
  module.exports = create();

} else {
  /*
    Gilt build syntax. 'exports' variable could be window here
    or an empty object, as in Gilt's case
  */
  exports[moduleName] = create();
}

}(typeof exports === 'object' && exports || this, 'ubar_es5_polyfill' /* moduleName */));
;(function(exports, moduleName) {
'use strict';

function create () {

  var userAgent;

  /**
   * For testing only. Allows tests to set user agent globally for module.
   *
   * @protected
   * @method _setUserAgent
   *
   * @param {String} userAgentString
   */
  function _setUserAgent (userAgentString) {
    userAgent = userAgentString;
  }

  /**
   * Get user agent indirectly. Wrapper for testing purposes.
   *
   * @private
   * @method getUserAgent
   *
   * @return {String}
   */
  function getUserAgent () {
    return userAgent ? userAgent : navigator.userAgent;
  }

  /**
   * Determine if device is ios based on user agent.
   *
   * @private
   * @method isIOS
   *
   * @return {Boolean}
   */
  function isIOS () {
    return getUserAgent().match(/iPhone|iPad|iPod/i) !== null;
  }

  /**
   * Determine if device is android based on user agent.
   *
   * @private
   * @method isAndroid
   *
   * @return {Boolean}
   */
  function isAndroid () {
    return getUserAgent().match(/Android/i) !== null;
  }

  /**
   * Determine if device is windows mobile based on user agent.
   *
   * @private
   * @method isWindowsMobile
   *
   * @return {Boolean}
   */
  function isWindowsMobile () {
    return getUserAgent().match(/IEMobile/i) !== null;
  }

  /**
   * Get device ios version based on user agent.
   * Only call if we know this is an ios device.
   * Otherwise this will throw an error and return 0.
   *
   * @private
   * @method getIOSVersion
   *
   * @return {Float}
   */
  function getIOSVersion () {
    try {
      return parseFloat(getUserAgent().match(/OS (\d+)_(\d+)/)[0].split(" ")[1].replace("_", "."), 10);
    }
    catch(err) {
      console.log('Tring to get IOS version for non-IOS device. ', err.message);
      return 0;
    }

  }

  /**
   * Get device Android version based on user agent.
   * Only call if we know this is an Android device.
   * Otherwise this will throw an error and return 0.
   *
   * @private
   * @method getAndroidVersion
   *
   * @return {Float}
   */
  function getAndroidVersion () {
    try {
      return parseFloat(getUserAgent().match(/Android (\d+).(\d+)/)[0].split(" ")[1], 10);
    }
    catch(err) {
      console.log('Tring to get Android version for non-Android device. ', err.message);
      return 0;
    }
  }

  /**
   * Get device windows mobile version based on user agent.
   * Only call if we know this is an windows mobile device.
   * Otherwise this will throw an error and return 0.
   *
   * @private
   * @method getWindowsMobileVersion
   *
   * @return {Float}
   */
  function getWindowsMobileVersion () {
    try {
      return parseFloat(getUserAgent().match(/(IEMobile\/)((\d+).(\d+))/)[0].split("/")[1], 10);
    }
    catch(err) {
      console.log('Tring to get WindowsMobile version for non-WindowMobile device. ', err.message);
      return 0;
    }
  }

  /**
   * Determine if device is ios and ios version greater than
   * or equal to current minimum ios the app supports.
   *
   * @private
   * @method isSupportedIOS
   *
   * @param version {Float} supported ios version
   *
   * @return {Boolean}
   */
  function isSupportedIOS (version) {
    return isIOS() && getIOSVersion() >= version;
  }

  /**
   * Determine if device is android and android version greater than
   * or equal to current minimum ios the app supports.
   *
   * @private
   * @method isSupportedAndroid
   *
   * @param version {Float} supported android version
   *
   * @return {Boolean}
   */
  function isSupportedAndroid (version) {
    return isAndroid() && getAndroidVersion() >= version;
  }

  /**
   * Determine if device is window mobile and windows mobile version greater than
   * or equal to current minimum ios the app supports.
   *
   * @private
   * @method isSupportedWindowsMobile
   *
   * @param version {Float} supported windows mobile version
   *
   * @return {Boolean}
   */
  function isSupportedWindowsMobile (version) {
    return isWindowsMobile() && getWindowsMobileVersion() >= version;
  }

  /**
   * Determine it this device supports the app we want to direct it to
   *
   * @public
   * @method isAppSupported
   *
   * @param {Object} config  Ubar config containing device configs
   *
   * @return {Boolean}
   */
  function isAppSupported (config) {
    return config.ios_support       && isSupportedIOS(config.min_ios_support)        ||
      config.android_support        && isSupportedAndroid(config.min_android_support) ||
      config.windows_mobile_support && isSupportedWindowsMobile(config.min_windows_mobile_support);
  }

  return  {
    isAppSupported  : isAppSupported,
    isIOS           : isIOS,
    isAndroid       : isAndroid,
    isWindowsMobile : isWindowsMobile,
    _setUserAgent             : _setUserAgent,
    _isSupportedIOS           : isSupportedIOS,
    _isSupportedAndroid       : isSupportedAndroid,
    _isSupportedWindowsMobile : isSupportedWindowsMobile,
    _getIOSVersion            : getIOSVersion,
    _getAndroidVersion        : getAndroidVersion,
    _getWindowsMobileVersion  : getWindowsMobileVersion
  };
}

if (typeof define === 'function' && define.amd) {
  define(moduleName, [], create);

} else if (typeof module === 'object' && module.exports) {
  /*
    Using CommonJS syntax, we have to explicitly require each
    module because browserify uses static module analysis.
  */
  module.exports = create();

} else {
  /*
    Gilt build syntax. 'exports' variable could be window here
    or an empty object, as in Gilt's case
  */
  exports[moduleName] = create();
}

}(typeof exports === 'object' && exports || this, 'ubar_device' /* moduleName */));

;(function(exports, moduleName) {
'use strict';

/**
 * A very simple publisher subscriber system for exposing potential tracking events
*/
function create () {
  var topics = {};

  /**
   * Add a listener to a topic.
   *
   * @public
   * @method subscribe
   *
   * @param {String}  topic name
   * @param {Function}
  */
  function subscribe (topic, listener) {
    if (topic === '' || topic === undefined) return;
    if (!topics.hasOwnProperty(topic)) topics[topic] = [];

    topics[topic].push(listener);
  }

  /**
   * Call all listeners for a given topic with some data.
   *
   * @public
   * @method publish
   *
   * @param {String}  topic name. If topic does not exist, return.
   * @param {Any}  Passes data to listener functions. If data is undefined, pass empty object.
  */
  function publish (topic, data) {
    if (!topics.hasOwnProperty(topic)) return;

    for (var i = 0; i < topics[topic].length; i++) {
      if (typeof topics[topic][i] === 'function') {
        topics[topic][i](data !== undefined ? data : {});
      }
    }
  }

  return {
    subscribe : subscribe,
    publish : publish
  };
}

if (typeof define === 'function' && define.amd) {
  define(moduleName, [], create);

} else if (typeof module === 'object' && module.exports) {
  /*
    Using CommonJS syntax, we have to explicitly require each
    module because browserify uses static module analysis.
  */
  module.exports = create();

} else {
  /*
    Gilt build syntax. 'exports' variable could be window here
    or an empty object, as in Gilt's case
  */
  exports[moduleName] = create();
}

}(typeof exports === 'object' && exports || this, 'ubar_pubsub' /* moduleName */));

;(function(exports, moduleName) {
'use strict';

function create (handlebars, when, request) {

  var templatesCache = templatesCache || {};

  /**
   * Requests the provided template.
   *
   * @private
   * @method requestTemplate
   *
   * @param   {String}  templateUrl  URL of template
   *
   * @return  {Promise}              Resolves to compiled template
   */
  function requestTemplate (templateUrl) {
    var dfd = when.defer();

    request({
      url : templateUrl,
      type: 'text',
      success: function (resp) {
        dfd.resolve(handlebars.compile(resp.responseText));
      }
    });

    return dfd.promise;
  }

  /**
   * Returns a promise that resolves to a template function from templateCache.
   * If the template is not in templateCache, it requests the template and puts the template in templateCache.
   *
   * @protected
   * @method loadTemplate
   *
   * @param   {String}  templateUrl  URL of template
   *
   * @return  {Promise}              Resolves to template function or rejects with reason
   */
  function loadTemplate (templateUrl) {
    if (!templatesCache[templateUrl]) {
      templatesCache[templateUrl] = requestTemplate(templateUrl);
    }

    return templatesCache[templateUrl];
  }

  /**
   * Renders template with passed in content
   *
   * @protected
   * @method renderTemplate
   *
   * @param   {String}  templateUrl  URL of template
   * @param   {Object}  content      data to render template with
   *
   * @return  {String}               Resolves to the compiled template
   */
  function renderTemplate (templateUrl, content) {
    content = content || {};
    return loadTemplate(templateUrl).then(function (template) {
      return template(content);
    });
  }

  /**
   * View class responsible for rendering the UBAR banners
   * and hiding and showing the banners.
   *
   * @public
   * @constructor
   *
   * @params {Object} config  Config object for ubar
   */
  var UbarDom = function UbarDom (config) {
    this.MAIN_UBAR_CLASS = config.component_class;
    this.UBAR_SHOW_CLASS = config.ubar_show_class;
    this.UBAR_HIDE_CLASS = config.ubar_hide_class;

    this._renderTemplate = config.renderTemplate || renderTemplate;
    this._loadTemplate = config.loadTemplate || loadTemplate;
  };

  /**
   * Renders a template as the first element inside body.
   *
   * @public
   * @method renderBanner
   * @param  {Object} templateSource The template to render
   *
   * @return  {Promise} Resolves after adding bannder to the dom, otherwise rejects.
   */
  UbarDom.prototype.renderBanner = function renderBanner (templateSource) {
    var
      self = this,
      ubarDiv = document.createElement('div');

    return this._renderTemplate(templateSource).then(function (renderedHtml) {
      ubarDiv.innerHTML = renderedHtml;
      document.body.insertBefore(ubarDiv, document.body.firstChild);
      self.banner = document.querySelectorAll('.' + self.MAIN_UBAR_CLASS)[0];
    });
  };

  /** Loads a template, but does not render it.
   *
   * @public
   * @method loadBanner
   * @param  {Object} templateSource The template to render
   */
  UbarDom.prototype.loadBanner = function renderBanner (templateSource) {
    this._loadTemplate(templateSource);
  };

  /**
   * Removes ubar banners from the DOM.
   *
   * @public
   * @method removeBanner
   */
  UbarDom.prototype.remove = function remove () {
    if (this.banner && this.banner.parentElement) {
      document.body.removeChild(this.banner.parentElement);
      this.banner = undefined;
    }
  };

  /**
   * Hides the currently displayed banner.
   *
   * TODO: classList not supported in IE8 and IE9
   *
   * @public
   * @method hideBanner
   */
  UbarDom.prototype.hide = function hide () {
    this.banner.classList.remove(this.UBAR_SHOW_CLASS);
    this.banner.classList.add(this.UBAR_HIDE_CLASS);
  };

  /**
   * Shows the currently displayed banner.
   *
   * TODO: classList not supported in IE8 and IE9
   *
   * @public
   * @method showBanner
   */
  UbarDom.prototype.show = function show () {
    this.banner.classList.remove(this.UBAR_HIDE_CLASS);
    this.banner.classList.add(this.UBAR_SHOW_CLASS);
  };

  return UbarDom;
}

if (typeof define === 'function' && define.amd) {
  define(
    moduleName,
    ['handlebars',
     'when',
     'reqwest'],
    create
  );

} else if (typeof module === 'object' && module.exports) {
  /*
    Using CommonJS syntax, we have to explicitly require each
    module because browserify uses static module analysis.
  */
  module.exports = create(
    require('handlebars'),
    require('when'),
    require('reqwest')
  );

} else {
  /*
    Gilt build syntax. 'exports' variable could be window here
    or an empty object, as in Gilt's case
  */
  exports[moduleName] = create(
    exports.handlebars || handlebars,
    exports.when       || when,
    exports.reqwest    || reqwest
  );
}

}(typeof exports === 'object' && exports || this, 'ubar_dom' /* moduleName */));
;(function(exports, moduleName) {
'use strict';

function create (moment) {
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  /**
   * Get Time in Moments
   *
   * @public
   * @method getTimeInMoments
   */
  function getTimeInMoments ( time_string ) {
    var timeString, timeValue, timeUnit, defaultDuration;

    defaultDuration = moment.duration( 0 );

    if (!time_string) {
      console.error('Error: empty time_string in getTimeinMoments');
      return defaultDuration;
    }

    timeString = time_string.trim().split(/\s+/);
    timeValue  = parseInt( timeString[0], 10 );
    timeUnit   = timeString[1];

    if ( timeString.length > 2 ) {
      console.error('Error: time_string has invalid parameters: ' + timeString);
      return defaultDuration;
    }

    return moment.duration( timeValue, timeUnit );
  }

  /**
   * Get Time in Seconds
   *
   * @public
   * @method getTimeInSeconds
   */
  function getTimeInSeconds ( time_string ) {
    if (typeof time_string.asSeconds === 'function') {
      return time_string.asSeconds();
    }
    return getTimeInMoments( time_string ).asSeconds();
  }

  /**
   * isObject method for use in extend method.
   * Taken for Underscore.js, http://underscorejs.org/
   *
   * @private
   * @method isObject
   */
  function isObject (obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }

  /**
   * Extend method for merging config values.
   * Taken for Underscore.js, http://underscorejs.org/
   *
   * @private
   * @method extend
   */
  function extend (obj) {
    if (!isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  }

  function bind (func, context) {
    return function() {
      return func.apply(context, arguments);
    };
  }

  return {
    getTimeInMoments: getTimeInMoments,
    getTimeInSeconds: getTimeInSeconds,
    isObject: isObject,
    extend: extend,
    bind : bind
  };
}

if (typeof define === 'function' && define.amd) {
  define(moduleName, ['moment'], create);

} else if (typeof module === 'object' && module.exports) {
  /*
    Using CommonJS syntax, we have to explicitly require each
    module because browserify uses static module analysis.
  */
  module.exports = create(require('moment'));

} else {
  /*
    Gilt build syntax. 'exports' variable could be window here
    or an empty object, as in Gilt's case
  */
  exports[moduleName] = create(
    exports.moment || moment
  );
}

}(typeof exports === 'object' && exports || this, 'ubar_helpers' /* moduleName */));

;(function(exports, moduleName) {
'use strict';

function create (device, moment) {

  /**
   * An object to send users out of the browser and into native apps
   * via supported deep linking.
   * This object also tries to gracfully handle users returning to
   * the borwser after a redirect to a navtive app.
   *
   * @public
   * @constructor
   *
   * @param {Object} config  Ubar config object
   *
   */
  var Resolver = function (config) {
    this.app_store_redirect = moment.duration(config.app_store_redirect).asMilliseconds();
    this.app_deep_link_url  = this.getAppDeepLink(config);
    this.app_store_url      = this.getAppStoreUrl(config);
  };

  /**
   * Creates an invisible iframe and deep links to the app,
   * so as to avoid the ios safari alert that would say "Cannot Open Page"
   * if we assigned window.location the deep link.
   *
   * @public
   * @method redirectToApp
   */
  Resolver.prototype.redirectToApp = function redirectToApp (deepLinkToApp) {
    deepLinkToApp = deepLinkToApp || this.app_deep_link_url ;
    var ifrm = document.createElement("IFRAME");
    ifrm.style.display = "none";
    ifrm.id = "app-linker";
    ifrm.setAttribute('src', deepLinkToApp);
    document.body.appendChild(ifrm);
  };

  /**
   * Get deep link from config based on device type
   *
   * @public
   * @method getAppDeepLink
   *
   * @param {Object} config  Ubar config object
   *
   * @return {String}
  */
  Resolver.prototype.getAppDeepLink = function getAppDeepLink (config) {
    if (device.isWindowsMobile()) return config.windows_app_deep_link;
    if (device.isAndroid()) return config.android_app_deep_link;
    return config.ios_app_deep_link;
  };

  /**
   * Get app store link from config based on device type
   *
   * @public
   * @method getAppStoreUrl
   *
   * @param {Object} config  Ubar config object
   *
   * @return {String}
   */
  Resolver.prototype.getAppStoreUrl = function getAppStoreUrl (config) {
    if (device.isWindowsMobile()) return config.windows_app_store_url;
    if (device.isAndroid()) return config.android_app_store_url;
    return config.ios_app_store_url;
  };

  /**
   * Resets UBAR if User doesn't have the App
   * and takes them to the App Store to
   * Download the Gilt App
   *
   * @public
   * @method redirectToAppStore
   */
  Resolver.prototype.redirectToAppStore = function redirectToAppStore () {
    window.location.href = ( this.app_store_url );
  };

  /**
   * By checking for lapses in time in a setInterval,
   * we can tell if a user doesn't have the app (i.e.
   * there are no time skips) or has been redirected to
   * the app and now returned (i.e. there are time skips).
   * We can then redirect them to the App Store or
   * show off banner appropriately.
   *
   * @public
   * @method redirectWithFallback
   */
  Resolver.prototype.redirectWithFallback = function redirectWithFallback (success, failure, deeplink){
    failure = failure || function () {};
    success = success || function () {};

    var
      time_before_redirect = this.app_store_redirect,
      currentTime     = Date.now(),
      endTimerAt      = currentTime + (time_before_redirect),
      intervalLength  = time_before_redirect/3,
      timeThreshold   = intervalLength/2,
      self = this,
      redirectToAppStoreTimer;

      /** we want to run the interval at least three times
        * to allow for the time it takes to redirect to
        * the gilt app. The threshold is half the interval
        * time so that we can round off the milliseconds
        * between two intervals.
        */

    redirectToAppStoreTimer = setInterval(function() {
      currentTime = Date.now();
      if( currentTime >= (endTimerAt - timeThreshold) &&
          currentTime <= (endTimerAt + timeThreshold) ){
        /** This means time is progressing naturally
          * and the user has not left safari, hence
          * they don't have the app installed.
        */
        failure();

        self.redirectToAppStore();
        clearInterval(redirectToAppStoreTimer);

      }
      else if (currentTime > (endTimerAt + timeThreshold) ){
        /** This means there was a gap in time
          * which can only happen if safari successfully
          * opened the gilt app in the redirect() method
          * and has now returned to Safari.
          */
        success();

        clearInterval(redirectToAppStoreTimer);
      }

    }, intervalLength );

    self.redirectToApp(deeplink);
  };

  return Resolver;
}

if (typeof define === 'function' && define.amd) {
  define(moduleName, ['./device', 'moment'], create);

} else if (typeof module === 'object' && module.exports) {
  /*
    Using CommonJS syntax, we have to explicitly require each
    module because browserify uses static module analysis.
  */
  module.exports = create(require('./device'), require('moment'));

} else {
  /*
    Gilt build syntax. 'exports' variable could be window here
    or an empty object, as in Gilt's case
  */
  exports[moduleName] = create(
    exports.ubar_device || ubar_device,
    exports.moment      || moment
  );
}

}(typeof exports === 'object' && exports || this, 'ubar_resolver' /* moduleName */));
;(function(exports, moduleName) {
'use strict';

function create (ubarHelpers) {

  var
    docCookies, // cookie getter and setter
    ubarStorage, // Strorage constructor
    DEFAULT_BASE_PATH = '/';

  /**
   * Class responsible for getting and setting UBAR cookies.
   *
   * @public
   * @constructor
   *
   * @params {Object} config  Config object for ubar
   */
  ubarStorage = function (config) {
    if (!config) {
      console.log("Error: ubarStorage initialized with an empty config.");
      this.UBAR_KEY = "";
      this.REDIRECTED_NAME = "";
      this.EXP_DURATION_REDIRECTED_MS = 0;
      this.EXP_DURATION_DISABLED_MS = 0;
      this.EXP_DURATION_ENABLED_MS = 0;
      return;
    }

    this.UBAR_KEY = config.device_preference_cookie;
    this.REDIRECTED_NAME = config.redirected_cookie;
    this.EXP_DURATION_REDIRECTED_MS = ubarHelpers.getTimeInSeconds(config.manage_window_time);
    this.EXP_DURATION_DISABLED_MS = ubarHelpers.getTimeInSeconds(config.disabled_time);
    this.EXP_DURATION_ENABLED_MS = ubarHelpers.getTimeInSeconds(config.enabled_time);
  };

  /**
   * From Mozilla:
   * https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
   * https://developer.mozilla.org/User:fusionchess
   * This framework is released under the GNU Public License, version 3 or later.
   *    http://www.gnu.org/licenses/gpl-3.0-standalone.html
   *
   * @private
   * @method docCookies
   *
   * Syntaxes:
   *
   *  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
   *  * docCookies.getItem(name)
   *  * docCookies.removeItem(name[, path[, domain]])
   *  * docCookies.hasItem(name)
  */
  ubarStorage.prototype.docCookies = {
    getItem: function (sKey) {
      if (!sKey) { return null; }
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }
      document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
      return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
      if (!this.hasItem(sKey)) { return false; }
      document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
      return true;
    },
    hasItem: function (sKey) {
      if (!sKey) { return false; }
      return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }
  };

  /**
   * Returns whether UBAR is enabled.
   *
   * @public
   * @method isEnabled
   */
  ubarStorage.prototype.isEnabled = function isEnabled () {
    return this.docCookies.getItem(this.UBAR_KEY) === 'true';
  };

  /**
   * Returns whether UBAR has been disabled by the user.
   *
   * @public
   * @method isDisabled
   */
  ubarStorage.prototype.isDisabled = function isDisabled () {
    return this.docCookies.getItem(this.UBAR_KEY) === 'false';
  };

  /**
   * Returns whether user was redirected.
   *
   * @public
   * @method isUserRedirected
   */
  ubarStorage.prototype.isUserRedirected = function isUserRedirected () {
    return this.docCookies.getItem(this.REDIRECTED_NAME) === 'true';
  };

  /**
   * When a user is redirected via UBAR, set a storage value that records this.
   * The value of the object is true.
   *
   * @public
   * @method setRedirected
   */
  ubarStorage.prototype.setRedirected = function setRedirected () {
    this.docCookies.setItem(this.REDIRECTED_NAME, true, this.EXP_DURATION_REDIRECTED_MS, DEFAULT_BASE_PATH
      );
  };

  /**
   * UBAR is turned off. Storage expiration is set in ubar.config.
   * The value of the object is false.
   *
   * @public
   * @method disableUbar
   */
  ubarStorage.prototype.disable = function disable () {
    this.docCookies.setItem(this.UBAR_KEY, false, this.EXP_DURATION_DISABLED_MS, DEFAULT_BASE_PATH);
  };

  /**
   * UBAR is turned on. Storage expiration is set in ubar.config.
   * The value of the object is true.
   *
   * @public
   * @method enableUbar
   */
  ubarStorage.prototype.enable = function enable () {
    this.docCookies.setItem(this.UBAR_KEY, true, this.EXP_DURATION_ENABLED_MS, DEFAULT_BASE_PATH);
  };

  /**
   * Clears UBAR and UBAR Redirected storage items.
   * The value of this object is null.
   *
   * @public
   * @method clear
   */
  ubarStorage.prototype.clear = function clear () {
    this.docCookies.removeItem(this.UBAR_KEY, DEFAULT_BASE_PATH);
    this.docCookies.removeItem(this.REDIRECTED_NAME, DEFAULT_BASE_PATH);
  };

  return ubarStorage;
}

if (typeof define === 'function' && define.amd) {
  define(moduleName, ['./helpers'], create);

} else if (typeof module === 'object' && module.exports) {
  /*
    Using CommonJS syntax, we have to explicitly require each
    module because browserify uses static module analysis.
  */
  module.exports = create(require('./helpers'));

} else {
  /*
    Gilt build syntax. 'exports' variable could be window here
    or an empty object, as in Gilt's case
  */
  exports[moduleName] = create(
    exports.ubar_helpers || ubar_helpers
  );
}

}(typeof exports === 'object' && exports || this, 'ubar_storage' /* moduleName */));
;(function(exports, moduleName) {

'use strict';

function create (pubsub) {

  /**
  * Tracking:
  *
  * This module exists so that you can tie your
  * existing tracking system into the UBAR system.
  * The following events are called at various times
  * during the workflow. All you have to do is include
  * your app's specific tracking in the methods below.
  *
  * With this data, you can run analytics that tell you
  * the percentage of people who opt into UBAR as
  * well as the drop-off points.
  *
  * You can also use the data to better inform yourself
  * as to whether the user has your app installed or not.
  *
  */

  /**
  * Called when the user elects to opt into the
  * UBAR feature. Publish event with key 'ubarTurnedOn'.
  *
  * @public
  * @method: _turnUbarOn
  * @param {Object} {location : 'where this was called'}
  *
  */
  function _turnUbarOn ( trackingLocationObject ) {
    pubsub.publish('turnedUbarOn', trackingLocationObject);
  }


  /**
  * Called when the user elects to opt out of the
  * UBAR feature. Publish event with key 'ubarTurnedOff'.
  *
  * @public
  * @method: _turnUbarOff
  * @param {Object} {location : 'where this was called'}
  *
  */
  function _turnUbarOff ( trackingLocationObject ) {
    pubsub.publish('turnedUbarOff', trackingLocationObject);
  }

  /**
  * Called when the user elects to download the app.
  * Publish event with key 'choseDownloadApp'.
  *
  * @public
  * @method: _choseDownloadApp
  * @param {Object} {location : 'where this was called'}
  *
  */
  function _choseDownloadApp (trackingLocationObject) {
    pubsub.publish('choseDownloadApp', trackingLocationObject);
  }

  /**
  * Called when the user closes the Ubar banner.
  * Publish event with key 'closedBanner'.
  *
  * @public
  * @method: _closeBanner
  * @param {Object} {location : 'where this was called'}
  *
  */
  function _closeBanner (trackingLocationObject) {
    pubsub.publish('closedBanner', trackingLocationObject);
  }

  /**
  * Called when the user elects to return to the app.
  * Publish event with key 'returnedToApp'.
  *
  * @public
  * @method: _returnToApp
  * @param {Object} {location : 'where this was called'}
  *
  */
  function _returnToApp (trackingLocationObject) {
    pubsub.publish('returnedToApp', trackingLocationObject);
  }

  /**
  * Called when an attempt has been made to redirect the
  * user to the appstore to download your app.
  * Publish event with key 'attemptedToRedirectToAppStore'.
  *
  * @public
  * @method: _attemptToRedirectToAppStore
  * @param {Object} { location : 'where this was called'}
  */
  function _attemptToRedirectToAppStore ( trackingLocationObject ) {
    pubsub.publish('attemptedToRedirectToAppStore', trackingLocationObject);
  }


  /**
  * Called when an attempt has been made to redirect the
  * user into the app. Publish event with key 'attemptedToRedirectToApp'.
  *
  * @public
  * @method: _attemptToRedirectToAppStore
  * @param {Object} { location : 'where this was called'}
  */
  function _attemptToRedirectToApp ( trackingLocationObject ) {
    pubsub.publish('attemptedToRedirectToApp', trackingLocationObject);
  }


  /**
  * Called when an ubar banner is displayed to the user.
  * Publish event with key 'showedBanner'.
  *
  * @public
  * @method: _showBanner
  * @param {Object} { location : 'where this was called'}
  */
  function _showBanner ( trackingLocationObject ) {
    pubsub.publish('showedBanner', trackingLocationObject);
  }


  return {
    turnUbarOn: _turnUbarOn,
    turnUbarOff: _turnUbarOff,
    choseDownloadApp : _choseDownloadApp,
    closeBanner : _closeBanner,
    returnToApp : _returnToApp,
    attemptToRedirectToAppStore: _attemptToRedirectToAppStore,
    attemptToRedirectToApp: _attemptToRedirectToApp,
    showBanner: _showBanner
  };
}

if (typeof define === 'function' && define.amd) {
  define(moduleName, ['./pubsub'], create);

} else if (typeof module === 'object' && module.exports) {
  /*
    Using CommonJS syntax, we have to explicitly require each
    module because browserify uses static module analysis.
  */
  module.exports = create(require('./pubsub'));

} else {
  /*
    Gilt build syntax. 'exports' variable could be window here
    or an empty object, as in Gilt's case
  */
  exports[moduleName] = create(
    exports.ubar_pubsub || ubar_pubsub
  );
}

}(typeof exports === 'object' && exports || this, 'ubar_tracking' /* moduleName */));
;(function(exports, moduleName) {
'use strict';

function create (ubarHelpers) {

  /**
   * Urls:
   *
   * ios_app_store_url: This is the url for the iOS app store
   * for your app.
   *
   * ios_app_deep_link: This is the prefix for your iOS deep-link
   * routing.
   *
   * android_app_store_url: This is the url for the android app store
   * for your app.
   *
   * andorid_app_deep_link: This is the prefix for your dandroid deep-link
   * routing.
   *
   */
  var urlConfig = {
    ios_app_store_url     : 'https://itunes.apple.com/us/app/appname/id331804452?mt=8',
    ios_app_deep_link     : 'gilt://',
    android_app_store_url : 'https://play.google.com/store/apps/details?id=com.gilt.android&hl=en',
    android_app_deep_link : 'gilt://',
    windows_app_store_url : 'http://www.windowsphone.com/en-us/store/app/gilt/fff0a9b7-074c-4a43-805d-cb6c81e319f8',
    windows_app_deep_link : 'gilt://'
  };

  /**
   * Templates:
   *
   * sending_template_path: This is the initial template rendered
   * for the state where a user has not yet elected to opt
   * into the UBAR redirection.
   *
   * returning_template_path: This is the template rendered
   * for the state where a user has already opted into the UBAR
   * redirection. You can use this template for allowing a user
   * to manager her state.
   *
   */
  var templateConfig = {
    sending_template_path   : 'templates/ubar/ubar_sending.handlebars',
    returning_template_path : 'templates/ubar/ubar_returning.handlebars'
  };

  /**
   * Timing:
   *
   * Disabled sets the amount of time the banner will
   * not appear to the user. It's essentially the same
   * as if the user said "ignore."
   *
   * Enabled sets the amount of time the redirection
   * will take place. This exists once a user elects
   * to participate in ubar.
   *
   * Redirected sets the amount of time the user has
   * on the web before being redirected again. Imagine
   * the user is redirected but wants to manager her
   * settings. She has this amount of time do so before
   * being redirected again.
   *
   */
  var timingConfig = {
    enabled_time       : '1 year',
    disabled_time      : '2 weeks',
    manage_window_time : '60 seconds'
  };

  /**
   * Class Names:
   *
   * These are all of the HTML classes that need to appear
   * in the templates for UBAR to function correctly. If
   * you make changes to the class names in your default templates,
   * please make those changes here as well.
   *
   */
  var classNames = {
    component_class    : 'component-ubar',
    on_button_class    : 'ubar-open-app-button',
    install_class      : 'ubar-install-app-button',
    off_class          : 'ubar-preferences-button',
    open_in_app_class  : 'ubar-open-page-in-app-button',
    close_button_class : 'ubar-close-button',
    ubar_show_class    : 'ubar-show',
    ubar_hide_class    : 'ubar-hide'
  };

  /**
   * Cookie Names:
   *
   * These are all the cookie names which will keep track of
   * a devices UBAR preferences and state.
   *
   * ubar_preference_key is whether UBAR is on, off, or unset.
   *
   * redirected_key is if the device has been redirect in the
   * last X min (where X is another config value).
   *
  */
  var cookieNames = {
    device_preference_cookie : 'ubar',
    redirected_cookie        : 'ubar_redirected'
  };

  /**
   * Tracking Locations:
   *
   * If you take advantage of the event tracking API
   * included with tracking.js, these are the values
   * that you will be passing. To see where they are
   * implemented, see ubar.js.
   *
   * tracking_sending_banner: this is the event when
   * the ubar banner appears but the user has not
   * yet opted in.
   *
   * tracking_returning_banner: this is the event when
   * the user sees the banner after already opting in.
   *
   * tracking_account_location and tracking_site_location
   * are Gilt-specific and so they may not apply to you.
   * tracking_account_location refers to an option on the
   *
   */
  var trackingLocations = {
    tracking_sending_banner        : 'sending banner',
    tracking_returning_banner      : 'returning banner',
    tracking_account_location      : 'account',
    tracking_immediate_redirection : 'user immediately redirected'
  };

  /**
   * Redirect Interval:
   *
   * app_store_redirect is the amount of time we suspect it
   * should take for a user to have been redirected to
   * the iOS App Store and the minimum amount of time
   * before which a user could possibly return to the
   * website. For example,
   *
  */
  var redirect_interval = {
    app_store_redirect : '2.0 seconds'
  };

  /**
   * Supported Devices:
   *
   * Only show UBAR if we are on a device that supports the app we
   * want to link to. Otherwise allow mobile/responsive web expereince.
   *
   */
  var supported_devices = {
    ios_support                : true,
    min_ios_support            : 7,
    android_support            : false,
    min_android_support        : 4.3,
    windows_mobile_support     : false,
    min_windows_mobile_support : Infinity // hmmmmm
  };

  /**
   * Default Config:
   *
   * We concatenate all of the configs into one defaultConfig
   * so that consumers can override the individual keys
   * above if needed when init-ing UBAR. We break up the
   * individual configs above for documentation purposes
   * and ease of understanding only.
   *
  */
  var defaultConfig = ubarHelpers.extend(urlConfig,
                        templateConfig,
                        timingConfig,
                        classNames,
                        cookieNames,
                        trackingLocations,
                        redirect_interval,
                        supported_devices);

  return defaultConfig;
}

if (typeof define === 'function' && define.amd) {
  define(moduleName, ['./ubar_helpers'], create);

} else if (typeof module === 'object' && module.exports) {
  /*
    Using CommonJS syntax, we have to explicitly require each
    module because browserify uses static module analysis.
  */
  module.exports = create(require('./helpers'));

} else {
  /*
    Gilt build syntax. 'exports' variable could be window here
    or an empty object, as in Gilt's case
  */
  exports[moduleName] = create(exports.ubar_helpers || ubar_helpers);
}

}(typeof exports === 'object' && exports || this, 'ubar_config' /* moduleName */));
;(function(exports, moduleName) {
'use strict';

function create (
  ubar_polyfill, // returns empty object
  ubar_config,
  UbarStorage,
  UbarDom,
  device,
  pubsub,
  ubarHelpers,
  Resolver,
  ubar_tracking,
  bean,
  moment
) {

  var
    Ubar, // Ubar constructor
    ubarStorage, // storage instance
    ubarDom, // dom instance
    resolver,  // app deeplink resolver/handler
    ubarInstance; // Ubar is a Singleton

  /**
   * Binds the events of Ubar ON Banner Buttons
   *
   * @private
   * @method bindOnBannerButtonEvents
   *
   * @param {Object} config  ubar instance config
   */
  function bindOnBannerButtonEvents (config) {
    var ubarComponentDiv    = document.querySelectorAll('.' + (config.component_class) )[0],
        onButton            = ubarComponentDiv.querySelectorAll('.' + (config.on_button_class) )[0],
        installAppButton    = ubarComponentDiv.querySelectorAll('.' +(config.install_class) )[0],
        closeBannerButton   = ubarComponentDiv.querySelectorAll('.' + (config.close_button_class) )[0];

    bean.on(onButton, 'touchstart', function (ev) {
      ev.preventDefault();

      ubarStorage.enable();

      ubar_tracking.turnUbarOn({ location : config.tracking_sending_banner});

      redirect(config.tracking_sending_banner, config);
    });

    bean.on(installAppButton, 'touchstart', function (ev) {
      ev.preventDefault();

      ubar_tracking.choseDownloadApp( { location : config.tracking_sending_banner } );

      resolver.redirectToAppStore();
    });

    bean.on(closeBannerButton, 'touchstart', function (ev) {
      ev.preventDefault();

      ubar_tracking.closeBanner({ location : config.tracking_sending_banner });
      ubar_tracking.turnUbarOff({ location : config.tracking_sending_banner });

      ubarDom.remove();
      ubarStorage.disable();
    });
  }

  /**
   * Binds the events of Ubar OFF Banner Buttons
   *
   * @private
   * @method bindOffBannerButtonEvents
   *
   * @param {Object} config  ubar instance config
   */
  function bindOffBannerButtonEvents (config) {
    var ubarComponentDiv = document.querySelectorAll('.' + (config.component_class) )[0],
        offButton = ubarComponentDiv.querySelectorAll('.' + (config.off_class) )[0],
        openInAppButton = ubarComponentDiv.querySelectorAll('.' + (config.open_in_app_class) )[0],
        closeBannerButton = ubarComponentDiv.querySelectorAll('.' + (config.close_button_class) )[0];

    bean.on(offButton, 'touchstart', function (ev) {
      ev.preventDefault();

      ubarDom.remove();
      ubarStorage.disable();
      ubar_tracking.turnUbarOff({ location: config.tracking_returning_banner });
    });

    bean.on(openInAppButton, 'touchstart', function (ev) {
      ev.preventDefault();

      ubar_tracking.returnToApp();

      redirect(config.tracking_returning_banner, config);
    });

    bean.on(closeBannerButton, 'touchstart', function (ev) {
      ev.preventDefault();

      ubar_tracking.closeBanner({ location : config.tracking_returning_banner });
      ubar_tracking.turnUbarOff({ location : config.tracking_returning_banner });

      ubarDom.remove();
      ubarStorage.disable();
    });
  }

  /**
  * Attempts to redirect users to native app.
  * If user remains in safari, presumes user
  * doesn't have app, reset UBAR and redirect
  * them to the app store.
  *
  * @private
  * @method redirect
  */
  function redirect (location, config) {
    var
      // successfully redirected to the app
      successCallback = function () { },

       // fail to redirect to app, redirect to app store
      failureCallback = function () {
        ubar_tracking.attemptToRedirectToAppStore({ location: location });
      };

    ubarStorage.setRedirected();

    ubarDom.remove();

    renderOffBanner(config).then(function() {
      ubar_tracking.attemptToRedirectToApp({ location: location });
      resolver.redirectWithFallback(successCallback, failureCallback);
    });
  }

  /**
   * Renders the off banner and binds events
   *
   * @private
   * @method renderOffBanner
   *
   * @param {Object} config  ubar instance config
   *
   * @return  {Promise}       Resolves to rendered template
   */
  function renderOffBanner (config) {
    return ubarDom.renderBanner(config.returning_template_path ).then(function() {
      bindOffBannerButtonEvents(config);
      ubarDom.show();
      ubar_tracking.showBanner({ location : config.tracking_returning_banner});
    });
  }

  /**
   * Renders the on banner and binds events
   *
   * @private
   * @method renderOnBanner
   *
   * @param {Object} config  ubar instance config
   *
   * @return  {Promise}       Resolves to rendered template
   */
  function renderOnBanner (config) {
    return ubarDom.renderBanner( config.sending_template_path ).then(function() {
      bindOnBannerButtonEvents(config);
      ubarDom.show();
      ubar_tracking.showBanner({location : config.tracking_sending_banner});
    });
  }

  /**
   * Set config times using Moment library
   *
   * @private
   * @method setConfigTime
   *
   * @param {Object} config  ubar instance config
   */
  function setConfigTime (config) {
    config.enabled_time = ubarHelpers.getTimeInMoments( config.enabled_time );
    config.disabled_time = ubarHelpers.getTimeInMoments( config.disabled_time );
    config.manage_window_time = ubarHelpers.getTimeInMoments( config.manage_window_time );
    config.app_store_redirect = ubarHelpers.getTimeInMoments( config.app_store_redirect );

    return config;
  }

  /**
   * Private constructor for ubar. Ubar is a Singleton which allows the user
   * render the Open To App banner and to toggle the ubar cookie state.
   *
   * @constructor
   * @private
   * @method Ubar
   *
   * @param {Object} config  ubar instance config
   */
  Ubar = function Ubar (config) {
    this.config = setConfigTime(ubarHelpers.extend( ubar_config, config ));

    if (device.isAppSupported(this.config)) {
      ubarStorage = new UbarStorage(this.config);

      this.enable = ubarHelpers.bind(ubarStorage.enable, ubarStorage);
      this.disable = ubarHelpers.bind(ubarStorage.disable, ubarStorage);
      this.isDisabled = ubarHelpers.bind(ubarStorage.isDisabled, ubarStorage);
      this.isEnabled = ubarHelpers.bind(ubarStorage.isEnabled, ubarStorage);
      this.subscribe = pubsub.subscribe;
    } else {
      this.enable = function () {};
      this.disable = function () {};
      this.isDisabled = function () {};
      this.isEnabled = function () {};
      this.subscribe = function () {};
    }
  };

  /**
   * Render the Open To App banner.
   *
   * @public
   * @method render
   */
  Ubar.prototype.render = function render () {
    var self = this;

    if (device.isAppSupported(self.config)) {

      ubarDom = new UbarDom(self.config);
      resolver = new Resolver(self.config);

      ubarDom.loadBanner(self.config.returning_template_path);

      if (ubarStorage.isEnabled()) {
        if (ubarStorage.isUserRedirected()) {
          renderOffBanner(self.config);
        } else {
          redirect(self.config.tracking_immediate_redirection, self.config);
        }

      } else if (!ubarStorage.isDisabled()) {
        renderOnBanner(self.config);
      }
    }
  };

  /**
   * Create Ubar Singleton if it does not yet exist. Either
   * way return instance of Ubar.
   *
   * @public
   * @method init
   *
   * @param {Object} config  ubar instance config
   *
   * @return {Ubar}
   */
  function init (config) {
    if (!ubarInstance) {
      ubarInstance = new Ubar(config);
    }

    return ubarInstance;
  }

  return {
    init : init
  };
}

if (typeof define === 'function' && define.amd) {
  define(
    moduleName,
    ['./es5_polyfill',
     './config',
     './storage',
     './dom',
     './device',
     './pubsub',
     './helpers',
     './resolver',
     './tracking',
     'bean',
     'when',
     'moment'],
    create
  );

} else if (typeof module === 'object' && module.exports) {
  /*
    Using CommonJS syntax, we have to explicitly require each
    module because browserify uses static module analysis.
  */
  module.exports = create(
    require('./es5_polyfill'),
    require('./config'),
    require('./storage'),
    require('./dom'),
    require('./device'),
    require('./pubsub'),
    require('./helpers'),
    require('./resolver'),
    require('./tracking'),
    require('bean'),
    require('when'),
    require('moment')
  );

} else {
  /*
    Gilt build syntax. 'exports' variable could be window here
    or an empty object, as in Gilt's case
  */
  exports[moduleName] = create(
    exports.ubar_es5_polyfill || ubar_es5_polyfill,
    exports.ubar_config   || ubar_config,
    exports.ubar_storage  || ubar_storage,
    exports.ubar_dom      || ubar_dom,
    exports.ubar_device   || ubar_device,
    exports.ubar_pubsub   || ubar_pubsub,
    exports.ubar_helpers  || ubar_helpers,
    exports.ubar_resolver || ubar_resolver,
    exports.ubar_tracking || ubar_tracking,
    exports.bean          || bean,
    exports.when          || when,
    exports.moment        || moment
  );
}

}(typeof exports === 'object' && exports || this, 'ubar' /* moduleName */));
