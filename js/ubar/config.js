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

    var expiration_time = {
        disabled: moment.duration(2, 'weeks'),
        enabled: moment.duration(1, 'year'),
        redirected: moment.duration(60, 'seconds')
      },

      redirect_interval = {
        ios_app_store: moment.duration(2, 'seconds')
      };

    return {
      expirationTime : expiration_time,
      redirectInterval : redirect_interval
    };

}));
