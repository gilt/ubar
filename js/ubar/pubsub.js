(function(exports, moduleName) {
'use strict';

/**
 * A very simple publisher subscriber system for exposing potential tracking events
*/
function create () {
  var topics = {};

  /**
   * Add a listener to a topic.
   *
   * @public
   * @method subscribe
   *
   * @param {String}  topic name
   * @param {Function}
  */
  function subscribe (topic, listener) {
    if (topic === '' || topic === undefined) return;
    if (!topics.hasOwnProperty(topic)) topics[topic] = [];

    topics[topic].push(listener);
  }

  /**
   * Call all listeners for a given topic with some data.
   *
   * @public
   * @method publish
   *
   * @param {String}  topic name. If topic does not exist, return.
   * @param {Any}  Passes data to listener functions. If data is undefined, pass empty object.
  */
  function publish (topic, data) {
    if (!topics.hasOwnProperty(topic)) return;

    for (var i = 0; i < topics[topic].length; i++) {
      if (typeof topics[topic][i] === 'function') {
        topics[topic][i](data !== undefined ? data : {});
      }
    }
  }

  return {
    subscribe : subscribe,
    publish : publish
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

}(typeof exports === 'object' && exports || this, 'ubar_pubsub' /* moduleName */));

