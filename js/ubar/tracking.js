(function() {

  'use strict';
  // var moment = require('moment');

  /**
  * Tracking:
  *
  * This module exists so that you can tie your
  * existing tracking system into the UBAR system.
  * The following events are called at various times
  * during the workflow. All you have to do is include
  * your app's specific tracking in the methods below.
  *
  * With this data, you can run analytics that tell you
  * the percentage of people who opt into UBAR as
  * well as the drop-off points.
  *
  * You can also use the data to better inform yourself
  * as to whether the user has your app installed or not.
  *
  */


  /**
  * Called when the user elects to opt into the
  * UBAR feature.
  *
  * @public
  * @method: _turnUbarOn
  * @param {Object} {location : 'where this was called'}
  *
  */
  function _turnUbarOn ( trackingLocationObject ) {
    return true;
  }


  /**
  * Called when the user elects to opt out of the
  * UBAR feature.
  *
  * @public
  * @method: _turnUbarOff
  * @param {Object} {location : 'where this was called'}
  *
  */
  function _turnUbarOff ( trackingLocationObject ) {
    return true;
  }


  /**
  * Called when an attempt has been made to redirect the
  * user to the appstore to download your app.
  *
  * @public
  * @method: _attemptToRedirectToAppStore
  * @param {Object} { location : 'where this was called'}
  */
  function _attemptToRedirectToAppStore ( trackingLocationObject ) {
    return true;
  }


  /**
  * Called when an attempt has been made to redirect the
  * user into the app.
  *
  * @public
  * @method: _attemptToRedirectToAppStore
  * @param {Object} { location : 'where this was called'}
  */
  function _attemptToRedirectToApp ( trackingLocationObject ) {
    return true;
  }


  /**
  * Called when the returning banner is displayed to the user.
  *
  * @public
  * @method: _showReturningBanner
  * @param {Object} { location : 'where this was called'}
  */
  function _showReturningBanner ( trackingLocationObject ) {
    return true;
  }


  /**
  * Called when the initial sending banner is displayed to the
  * user
  *
  * @public
  * @method: _showSendingBanner
  * @param {Object} { location : 'where this was called'}
  */
  function _showSendingBanner ( trackingLocationObject ) {
    return true;
  }


  module.exports = {
      turnUbarOn: _turnUbarOn,
      turnUbarOff: _turnUbarOff,
      attemptToRedirectToAppStore: _attemptToRedirectToAppStore,
      attemptToRedirectToApp: _attemptToRedirectToAppStore,
      showReturningBanner: _showReturningBanner,
      showSendingBanner: _showSendingBanner
  };

})();
