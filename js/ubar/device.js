(function (name, root, factory) {

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(
      name,

      [

      ],

      factory
    );

  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(

    );

  } else {
    root[name] = factory(

    );
  }

} ('ubar_device', this, function ubar_device () {

    'use strict';

  /**
   * Determine if device is iPhone safari based on browser_detect module.
   *
   * TODO: classList not supported in IE8 and IE9
   *
   * @public
   * @method isIOS
   */
  function isIOS () {
    return html.classList.contains('mobile') && html.classList.contains('ios');
  }

  /**
   * Determine if device is ios greater or equal to current minimum ios the app
   * supports based on browser_detect module.
   *
   * @private
   * @method isSupportedIOS
   */
  function isSupportedIOS () {
    return isIOS() && parseInt(html.className.match(/ios(\d+)_(\d+)/)[1], 10) >= MIN_IOS_SUPPORT;
  }

  /**
   * Determine it there is an app for this device which supports open to app
   *
   * @public
   * @method isAppSupported
   */
  function isAppSupported (config) {
    // return isSupportedIOS();
    return true;
  }

  return {
    isAppSupported : isAppSupported
  };

}));
