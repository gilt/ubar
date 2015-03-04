(function (name, root, factory) {

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(
      name,

      [
        'config.js',
        'storage.js'
        'tracking.js',
        '../node_modules/bean/bean.min.js',
        '../node_modules/when/when.js',
        '../node_modules/moment/min/moment.min.js'
      ],

      factory
    );

  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(
      require('config.js'),
      require('storage'),
      require('tracking.js'),
      require('../node_modules/bean/bean.min.js'),
      require('../node_modules/when/when.js'),
      require('../node_modules/moment/min/moment.min.js')
    );

  } else {
    root[name] = factory(
      root['uber_config'],
      root['ubar_storage'],
      root['ubar_tracking']
      root['bean'],
      root['when'],
      root['moment']);
  }

} ('ubar', this, function ubar (ubar_config, UbarStorage, ubar_tracking, bean, when) {

    'use strict';

    var
      CONFIG = {},
      ubarStorage; // storage instance

    /**
     * Binds the events of Uber ON Banner Buttons
     *
     * @private
     * @method bindOnBannerButtonEvents
     */

    function bindOnBannerButtonEvents () {
      var ubarComponentDiv    = document.querySelectorAll('.' + (CONFIG.component_class) )[0],
          onButton            = ubarComponentDiv.querySelectorAll('.' + (CONFIG.on_class) )[0],
          installAppButton    = ubarComponentDiv.querySelectorAll('.' +(CONFIG.install_class) )[0],
          closeBannerButton   = ubarComponentDiv.querySelectorAll('.' + (CONFIG.close_class) )[0];

      bean.on(onButton, 'touchstart', function (ev) {
        ev.preventDefault();

        ubarStorage.enable();

        ubar_tracking.turnUbarOn();

        redirect();
      });

      bean.on(installAppButton, 'touchstart', function (ev) {
        ev.preventDefault();
        redirectToAppStore();
      });

      bean.on(closeBannerButton, 'touchstart', function (ev) {
        ev.preventDefault();

        ubar_dom.remove();
        ubarStorage.disable();
      });
    }

    /**
     * Binds the events of Uber OFF Banner Buttons
     *
     * @private
     * @method bindOffBannerButtonEvents
     */
    function bindOffBannerButtonEvents () {
      var ubarComponentDiv = document.querySelectorAll('.' + (CONFIG.component_class) )[0],
          offButton = ubarComponentDiv.querySelectorAll('.' + (CONFIG.off_class)[0],
          openInAppButton = ubarComponentDiv.querySelectorAll('.' + (CONFIG.open_in_app_class) )[0],
          closeBannerButton = ubarComponentDiv.querySelectorAll('.' + (CONFIG.close_class) )[0];

      bean.on(offButton, 'touchstart', function (ev) {
        ev.preventDefault();

        ubarStorage.disable();

        ubar_tracking.turnUbarOff();

      });

      bean.on(openInAppButton, 'touchstart', function (ev) {
        ev.preventDefault();
        redirect();
      });

      bean.on(closeBannerButton, 'touchstart', function (ev) {
        ev.preventDefault();

        ubar_dom.remove();
        ubarStorage.disable();
      });
    }

    /**
     * Creates an invisible iframe and deep links to the app,
     * so as to avoid the ios safari alert that would say "Cannot Open Page"
     * if we assigned window.location the deep link.
     *
     * @private
     * @method redirectToApp
     */
    function redirectToApp(deepLinkToApp) {
      deepLinkToApp = deepLinkToApp || CONFIG.app_deep_link ;
      var ifrm = document.createElement("IFRAME");
      ifrm.style.display = "none";
      ifrm.id = "app-linker";
      ifrm.setAttribute('src', deepLinkToApp);
      document.body.appendChild(ifrm);
    }

    /**
     * Resets UBAR if User doesn't have the App
     * and takes them to the App Store to
     * Download the Gilt App
     *
     * @private
     * @method redirectToApp
     */

    function redirectToAppStore() {
      ubar_tracking.attemptToRedirectToAppStore();

      window.location.href = ( CONFIG.ios_app_store_url );
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
    function redirect() {
      ubarStorage.setRedirected();

      ubar_tracking.attemptToRedirectToApp();

      redirectToAppStoreOrRenderOffBanner();
      redirectToApp( CONFIG.app_deep_link );

      ubar_dom.remove();
    }

    /**
     * By checking for lapses in time in a setInterval,
     * we can tell if a user doesn't have the app (i.e.
     * there are no time skips) or has been redirected to
     * the app and now returned (i.e. there are time skips).
     * We can then redirect them to the App Store or
     * show off banner appropriately.
     *
     * @private
     * @method redirectToAppStoreOrRenderOffBanner
     */
    function redirectToAppStoreOrRenderOffBanner(){

      var
        TIME_BEFORE_IOS_REDIRECT = CONFIG.ios_app_store_redirect.asMilliseconds(),
        currentTime     = Date.now(),
        endTimerAt      = currentTime + (TIME_BEFORE_IOS_REDIRECT),
        intervalLength  = TIME_BEFORE_IOS_REDIRECT/3,
        timeThreshold   = intervalLength/2,
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
          ubarStorage.clear();
          redirectToAppStore();
          clearInterval(redirectToAppStoreTimer);

        }
        else if (currentTime > (endTimerAt + timeThreshold) ){
          /** This means there was a gap in time
            * which can only happen if safari successfully
            * opened the gilt app in the redirect() method
            * and has now returned to Safari.
            */
          renderOffBanner();
          clearInterval(redirectToAppStoreTimer);
        }

      }, intervalLength );
    }
    /**
     * Renders the off banner and binds events
     *
     * @private
     * @method renderOffBanner
     */
    function renderOffBanner() {
      when(ubar_dom.renderTemplate( CONFIG.returning_template_path )).then(function() {
        bindOffBannerButtonEvents();
        ubar_dom.show();
        ubar_tracking.showReturningBanner();
      });
    }

    /**
     * Renders the on banner and binds events
     *
     * @private
     * @method renderOnBanner
     */
    function renderOnBanner() {
      when(ubar_Dom.renderUberOnBanner( CONFIG.sending_template_path )).then(function() {
        bindOnBannerButtonEvents();
        ubar_dom.show();
        ubar_tracking.showSendingBanner();
      });
    }

    /**
     * Get Time in Seconds
     *
     * @private
     * @method getTimeinMoments
     */
    function getTimeinMoments(time_string) {

      var timeString = time_string.split(" "),
          timeValue  = parseInt(timeString[0], 10);
          timeUnit   = timeString[1];

      return moment.duration( timeValue, timeUnit );
    }

    /**
     * Set config times using Moment library
     *
     * @private
     * @method setConfigTime
     */
    function setConfigTime (config) {
      config.enabled_time = getTimeinMoments( config.enabled_time );
      config.disable_time = getTimeinMoments( config.disable_time );
      config.manage_window_time = getTimeinMoments (config.manage_window_time );
      config.ios_app_store = getTimeinMoments( config.ios_app_store_redirect );

      return config;
    }

    /**
     * Extend method for merging config values.
     * Taken for Underscore.js, http://underscorejs.org/
     *
     * @private
     * @method extend
     */
    function extend (obj) {
      if (!_.isObject(obj)) return obj;
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
    };

    /* Initialize UBAR with parameters set in config.js
     *
     * @public
     * @method init
     */
    function init (user_config) {

      CONFIG = setConfigTime(_.extend( config.defaultConfig, user_config ));

      ubarStorage = new UbarStorage( CONFIG );

      // TODO : user ubar = on param

      if (ubarStorage.isEnabled()) {
        ubarStorage.isUserRedirected() ? renderOffBanner() : redirect();

      } else if (!ubarStorage.isDisabled()) {
        renderOnBanner();
      }

    }

    return {
      init : init
    };

}));
