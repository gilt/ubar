(function(exports, moduleName) {
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
    deepLinkToApp = deepLinkToApp || this.app_deep_link_url;

    if (device.isIOS && device._getIOSVersion() > 8) {
      window.location.href = deepLinkToApp;
    } else {
      var ifrm = document.createElement("IFRAME");
      ifrm.style.display = "none";
      ifrm.id = "app-linker";
      ifrm.setAttribute('src', deepLinkToApp);
      document.body.appendChild(ifrm);
    }
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
