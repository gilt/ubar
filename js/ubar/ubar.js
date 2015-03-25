(function(exports, moduleName) {
'use strict';

function create (
  ubar_config,
  UbarStorage,
  UbarDom,
  device,
  ubarHelpers,
  Resolver,
  ubar_tracking,
  bean,
  moment
) {

  var
    CONFIG = {},
    ubarStorage, // storage instance
    ubarDom, // dom instance
    resolver; // app deeplink resolver/handler

  /**
   * Binds the events of Ubar ON Banner Buttons
   *
   * @private
   * @method bindOnBannerButtonEvents
   */
  function bindOnBannerButtonEvents () {
    var ubarComponentDiv    = document.querySelectorAll('.' + (CONFIG.component_class) )[0],
        onButton            = ubarComponentDiv.querySelectorAll('.' + (CONFIG.on_button_class) )[0],
        installAppButton    = ubarComponentDiv.querySelectorAll('.' +(CONFIG.install_class) )[0],
        closeBannerButton   = ubarComponentDiv.querySelectorAll('.' + (CONFIG.close_button_class) )[0];

    bean.on(onButton, 'touchstart', function (ev) {
      ev.preventDefault();

      ubarStorage.enable();

      ubar_tracking.turnUbarOn({ location : CONFIG.tracking_sending_banner});

      redirect(CONFIG.tracking_sending_banner);
    });

    bean.on(installAppButton, 'touchstart', function (ev) {
      ev.preventDefault();

      resolver.redirectToAppStore();
    });

    bean.on(closeBannerButton, 'touchstart', function (ev) {
      ev.preventDefault();

      ubarDom.remove();
      ubarStorage.disable();
    });
  }

  /**
   * Binds the events of Ubar OFF Banner Buttons
   *
   * @private
   * @method bindOffBannerButtonEvents
   */
  function bindOffBannerButtonEvents () {
    var ubarComponentDiv = document.querySelectorAll('.' + (CONFIG.component_class) )[0],
        offButton = ubarComponentDiv.querySelectorAll('.' + (CONFIG.off_class) )[0],
        openInAppButton = ubarComponentDiv.querySelectorAll('.' + (CONFIG.open_in_app_class) )[0],
        closeBannerButton = ubarComponentDiv.querySelectorAll('.' + (CONFIG.close_button_class) )[0];

    bean.on(offButton, 'touchstart', function (ev) {
      ev.preventDefault();

      ubarDom.remove();
      ubarStorage.disable();
      ubar_tracking.turnUbarOff({ location: CONFIG.tracking_returning_banner });
    });

    bean.on(openInAppButton, 'touchstart', function (ev) {
      ev.preventDefault();

      redirect(CONFIG.tracking_returning_banner);
    });

    bean.on(closeBannerButton, 'touchstart', function (ev) {
      ev.preventDefault();

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
  function redirect (location) {
    var
      // successfully redirected to the app
      successCallback = function () { renderOffBanner(); },

       // fail to redirect to app, redirect to app store
      failureCallback = function () {
        ubar_tracking.attemptToRedirectToAppStore({ location: location });
      };

    ubarStorage.setRedirected();
    ubarDom.remove();
    ubar_tracking.attemptToRedirectToApp({ location: location });

    resolver.redirectWithFallback(successCallback, failureCallback);
  }

  /**
   * Renders the off banner and binds events
   *
   * @private
   * @method renderOffBanner
   */
  function renderOffBanner() {
    ubarDom.renderBanner( CONFIG.returning_template_path ).then(function() {
      bindOffBannerButtonEvents();
      ubarDom.show();
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
    ubarDom.renderBanner( CONFIG.sending_template_path ).then(function() {
      bindOnBannerButtonEvents();
      ubarDom.show();
      ubar_tracking.showSendingBanner();
    });
  }

  /**
   * Set config times using Moment library
   *
   * @private
   * @method setConfigTime
   */
  function setConfigTime (config) {
    config.enabled_time = ubarHelpers.getTimeInMoments( config.enabled_time );
    config.disabled_time = ubarHelpers.getTimeInMoments( config.disabled_time );
    config.manage_window_time = ubarHelpers.getTimeInMoments( config.manage_window_time );
    config.app_store_redirect = ubarHelpers.getTimeInMoments( config.app_store_redirect );

    return config;
  }

  /**
   * Renders the on banner and binds events
   *
   * @private
   * @method renderOnBanner
   */
  function renderOnBanner() {
    ubarDom.renderBanner( CONFIG.sending_template_path ).then(function() {
      bindOnBannerButtonEvents();
      ubarDom.show();
      ubar_tracking.showSendingBanner();
    });
  }

  /* Initialize UBAR with parameters set in config.js
   *
   * @public
   * @method init
   */
  function init (user_config) {
    // TODO : user ubar = on param
    CONFIG = setConfigTime(ubarHelpers.extend( ubar_config, user_config ));

    if (device.isAppSupported(CONFIG)) {
      ubarStorage = new UbarStorage( CONFIG );
      ubarDom = new UbarDom( CONFIG );
      resolver = new Resolver( CONFIG );

      // TODO: preload ubar off banner template here

      if (ubarStorage.isEnabled()) {
        ubarStorage.isUserRedirected() ? renderOffBanner() : redirect(CONFIG.tracking_immediate_redirection);

      } else if (!ubarStorage.isDisabled()) {
        renderOnBanner();
      }
    }
  }

  return {
    init : init,
    _bindOnBannerButtonEvents : bindOnBannerButtonEvents
  };
}

if (typeof define === 'function' && define.amd) {
  define(
    moduleName,
    ['./config',
     './storage',
     './dom',
     './device',
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
    require('./config'),
    require('./storage'),
    require('./dom'),
    require('./device'),
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
    exports.ubar_config   || ubar_config,
    exports.ubar_storage  || ubar_storage,
    exports.ubar_dom      || ubar_dom,
    exports.ubar_device   || ubar_device,
    exports.ubar_helpers  || ubar_helpers,
    exports.ubar_resolver || ubar_resolver,
    exports.ubar_tracking || ubar_tracking,
    exports._             || bean,
    exports.when          || when,
    exports.moment        || moment
  );
}

}(typeof exports === 'object' && exports || this, 'ubar' /* moduleName */));
