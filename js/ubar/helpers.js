(function() {
'use strict';

  var moment = require('moment');

  /**
   * Get Time in Moments
   *
   * @public
   * @method getTimeinMoments
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
  };

  /**
   * Get Time in Seconds
   *
   * @public
   * @method getTimeinMoments
   */
  function getTimeInSeconds ( time_string ) {
    return this.getTimeInMoments( time_string ).asSeconds();
  };


  module.exports = {
    getTimeInMoments: getTimeInMoments,
    getTimeInSeconds: getTimeInSeconds
  };

})();
