(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['moment'], factory);

  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('moment'));

  }
} (function ubar_config (moment) {

    'use strict';

    var expiration_time = {
        disabled: moment().duration(2, 'weeks').asMilliseconds(),
        enabled: moment().duration(1, 'year').asMilliseconds(),
        redirected: moment().duration(60, 'seconds').asMilliseconds()
      },

      redirect_interval = {
        ios_app_store: moment().duration(2, 'seconds').asMilliseconds()
      };

    return {
      expirationTime : expiration_time,
      redirectInterval : redirect_interval
    };
  });

}));
