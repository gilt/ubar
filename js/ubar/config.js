(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('ubar_config', ['../node_modules/moment/min/moment.min.js'], factory);

  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('../node_modules/moment/min/moment.min.js'));

  }

} (this, function ubar_config (moment) {

    'use strict';

    var defaultConfig = {
        ios_app_store_url       : 'https://itunes.apple.com/us/app/appname/id331804452?mt=8',
        app_deep_link           : 'gilt://',
        sending_template_path   : '../templates/ubar/ubar_sending',
        returning_template_path : '../templates/ubar/ubar_returning',
        enabled_time            : '1 year',
        disabled_time           : '2 weeks',
        manage_window_time      : '60 seconds',
        component_class         : 'component-ubar',
        on_class                : 'ubar-on-button',
        install_class           : 'ubar-install-app-button',
        off_class               : 'ubar-off-button',
        open_in_app_class       : 'ubar-open-in-app-button',
        close_class             : 'ubar-close-banner-button'
    },

    /**
    * Redirect Interval:
    *
    * ios_app_store is the amount of time we suspect it
    * should take for a user to have been redirected to
    * the iOS App Store and the minimum amount of time
    * before which a user could possibly return to the
    * website. For example,
    *
    */
      redirect_interval = {
        ios_app_store: moment.duration(2, 'seconds')
      };

    return {
      defaultConfig : defaultConfig,
      redirectInterval : redirect_interval
    };

}));
