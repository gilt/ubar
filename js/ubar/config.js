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

    /**
    * Expiration Time:
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
    var expiration_time = {
        disabled: moment.duration(2, 'weeks'),
        enabled: moment.duration(1, 'year'),
        redirected: moment.duration(60, 'seconds')
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
      expirationTime : expiration_time,
      redirectInterval : redirect_interval
    };

}));
