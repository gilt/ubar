(function() {
'use strict';

  var moment = require('moment');
  var UbarHelpers = function UbarHelpers () {};

  /**
   * Get Time in Moments
   *
   * @private
   * @method getTimeinMoments
   */
  UbarHelpers.prototype.getTimeInMoments = function (time_string) {
    if (!time_string) {
      console.log('Error: empty time_string in getTimeinMoments');
      return moment.duration(0, 'seconds');
    }

    var timeString = time_string.split(" "),
        timeValue  = parseInt(timeString[0], 10),
        timeUnit   = timeString[1];

    if (!timeString.length > 2) {
      console.log('Error: time_string has invalid parameters: ' + timeString);
      return moment.duration(0, 'seconds');
    }

    return moment.duration( timeValue, timeUnit );
  };

  /**
   * Get Time in Seconds
   *
   * @private
   * @method getTimeinMoments
   */
  UbarHelpers.prototype.getTimeInSeconds = function (time_string) {
    return this.getTimeInMoments(time_string).asSeconds();
  };

  module.exports = UbarHelpers;
})();
