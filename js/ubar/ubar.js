console.log("EEEEE");

(function (name, root, factory) {

  console.log("FFFFF");

    'use strict';
  if (typeof define === 'function' && define.amd) {
    console.log("GGGGGG");

    // AMD. Register as an anonymous module.
    define(
      name,

      [
        'config.js',
        'storage.js',
        'dom.js',
        'device.js',
        'resolver.js',
        'tracking.js',
        '../node_modules/bean.min.js',
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
      require('./config.js'),
      require('./storage.js'),
      require('./dom.js'),
      require('./device.js'),
      require('./resolver.js'),
      require('./tracking.js'),
      require('bean'),
      require('when'),
      require('moment')
    );

  } else {
    root[name] = factory(
      root.ubar_config,
      root.ubar_storage,
      root.ubar_dom,
      root.ubar_device,
      root.ubar_resolver,
      root.ubar_tracking,
      root.bean,
      root.when,
      root.moment);
  }

} ('ubar', this, function ubar (
  ubar_config,
  UbarStorage,
  UbarDom,
  device,
  Resolver,
  ubar_tracking,
  bean,
  when,
  moment
) {

  'use strict';

  var
    CONFIG = {},
    ubarStorage, // storage instance
    ubarDom, // dom instance
    resolver; // app deeplink resolver/handler

  /**
   * Binds the events of Uber ON Banner Buttons
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
   * Binds the events of Uber OFF Banner Buttons
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

      ubarStorage.disable();
      ubar_tracking.turnUbarOff({ location: CONFIG.tracking_sending_banner });

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
      ubarStorage.clear();
      ubar_tracking.attemptToRedirectToAppStore({ location: location });
    };

  ubarStorage.setRedirected();

  ubar_tracking.attemptToRedirectToApp({ location: location });

  resolver.redirectWithFallback(successCallback, failureCallback);

  ubarDom.remove();
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
    config.manage_window_time = getTimeinMoments( config.manage_window_time );
    config.app_store_redirect = getTimeinMoments( config.app_store_redirect );

    return config;
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
  }

  /* Initialize UBAR with parameters set in config.js
   *
   * @public
   * @method init
   */
  function init (user_config) {
    // TODO : user ubar = on param
    if (device.isAppSupported(CONFIG)) {

      CONFIG = setConfigTime(_.extend( ubar_config, user_config ));

      ubarStorage = new UbarStorage( CONFIG );
      ubarDom = new UbarDom( CONFIG );
      resolver = new Resolver( CONFIG );

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

}));
