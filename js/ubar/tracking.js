(function(exports, moduleName) {

'use strict';

function create (pubsub) {

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
  * UBAR feature. Publish event with key 'ubarTurnedOn'.
  *
  * @public
  * @method: _turnUbarOn
  * @param {Object} {location : 'where this was called'}
  *
  */
  function _turnUbarOn ( trackingLocationObject ) {
    pubsub.publish('turnedUbarOn', trackingLocationObject);
  }


  /**
  * Called when the user elects to opt out of the
  * UBAR feature. Publish event with key 'ubarTurnedOff'.
  *
  * @public
  * @method: _turnUbarOff
  * @param {Object} {location : 'where this was called'}
  *
  */
  function _turnUbarOff ( trackingLocationObject ) {
    pubsub.publish('turnedUbarOff', trackingLocationObject);
  }


  /**
  * Called when an attempt has been made to redirect the
  * user to the appstore to download your app.
  * Publish event with key 'attemptedToRedirectToAppStore'.
  *
  * @public
  * @method: _attemptToRedirectToAppStore
  * @param {Object} { location : 'where this was called'}
  */
  function _attemptToRedirectToAppStore ( trackingLocationObject ) {
    pubsub.publish('attemptedToRedirectToAppStore', trackingLocationObject);
  }


  /**
  * Called when an attempt has been made to redirect the
  * user into the app. Publish event with key 'attemptedToRedirectToApp'.
  *
  * @public
  * @method: _attemptToRedirectToAppStore
  * @param {Object} { location : 'where this was called'}
  */
  function _attemptToRedirectToApp ( trackingLocationObject ) {
    pubsub.publish('attemptedToRedirectToApp', trackingLocationObject);
  }


  /**
  * Called when the returning banner is displayed to the user.
  * Publish event with key 'showedReturningBanner'.
  *
  * @public
  * @method: _showReturningBanner
  * @param {Object} { location : 'where this was called'}
  */
  function _showReturningBanner ( trackingLocationObject ) {
    pubsub.publish('showedReturningBanner', trackingLocationObject);
  }


  /**
  * Called when the initial sending banner is displayed to the
  * user. Publish event with key 'showedSendingBanner'.
  *
  * @public
  * @method: _showSendingBanner
  * @param {Object} { location : 'where this was called'}
  */
  function _showSendingBanner ( trackingLocationObject ) {
    pubsub.publish('showedSendingBanner', trackingLocationObject);
  }


  return {
    turnUbarOn: _turnUbarOn,
    turnUbarOff: _turnUbarOff,
    attemptToRedirectToAppStore: _attemptToRedirectToAppStore,
    attemptToRedirectToApp: _attemptToRedirectToApp,
    showReturningBanner: _showReturningBanner,
    showSendingBanner: _showSendingBanner
  };
}

if (typeof define === 'function' && define.amd) {
  define(moduleName, ['./pubsub'], create);

} else if (typeof module === 'object' && module.exports) {
  /*
    Using CommonJS syntax, we have to explicitly require each
    module because browserify uses static module analysis.
  */
  module.exports = create(require('./pubsub'));

} else {
  /*
    Gilt build syntax. 'exports' variable could be window here
    or an empty object, as in Gilt's case
  */
  exports[moduleName] = create(
    exports.pubsub || pubsub
  );
}

}(typeof exports === 'object' && exports || this, 'ubar_tracking' /* moduleName */));
