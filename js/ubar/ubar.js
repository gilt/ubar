(function(exports, moduleName) {
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

    ubarStorage = new UbarStorage(this.config);

    this.enable = ubarStorage.enable;
    this.disable = ubarStorage.disable;
    this.isDisabled = ubarStorage.isDisabled;
    this.isEnabled = ubarStorage.isEnabled;
    this.subscribe = pubsub.subscribe;
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
     'moment',
     '.es5_polyfill'],
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
