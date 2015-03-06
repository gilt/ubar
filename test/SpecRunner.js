require.config({
  baseUrl: '../ubar',
  paths: {
    'bean'        : '../node_modules/bean/bean',
    'chai'        : '../node_modules/chai/chai',
    'handlebars'  : '../node_modules/handlebars',
    'mocha'       : '../node_modules/mocha/mocha',
    'moment'      : '../node_modules/moment/moment',
    'requirejs'   : '../node_modules/requirejs',
    'sinon'       : '../node_modules/sinon',
    'when'        : '../node_modules/when',
    'ubar_config' : '../js/ubar/config',
    'ubar_device' : '../js/ubar/device',
    'ubar_dom'    : '../js/ubar/dom',
    'ubar_resolver' : '../js/ubar/resolver',
    'ubar_storage'  : '../js/ubar/storage',
    'ubar_tracking' : '../js/ubar/tracking',
    'ubar'            : '../js/ubar/ubar'
  },
  shim: {
    'mocha': {
      init: function () {
        this.mocha.setup('bdd');
        return this.mocha;
      }
    }
  },
  urlArgs: 'bust=' + (new Date()).getTime()
});
 
define(function(require) {
  var chai = require('chai');
  var mocha = require('mocha');
  var should = chai.should();

  require([
    'specs/sanitySpec.js',
    'specs/trackingSpec.js',
    'specs/configSpec.js'
  ], function(require) {
    mocha.run();
  });
 
});
