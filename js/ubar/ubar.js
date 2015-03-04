(function (name, root, factory) {

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(
      name,

      [
        'config.js',
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
      require('../node_modules/bean/bean.min.js'),
      require('../node_modules/when/when.js'),
      require('../node_modules/moment/min/moment.min.js')
    );

  } else {
    root[name] = factory(
      root['uber_config'],
      root['bean'],
      root['when'],
      root['moment']);
  }

} ('ubar', this, function ubar (ubar_config, bean, when) {

    'use strict';

    var
      USER_CONFIG              = {},
      DEFAULT_CONFIG           = ubar_config.defaultConfig,
      TIME_BEFORE_IOS_REDIRECT = ubar_config.redirectInterval.ios_app_store.asMilliseconds();

    /**
     * Binds the events of Uber ON Banner Buttons
     *
     * @private
     * @method bindOnBannerButtonEvents
     */

    function bindOnBannerButtonEvents () {
      var ubarComponentDiv    = document.querySelectorAll('.' + (USER_CONFIG.component_class || DEFAULT_CONFIG.component_class) )[0],
          onButton            = ubarComponentDiv.querySelectorAll('.' + (USER_CONFIG.on_class || DEFAULT_CONFIG.on_class) )[0],
          installAppButton    = ubarComponentDiv.querySelectorAll('.' +(USER_CONFIG.install_class || DEFAULT_CONFIG.install_class) )[0],
          closeBannerButton   = ubarComponentDiv.querySelectorAll('.' + (USER_CONFIG.close_class || DEFAULT_CONFIG.close_class) )[0];

      bean.on(onButton, 'touchstart', function (ev) {
        ev.preventDefault();
        ubar_storage.enable( getTimeInSeconds(USER_CONFIG.enabled_time || DEFAULT_CONFIG.enabled_time ) );

        redirect();
      });

      bean.on(installAppButton, 'touchstart', function (ev) {
        ev.preventDefault();
        redirectToAppStore();
      });

      bean.on(closeBannerButton, 'touchstart', function (ev) {
        ev.preventDefault();

        ubar_dom.remove();
        ubar_storage.disable( getTimeInSeconds(USER_CONFIG.disabled_time || DEFAULT_CONFIG.disabled_time ) );
      });
    }

    /**
     * Binds the events of Uber OFF Banner Buttons
     *
     * @private
     * @method bindOffBannerButtonEvents
     */
    function bindOffBannerButtonEvents () {
      var ubarComponentDiv = document.querySelectorAll('.' + (USER_CONFIG.component_class || DEFAULT_CONFIG.component_class) )[0],
          offButton = ubarComponentDiv.querySelectorAll('.' + (USER_CONFIG.off_class || DEFAULT_CONFIG.off_class) )[0],
          openInAppButton = ubarComponentDiv.querySelectorAll('.' + (USER_CONFIG.open_in_app_class || DEFAULT_CONFIG.open_in_app_class) )[0],
          closeBannerButton = ubarComponentDiv.querySelectorAll('.' + (USER_CONFIG.close_class || DEFAULT_CONFIG.close_class) )[0];

      bean.on(offButton, 'touchstart', function (ev) {
        ev.preventDefault();
        ubar_storage.disable( getTimeInSeconds(USER_CONFIG.disabled_time || DEFAULT_CONFIG.disabled_time ) );

      });

      bean.on(openInAppButton, 'touchstart', function (ev) {
        ev.preventDefault();
        redirect();
      });

      bean.on(closeBannerButton, 'touchstart', function (ev) {
        ev.preventDefault();

        ubar_dom.remove();
        ubar_storage.disable( getTimeInSeconds(USER_CONFIG.disabled_time || DEFAULT_CONFIG.disabled_time ) );
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
      deepLinkToApp = deepLinkToApp || UBAR_LINKS.IOS_APP_HOST;
      var ifrm = document.createElement("IFRAME");
      ifrm.style.display = "none";
      ifrm.id="app-linker";
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

      window.location.href = ( USER_CONFIG.ios_app_store || DEFAULT_CONFIG.ios_app_store );
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
      ubar_storage.setRedirected( USER_CONFIG.manage_window_time || DEFAULT_CONFIG.manage_window_time );

      redirectToAppStoreOrRenderOffBanner();
      redirectToApp( USER_CONFIG.app_deep_link || DEFAULT_CONFIG.app_deep_link );

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

      var currentTime     = Date.now() ,
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
          ubar_storage.clear();
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
      when(ubar_dom.renderTemplate( USER_CONFIG.returning_template_path || DEFAULT_CONFIG.returning_template_path )).then(function() {
        bindOffBannerButtonEvents();
        ubar_dom.show();
      });
    }

    /**
     * Renders the on banner and binds events
     *
     * @private
     * @method renderOnBanner
     */
    function renderOnBanner() {
      when(ubar_Dom.renderUberOnBanner( USER_CONFIG.sending_template_path || DEFAULT_CONFIG.sending_template_path )).then(function() {
        bindOnBannerButtonEvents();
        ubar_dom.show();
      });
    }

    /**
     * Get Time in Seconds
     *
     * @private
     * @method getTimeinSeconds
     */
    function getTimeinSeconds(time_string) {

      var timeString = time_string.split(" "),
          timeValue  = parseInt(timeString[0], 10);
          timeUnit   = timeString[1];

      return moment.duration( timeValue, timeUnit ).asSeconds() ;
    }

    /* Initialize UBAR with parameters set in config.js
     *
     * @public
     * @method init
     */
    function init (user_config) {

      USER_CONFIG = user_config;

      // TODO : user ubar = on param

      if (ubar_storage.isEnabled()) {
        ubar_storage.isUserRedirected() ? renderOffBanner() : redirect();

      } else if (!ubar_storage.isDisabled()) {
        renderOnBanner();
      }

    }

    return {
      init : init
    };

}));
