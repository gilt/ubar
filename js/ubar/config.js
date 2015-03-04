(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('ubar_config', [], factory);

  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require());

  }

} (this, function ubar_config (moment) {

    'use strict';

    var defaultConfig = {
      
      urls : {
        ios_app_store_url       : 'https://itunes.apple.com/us/app/appname/id331804452?mt=8',
        app_deep_link           : 'gilt://',
      },
      
      templates : {
        sending_template_path   : '../templates/ubar/ubar_sending',
        returning_template_path : '../templates/ubar/ubar_returning',
      },
      
      
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
      timing : {
        enabled            : '1 year',
        disabled           : '2 weeks',
        manage_window      : '60 seconds',
      },
      
      classNames : {
        component_class         : 'component-ubar',
        on_class                : 'ubar-on-button',
        install_class           : 'ubar-install-app-button',
        off_class               : 'ubar-off-button',
        open_in_app_class       : 'ubar-open-in-app-button',
        close_class             : 'ubar-close-banner-button'
      }
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
