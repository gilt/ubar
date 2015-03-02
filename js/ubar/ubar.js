(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('ubar', ['config.js','../node_modules/bean/bean.min.js', '../node_modules/when/when.js' ], factory);

  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('config.js','../node_modules/bean/bean.min.js', '../node_modules/when/when.js' ));

  }

} (this, function ubar (ubar_config, bean, when) {

    'use strict';

    var
      UBAR_COMPONENT_CLASS = 'component-ubar',
      UBAR_BUTTON_CLASSES = {
       TURN_ON          : 'ubar-on-button',
       INSTALL_APP      : 'ubar-install-app-button',
       TURN_OFF         : 'ubar-off-button',
       OPEN_IN_APP      : 'ubar-open-in-app-button',
       CLOSE_BANNER     : 'ubar-close-banner-button'
      },

      UBAR_LINKS = {
        IOS_APP_STORE : '',
        IOS_APP_HOST  : '',
        IOS_APP_PATH  : ''
      },

      TIME_BEFORE_IOS_REDIRECT = ubar_config.redirectInterval.ios_app_store.asMilliseconds();

    /**
     * Binds the events of Uber ON Banner Buttons
     *
     * @private
     * @method bindOnBannerButtonEvents
     */

    function bindOnBannerButtonEvents () {
      var ubarComponentDiv = document.querySelectorAll('.' + UBAR_COMPONENT_CLASS)[0],
          onButton = ubarComponentDiv.querySelectorAll('.' + UBAR_BUTTON_CLASSES.TURN_ON)[0],
          installAppButton = ubarComponentDiv.querySelectorAll('.' + UBAR_BUTTON_CLASSES.INSTALL_APP)[0],
          closeBannerButton = ubarComponentDiv.querySelectorAll('.' + UBAR_BUTTON_CLASSES.CLOSE_BANNER)[0];

      bean.on(onButton, 'touchstart', function (ev) {
        ev.preventDefault();
        enable();

        redirect();
      });

      bean.on(installAppButton, 'touchstart', function (ev) {
        ev.preventDefault();
        redirectToAppStore();
      });

      bean.on(closeBannerButton, 'touchstart', function (ev) {
        ev.preventDefault();

        ubar_dom.remove();
        disable();
      });
    }

    /**
     * Binds the events of Uber OFF Banner Buttons
     *
     * @private
     * @method bindOffBannerButtonEvents
     */
    function bindOffBannerButtonEvents () {
      var ubarComponentDiv = document.querySelectorAll('.' + UBAR_COMPONENT_CLASS)[0],
          offButton = ubarComponentDiv.querySelectorAll('.' + UBAR_BUTTON_CLASSES.TURN_OFF)[0],
          openInAppButton = ubarComponentDiv.querySelectorAll('.' + UBAR_BUTTON_CLASSES.OPEN_IN_APP)[0],
          closeBannerButton = ubarComponentDiv.querySelectorAll('.' + UBAR_BUTTON_CLASSES.CLOSE_BANNER)[0];

      bean.on(offButton, 'touchstart', function (ev) {
        ev.preventDefault();
        disable();

      });

      bean.on(openInAppButton, 'touchstart', function (ev) {
        ev.preventDefault();
        redirect();
      });

      bean.on(closeBannerButton, 'touchstart', function (ev) {
        ev.preventDefault();

        ubar_dom.remove();
        disable();
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

      window.location.href = UBAR_LINKS.IOS_APP_STORE;
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
      ubar_storage.setRedirected();

      redirectToAppStoreOrRenderOffBanner();
      redirectToApp(UBAR_LINKS.IOS_APP_HOST + UBAR_LINKS.IOS_APP_PATH);

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

      var currentTime = Date.now() ,
          endTimerAt = currentTime + (TIME_BEFORE_IOS_REDIRECT),
          intervalLength = TIME_BEFORE_IOS_REDIRECT/3,
          timeThreshold = intervalLength/2,
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
      when(ubar_dom.renderUbarOffBanner()).then(function() {
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
      when(ubar_Dom.renderUberOnBanner()).then(function() {
        bindOnBannerButtonEvents();
        ubar_dom.show();
      });
    }

    function init (appStoreLink, host, path) {

      UBAR_LINKS.IOS_APP_STORE = appStoreLink;
      UBAR_LINKS.IOS_APP_HOST = host;
      UBAR_LINKS.IOS_APP_PATH = path;
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
