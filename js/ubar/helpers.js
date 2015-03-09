(function() {
  'use strict';

  var moment = require('moment');

  /**
   * Get Time in Moments
   *
   * @public
   * @method getTimeInMoments
   */
  function getTimeInMoments ( time_string ) {
    if (!time_string) {
      console.log('Error: empty time_string in getTimeinMoments');
      return moment.duration( 0 );
    }

    var timeString = time_string.trim().split(/\s+/),
        timeValue  = parseInt( timeString[0], 10 ),
        timeUnit   = timeString[1];

    if ( timeString.length > 2 ) {
      console.log('Error: time_string has invalid parameters: ' + timeString);
      return moment.duration( 0 );
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


  module.exports = {
    getTimeInMoments: getTimeInMoments,
    getTimeInSeconds: getTimeInSeconds,
    isObject: isObject,
    extend: extend
  };

})();
