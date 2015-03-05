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

} ('ubar_storage', function ubar_storage () {

    'use strict';

  var
    docCookies, // cookie getter and setter
    ubarStorage; // Strorage constructor

  /**
   * Taken from Mozilla
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
  docCookies = {
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
   * Class responsible for getting and setting UBAR cookies.
   *
   * @public
   * @constructor
   *
   * @params {Object} config  Config object for ubar
   */
  ubarStorage = function (config) {
    this.UBAR_KEY = config.device_preference_cookie;
    this.REDIRECTED_NAME = config.redirected_cookie;
    this.EXP_DURATION_REDIRECTED_MS = config.manage_window_time.asSeconds();
    this.EXP_DURATION_DISABLED_MS = config.disabled_time.asSeconds();
    this.EXP_DURATION_ENABLED_MS = config.enabled_time.asSeconds();
  };

  /**
   * Returns whether UBAR is enabled.
   *
   * @public
   * @method isUbarEnabled
   */
  ubarStorage.prototype.isUbarEnabled = function isUbarEnabled () {
    return docCookies.getItem(this.UBAR_KEY) === 'true';
  };

  /**
   * Returns whether UBAR has been disabled by the user.
   *
   * @public
   * @method isUbarDisabled
   */
  ubarStorage.prototype.isUbarDisabled = function isUbarDisabled () {
    return docCookies.getItem(this.UBAR_KEY) === 'false';
  };

  /**
   * Returns whether user was redirected.
   *
   * @public
   * @method isUserRedirected
   */
  ubarStorage.prototype.isUserRedirected = function isUserRedirected () {
    return docCookies.getItem(this.REDIRECTED_NAME) === 'true';
  };

  /**
   * When a user is redirected via UBAR, set a storage value that records this.
   * The value of the object is true.
   *
   * @public
   * @method setRedirected
   */
  ubarStorage.prototype.setRedirected = function setRedirected () {
    docCookies.setItem(this.REDIRECTED_NAME, true, this.EXP_DURATION_REDIRECTED_MS);
  };

  /**
   * UBAR is turned off. Storage expiration is set in ubar.config.
   * The value of the object is false.
   *
   * @public
   * @method disableUbar
   */
  ubarStorage.prototype.disableUser = function disableUbar () {
    docCookies.setItem(this.UBAR_KEY, false, this.EXP_DURATION_DISABLED_MS);
  };

  /**
   * UBAR is turned on. Storage expiration is set in ubar.config.
   * The value of the object is true.
   *
   * @public
   * @method enableUbar
   */
  ubarStorage.prototype.enableUser = function enableUbar () {
    docCookies.setItem(this.UBAR_KEY, true, this.EXP_DURATION_ENABLED_MS);
  };

  /**
   * Clears UBAR and UBAR Redirected storage items.
   * The value of this object is null.
   *
   * @public
   * @method clear
   */
  ubarStorage.prototype.clear = function clear () {
    docCookies.removeItem(this.UBAR_KEY);
    docCookies.removeItem(this.REDIRECTED_NAME);
  };

  return ubarStorage;

}));
