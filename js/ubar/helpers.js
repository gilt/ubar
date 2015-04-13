(function(exports, moduleName) {
'use strict';

function create (moment) {
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  /**
   * Get Time in Moments
   *
   * @public
   * @method getTimeInMoments
   */
  function getTimeInMoments ( time_string ) {
    var timeString, timeValue, timeUnit, defaultDuration;

    defaultDuration = moment.duration( 0 );

    if (!time_string) {
      console.error('Error: empty time_string in getTimeinMoments');
      return defaultDuration;
    }

    timeString = time_string.trim().split(/\s+/);
    timeValue  = parseInt( timeString[0], 10 );
    timeUnit   = timeString[1];

    if ( timeString.length > 2 ) {
      console.error('Error: time_string has invalid parameters: ' + timeString);
      return defaultDuration;
    }

    return moment.duration( timeValue, timeUnit );
  }

  /**
   * Get Time in Seconds
   *
   * @public
   * @method getTimeInSeconds
   */
  function getTimeInSeconds ( time_string ) {
    if (typeof time_string.asSeconds === 'function') {
      return time_string.asSeconds();
    }
    return getTimeInMoments( time_string ).asSeconds();
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
    if (!isObject(obj)) return obj;
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

  return {
    getTimeInMoments: getTimeInMoments,
    getTimeInSeconds: getTimeInSeconds,
    isObject: isObject,
    extend: extend
  };
}

if (typeof define === 'function' && define.amd) {
  define(moduleName, ['moment'], create);

} else if (typeof module === 'object' && module.exports) {
  /*
    Using CommonJS syntax, we have to explicitly require each
    module because browserify uses static module analysis.
  */
  module.exports = create(require('moment'));

} else {
  /*
    Gilt build syntax. 'exports' variable could be window here
    or an empty object, as in Gilt's case
  */
  exports[moduleName] = create(
    exports.moment || moment
  );
}

}(typeof exports === 'object' && exports || this, 'ubar_helpers' /* moduleName */));

