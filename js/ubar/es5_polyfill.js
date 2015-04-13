(function(exports, moduleName) {
'use strict';

function create () {

  /**
   * Polyfill for the Array.prototype.reduce method
   * Taken from github.com/inexorabletash/polyfill.
   * https://github.com/inexorabletash/polyfill/blob/efdd3211a40f21f8fdd2c382074b0679cc294525/es5.js
  */
  function arrayReducePolyfill (fun /*, initialValue */) {
    if (this === void 0 || this === null) { throw new TypeError(); }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function") { throw new TypeError(); }

    // no value to return if no initial value and an empty array
    if (len === 0 && arguments.length === 1) { throw new TypeError(); }

    var k = 0;
    var accumulator;
    if (arguments.length >= 2) {
      accumulator = arguments[1];
    } else {
      do {
        if (k in t) {
          accumulator = t[k++];
          break;
        }

        // if array contains no values, no initial value to return
        if (++k >= len) { throw new TypeError(); }
      }
      while (true);
    }

    while (k < len) {
      if (k in t) {
        accumulator = fun.call(undefined, accumulator, t[k], k, t);
      }
      k++;
    }

    return accumulator;
  }
  /**
   * Polyfill for the Object.create method
   * Taken from Mozilla.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill
  */
  function objectCreatePolyfill (prototype) {
    var Temp = function () {}, result;

    if (arguments.length > 1) {
      throw Error('Second argument not supported');
    }
    if (typeof prototype != 'object') {
      throw new TypeError('Argument must be an object');
    }

    Temp.prototype = prototype;
    result = new Temp();
    Temp.prototype = null;
    return result;
  }

  /**
   * Polyfill for the String.prototype.trim method
   * Taken from Mozilla.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
  */
  function stringTrimPolyfill () {
    // Make sure we trim BOM and NBSP
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    return this.replace(rtrim, '');
  }

  Object.create = Object.create || objectCreatePolyfill;
  Array.prototype.reduce = Array.prototype.reduce || arrayReducePolyfill;
  String.prototype.trim = String.prototype.trim || stringTrimPolyfill;

  return {};
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

}(typeof exports === 'object' && exports || this, 'ubar_es5_polyfill' /* moduleName */));
