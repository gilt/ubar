(function(exports, moduleName) {
'use strict';

function create () {

	Object.create = Object.create ||
		function(proto) {
			function Child() {}
			Child.prototype = proto;
			return new Child();
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

}(typeof exports === 'object' && exports || this, 'ubar_es5_polyfill' /* moduleName */));
