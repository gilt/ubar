(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('ubar_tracking', [], factory);

  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require());

  }

} (this, function ubar_tracking (moment) {

    'use strict';


    /**
    * @method: _turnUbarOn
    * @param TRACKING_LOCATIONS.OAFE_BANNER
    *
    */
    var _turnUbarOn = function (trackingLocation) {

    };


    /**
    * @method: _turnUbarOff
    * @param oafePreferencesButton ? TRACKING_LOCATIONS.MANAGE_OAFE_BANNER : TRACKING_LOCATIONS.OAFE_BANNER
    *
    */
    var _turnUbarOff = function (trackingLocation) {

    };


    /**
    * @method: _attemptToRedirectToAppStore
    * @param { location : location }
    *
    */
    var _attemptToRedirectToAppStore = function (trackingLocation) {
        
    };


    /**
    * @method: _attemptToRedirectToAppStore
    * @param { location : location }
    *
    */
    var _attemptToRedirectToApp = function (trackingLocation) {
        
    };


    /**
    * @method: _showReturningBanner
    *
    */
    var _showReturningBanner = function () {
        
    };


    /**
    * @method: _showSendingBanner
    *
    */
    var _showSendingBanner = function () {
        
    };


    return {
        turnUbarOn: _turnUbarOn,
        turnUbarOff: _turnUbarOff
        attemptToRedirectToAppStore: _attemptToRedirectToAppStore,
        attemptToRedirectToApp: _attemptToRedirectToAppStore,
        showReturningBanner: _showReturningBanner,
        showSendingBanner: _showSendingBanner
    };

}));
