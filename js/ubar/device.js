(function(exports, moduleName) {
'use strict';

function create () {

  var userAgent;

  /**
   * For testing only. Allows tests to set user agent globally for module.
   *
   * @protected
   * @method _setUserAgent
   *
   * @param {String} userAgentString
   */
  function _setUserAgent (userAgentString) {
    userAgent = userAgentString;
  }

  /**
   * Get user agent indirectly. Wrapper for testing purposes.
   *
   * @private
   * @method getUserAgent
   *
   * @return {String}
   */
  function getUserAgent () {
    return userAgent ? userAgent : navigator.userAgent;
  }

  /**
   * Determine if device is ios based on user agent.
   *
   * @private
   * @method isIOS
   *
   * @return {Boolean}
   */
  function isIOS () {
    return getUserAgent().match(/iPhone|iPad|iPod/i) !== null;
  }

  /**
   * Determine if device is ios and using safari based on user agent.
   *
   * @private
   * @method isIosSafari
   *
   * @return {Boolean}
   */
  function isIosSafari () {
    return isIOS() && getUserAgent().match(/Version\//i) !== null;
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
    return getUserAgent().match(/Android/i) !== null;
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
    return getUserAgent().match(/IEMobile/i) !== null;
  }

  /**
   * Get device ios version based on user agent.
   * Only call if we know this is an ios device.
   * Otherwise this will throw an error and return 0.
   *
   * @private
   * @method getIOSVersion
   *
   * @return {Float}
   */
  function getIOSVersion () {
    try {
      return parseFloat(getUserAgent().match(/OS (\d+)_(\d+)/)[0].split(" ")[1].replace("_", "."), 10);
    }
    catch(err) {
      console.log('Trying to get IOS version for non-IOS device. ', err.message);
      return 0;
    }

  }

  /**
   * Get device Android version based on user agent.
   * Only call if we know this is an Android device.
   * Otherwise this will throw an error and return 0.
   *
   * @private
   * @method getAndroidVersion
   *
   * @return {Float}
   */
  function getAndroidVersion () {
    try {
      return parseFloat(getUserAgent().match(/Android (\d+).(\d+)/)[0].split(" ")[1], 10);
    }
    catch(err) {
      console.log('Trying to get Android version for non-Android device. ', err.message);
      return 0;
    }
  }

  /**
   * Get device windows mobile version based on user agent.
   * Only call if we know this is an windows mobile device.
   * Otherwise this will throw an error and return 0.
   *
   * @private
   * @method getWindowsMobileVersion
   *
   * @return {Float}
   */
  function getWindowsMobileVersion () {
    try {
      return parseFloat(getUserAgent().match(/(IEMobile\/)((\d+).(\d+))/)[0].split("/")[1], 10);
    }
    catch(err) {
      console.log('Trying to get WindowsMobile version for non-WindowMobile device. ', err.message);
      return 0;
    }
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
      config.android_support        && isSupportedAndroid(config.min_android_support) ||
      config.windows_mobile_support && isSupportedWindowsMobile(config.min_windows_mobile_support);
  }

  return  {
    isAppSupported  : isAppSupported,
    isIOS           : isIOS,
    isIosSafari     : isIosSafari,
    isAndroid       : isAndroid,
    isWindowsMobile : isWindowsMobile,
    _setUserAgent             : _setUserAgent,
    _isSupportedIOS           : isSupportedIOS,
    _isSupportedAndroid       : isSupportedAndroid,
    _isSupportedWindowsMobile : isSupportedWindowsMobile,
    _getIOSVersion            : getIOSVersion,
    _getAndroidVersion        : getAndroidVersion,
    _getWindowsMobileVersion  : getWindowsMobileVersion
  };
}

if (typeof define === 'function' && define.amd) {
  define(moduleName, [], create);

} else if (typeof module === 'object' && module.exports) {
  /*
    Using CommonJS syntax, we have to explicitly require each
    module because browserify uses static module analysis.
  */
  module.exports = create();

} else {
  /*
    Gilt build syntax. 'exports' variable could be window here
    or an empty object, as in Gilt's case
  */
  exports[moduleName] = create();
}

}(typeof exports === 'object' && exports || this, 'ubar_device' /* moduleName */));

