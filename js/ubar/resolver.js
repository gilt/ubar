(function (name, root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(name, [], factory);

  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();

  } else {
    root[name] = factory();
  }

} ('ubar_resolver', this, function ubar_device () {

  'use strict';

  var Resolver = function (config) {
    this.app_deep_link_url      = config.app_deep_link_url;
    this.ios_app_store_url      = config.ios_app_store_url;
    this.ios_app_store_redirect = config.ios_app_store_redirect.asMilliseconds();
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
   * Resets UBAR if User doesn't have the App
   * and takes them to the App Store to
   * Download the Gilt App
   *
   * @public
   * @method redirectToAppStore
   */
  Resolver.prototype.redirectToAppStore = function redirectToAppStore () {
    window.location.href = ( this.ios_app_store_url );
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
  Resolcer.prototype.redirectWithFallback = function redirectWithFallback (success, failure, deeplink){
    failure = failure || function () {};
    success = success || function () {};

    var
      time_before_redirect = this.ios_app_store_redirect,
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

}));
