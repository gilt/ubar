(function(exports, moduleName) {
'use strict';

function create (ubarHelpers) {

  var
    docCookies, // cookie getter and setter
    ubarStorage, // Strorage constructor
    DEFAULT_BASE_PATH = '/';

  /**
   * Class responsible for getting and setting UBAR cookies.
   *
   * @public
   * @constructor
   *
   * @params {Object} config  Config object for ubar
   */
  ubarStorage = function (config) {
    if (!config) {
      console.log("Error: ubarStorage initialized with an empty config.");
      this.UBAR_KEY = "";
      this.REDIRECTED_NAME = "";
      this.EXP_DURATION_REDIRECTED_MS = 0;
      this.EXP_DURATION_DISABLED_MS = 0;
      this.EXP_DURATION_ENABLED_MS = 0;
      return;
    }

    this.UBAR_KEY = config.device_preference_cookie;
    this.REDIRECTED_NAME = config.redirected_cookie;
    this.EXP_DURATION_REDIRECTED_MS = ubarHelpers.getTimeInSeconds(config.manage_window_time);
    this.EXP_DURATION_DISABLED_MS = ubarHelpers.getTimeInSeconds(config.disabled_time);
    this.EXP_DURATION_ENABLED_MS = ubarHelpers.getTimeInSeconds(config.enabled_time);
  };

  /**
   * From Mozilla:
   * https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
   * https://developer.mozilla.org/User:fusionchess
   * This framework is released under the GNU Public License, version 3 or later.
   *    http://www.gnu.org/licenses/gpl-3.0-standalone.html
   *
   * @private
   * @method docCookies
   *
   * Syntaxes:
   *
   *  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
   *  * docCookies.getItem(name)
   *  * docCookies.removeItem(name[, path[, domain]])
   *  * docCookies.hasItem(name)
  */
  ubarStorage.prototype.docCookies = {
    getItem: function (sKey) {
      if (!sKey) { return null; }
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }
      document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
      return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
      if (!this.hasItem(sKey)) { return false; }
      document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
      return true;
    },
    hasItem: function (sKey) {
      if (!sKey) { return false; }
      return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }
  };

  /**
   * Returns whether UBAR is enabled.
   *
   * @public
   * @method isEnabled
   */
  ubarStorage.prototype.isEnabled = function isEnabled () {
    return this.docCookies.getItem(this.UBAR_KEY) === 'true';
  };

  /**
   * Returns whether UBAR has been disabled by the user.
   *
   * @public
   * @method isDisabled
   */
  ubarStorage.prototype.isDisabled = function isDisabled () {
    return this.docCookies.getItem(this.UBAR_KEY) === 'false';
  };

  /**
   * Returns whether user was redirected.
   *
   * @public
   * @method isUserRedirected
   */
  ubarStorage.prototype.isUserRedirected = function isUserRedirected () {
    return this.docCookies.getItem(this.REDIRECTED_NAME) === 'true';
  };

  /**
   * When a user is redirected via UBAR, set a storage value that records this.
   * The value of the object is true.
   *
   * @public
   * @method setRedirected
   */
  ubarStorage.prototype.setRedirected = function setRedirected () {
    this.docCookies.setItem(this.REDIRECTED_NAME, true, this.EXP_DURATION_REDIRECTED_MS, DEFAULT_BASE_PATH
      );
  };

  /**
   * UBAR is turned off. Storage expiration is set in ubar.config.
   * The value of the object is false.
   *
   * @public
   * @method disableUbar
   */
  ubarStorage.prototype.disable = function disable () {
    this.docCookies.setItem(this.UBAR_KEY, false, this.EXP_DURATION_DISABLED_MS, DEFAULT_BASE_PATH);
  };

  /**
   * UBAR is turned on. Storage expiration is set in ubar.config.
   * The value of the object is true.
   *
   * @public
   * @method enableUbar
   */
  ubarStorage.prototype.enable = function enable () {
    this.docCookies.setItem(this.UBAR_KEY, true, this.EXP_DURATION_ENABLED_MS, DEFAULT_BASE_PATH);
  };

  /**
   * Clears UBAR and UBAR Redirected storage items.
   * The value of this object is null.
   *
   * @public
   * @method clear
   */
  ubarStorage.prototype.clear = function clear () {
    this.docCookies.removeItem(this.UBAR_KEY, DEFAULT_BASE_PATH);
    this.docCookies.removeItem(this.REDIRECTED_NAME, DEFAULT_BASE_PATH);
  };

  return ubarStorage;
}

if (typeof define === 'function' && define.amd) {
  define(moduleName, ['./helpers'], create);

} else if (typeof module === 'object' && module.exports) {
  /*
    Using CommonJS syntax, we have to explicitly require each
    module because browserify uses static module analysis.
  */
  module.exports = create(require('./helpers'));

} else {
  /*
    Gilt build syntax. 'exports' variable could be window here
    or an empty object, as in Gilt's case
  */
  exports[moduleName] = create(
    exports.ubar_helpers || ubar_helpers
  );
}

}(typeof exports === 'object' && exports || this, 'ubar_storage' /* moduleName */));
