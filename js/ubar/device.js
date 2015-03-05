(function (name, root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(name, [], factory);

  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();

  } else {
    root[name] = factory();
  }

} ('ubar_device', this, function ubar_device () {

  'use strict';

  /**
   * Determine if device is ios based on user agent.
   *
   * @private
   * @method isIOS
   *
   * @return {Boolean}
   */
  function isIOS () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null;
  }

  /**
   * Determine if device is android based on user agent.
   *
   * @private
   * @method isAndroid
   *
   * @return {Boolean}
   */
  function isAndroid () {
    return navigator.userAgent.match(/Android/i) !== null;
  }

  /**
   * Determine if device is windows mobile based on user agent.
   *
   * @private
   * @method isWindowsMobile
   *
   * @return {Boolean}
   */
  function isWindowsMobile () {
    return navigator.userAgent.match(/IEMobile/i) !== null;
  }

  /**
   * Get device ios version based on user agent.
   * Only call if we know this is an ios device.
   * Otherwise this will throw and error.
   *
   * @private
   * @method getIOSVersion
   *
   * @return {Float}
   */
  function getIOSVersion () {
    return parseFloat(navigator.userAgent.match(/OS (\d+)_(\d+)/)[0].split(" ")[1].replace("_", "."), 10);
  }

  /**
   * Get device Android version based on user agent.
   * Only call if we know this is an Android device.
   * Otherwise this will throw and error.
   *
   * @private
   * @method getAndroidVersion
   *
   * @return {Float}
   */
  function getAndroidVersion () {
    return parseFloat(navigator.userAgent.match(/Android (\d+).(\d+)/)[0].split(" ")[1], 10);
  }

  /**
   * Get device windows mobile version based on user agent.
   * Only call if we know this is an windows mobile device.
   * Otherwise this will throw and error.
   *
   * @private
   * @method getWindowsMobileVersion
   *
   * @return {Float}
   */
  function getWindowsMobileVersion () {
    return parseFloat(navigator.userAgent.match(/(IEMobile\/)((\d+).(\d+))/)[0].split("/")[1], 10);
  }

  /**
   * Determine if device is ios and ios version greater than
   * or equal to current minimum ios the app supports.
   *
   * @private
   * @method isSupportedIOS
   *
   * @param version {Float} supported ios version
   *
   * @return {Boolean}
   */
  function isSupportedIOS (version) {
    return isIOS() && getIOSVersion() >= version;
  }

  /**
   * Determine if device is android and android version greater than
   * or equal to current minimum ios the app supports.
   *
   * @private
   * @method isSupportedAndroid
   *
   * @param version {Float} supported android version
   *
   * @return {Boolean}
   */
  function isSupportedAndroid (version) {
    return isAndroid() && getAndroidVersion() >= version;
  }

  /**
   * Determine if device is window mobile and windows mobile version greater than
   * or equal to current minimum ios the app supports.
   *
   * @private
   * @method isSupportedWindowsMobile
   *
   * @param version {Float} supported windows mobile version
   *
   * @return {Boolean}
   */
  function isSupportedWindowsMobile (version) {
    return isWindowsMobile() && getWindowsMobileVersion() >= version;
  }

  /**
   * Determine it this device supports the app we want to direct it to
   *
   * @public
   * @method isAppSupported
   *
   * @param {Object} config  Ubar config containing device configs
   *
   * @return {Boolean}
   */
  function isAppSupported (config) {
    return config.ios_support       && isSupportedIOS(config.min_ios_support)        ||
      config.android_support        && isSupportedAndroid(config.min_android_suport) ||
      config.windows_mobile_support && isSupportedWindowsMobile(config.min_windows_mobile_support);
  }

  return {
    isAppSupported  : isAppSupported,
    isIOS           : isIOS,
    isAndroid       : isAndroid,
    isWindowsMobile : isWindowsMobile
  };

}));
