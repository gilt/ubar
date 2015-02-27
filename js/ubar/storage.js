(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('ubar_storage', ['ubar_config'], factory);

  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('ubar_storage'));

  }

} (this, function ubar_storage (config) {

    'use strict';

  var
    UBAR_KEY = 'ubar',
    REDIRECTED_NAME = 'ubar_redirected',

    EXP_DURATION_ENABLED_MS = config.expirationTime.enabled.asSeconds(),
    EXP_DURATION_DISABLED_MS = config.expirationTime.disabled.asSeconds(),
    EXP_DURATION_REDIRECTED_MS = config.expirationTime.redirected.asSeconds(),

    docCookies; // cookie getter and setter

  /**
   * Get the value of the UBAR storage object that determines whether a user has
   * UBAR enabled or disabled.
   *
   * @private
   * @method getUbarValue
   */
  function getUbarValue () {
    return docCookies.getItem(UBAR_KEY);
  }

  /**
   * Get the value of the redirected storage object.
   *
   * @private
   * @method getRedirectedValue
   */
  function getRedirectedValue () {
    return docCookies.getItem(REDIRECTED_NAME);
  }

  /**
   * Returns whether UBAR is enabled.
   *
   * @public
   * @method isUbarEnabled
   */
  function isUbarEnabled () {
    return getUbarValue() === 'true';
  }

  /**
   * Returns whether UBAR has been disabled by the user.
   *
   * @public
   * @method isUbarDisabled
   */
  function isUbarDisabled () {
    return getUbarValue() === 'false';
  }

  /**
   * Returns whether user was redirected.
   *
   * @public
   * @method isUserRedirected
   */
  function isUserRedirected () {
    return getRedirectedValue() === 'true';
  }

  /**
   * When a user is redirected via UBAR, set a storage value that records this.
   * The value of the object is true.
   *
   * @public
   * @method setRedirected
   */
  function setRedirected () {
    docCookies.setItem(REDIRECTED_NAME, true, EXP_DURATION_REDIRECTED_MS);
  }

  /**
   * UBAR is turned off. Storage expiration is set in ubar.config.
   * The value of the object is false.
   *
   * @public
   * @method disableUbar
   */
  function disableUbar () {
    docCookies.setItem(UBAR_KEY, false, EXP_DURATION_DISABLED_MS);
  }

  /**
   * UBAR is turned on. Storage expiration is set in ubar.config.
   * The value of the object is true.
   *
   * @public
   * @method enableUbar
   */
  function enableUbar () {
    docCookies.setItem(UBAR_KEY, true, EXP_DURATION_ENABLED_MS);
  }

  /**
   * Clears UBAR and UBAR Redirected storage items.
   * The value of this object is null.
   *
   * @public
   * @method clear
   */
  function clear () {
    docCookies.removeItem(UBAR_KEY);
    docCookies.removeItem(REDIRECTED_NAME);
  }

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

  return {
    clear            : clear,
    disableUbar      : disableUbar,
    enableUbar       : enableUbar,
    setRedirected    : setRedirected,
    isUbarEnabled    : isUbarEnabled,
    isUbarDisabled   : isUbarDisabled,
    isUserRedirected : isUserRedirected
  };
}));
