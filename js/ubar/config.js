(function (name, root, factory) {

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(name , [], factory);

  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();

  } else {
    root[name] = factory();
  }

} ('ubar_config', this, function ubar_config () {

    'use strict';

    /**
    * Urls:
    *
    * ios_app_store_url: This is the url for the iOS app store
    * for your app.
    *
    * app_deep_link: This is the prefix for your deep-link
    * routing.
    *
    */
    var urlConfig = {
      ios_app_store_url       : 'https://itunes.apple.com/us/app/appname/id331804452?mt=8',
      app_deep_link           : 'gilt://'
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
      sending_template_path   : '../templates/ubar/ubar_sending',
      returning_template_path : '../templates/ubar/ubar_returning'
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
      enabled_time            : '1 year',
      disabled_time           : '2 weeks',
      manage_window_time      : '60 seconds'
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
      on_button_class    : 'ubar-on-button',
      install_class      : 'ubar-install-app-button',
      off_class          : 'ubar-off-button',
      open_in_app_class  : 'ubar-open-in-app-button',
      close_button_class : 'ubar-close-banner-button',
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
      device_preference_cookie = 'ubar',
      redirected_cookie = 'ubar_redirected'
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
    *
    *
    */
    var trackingLocations = {
      tracking_sending_banner : 'oafe banner',
      tracking_returning_banner : 'manage oafe banner',
      tracking_account : 'account',
      tracking_site : 'site'
    }

    /**
    * Redirect Interval:
    *
    * ios_app_store_redirect is the amount of time we suspect it
    * should take for a user to have been redirected to
    * the iOS App Store and the minimum amount of time
    * before which a user could possibly return to the
    * website. For example,
    *
    */
    var redirect_interval = {
      ios_app_store_redirect: '2 seconds'
    };

    /**
     * Supported Devices
     *
     * Only show UBAR if we are on a device that supports the app we
     * want to link to. Otherwise allow mobile/responsive web expereince.
     *
     */
    var supported_devices = {
      ios_support : true,
      min_ios_support : 7,
      android_support : false,
      min_android_suport : 4.3,
      windows_mobile_support : false,
      min_mindows_mobile_support : Infinity // Lets just not :p
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
    var defaultConfig = extend(urlConfig,
                          templateConfig,
                          timingConfig,
                          classNames,
                          cookieNames,
                          trackingLocations,
                          redirect_interval,
                          supported_devices);

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


    return {
      defaultConfig : defaultConfig,
      redirectInterval : redirect_interval
    };

}));
