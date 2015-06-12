(function() {

  var chai = require('chai');
  var moment = require('moment');
  var should = chai.should();
  var sinon = require('sinon');

  var Ubar = require('../js/ubar/ubar');
  var ubar_device = require('../js/ubar/device');
  ubar_device._setUserAgent('Mozilla/6.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/8.0 Mobile/10A5376e Safari/8536.25');
  var ubar = Ubar.init();

  describe('Ubar public methods', function() {

    it ('should not be enabled by default', function() {
      ubar.isEnabled().should.not.equal(true);
    });

    it ('should not be explicitly disabled by default', function() {
      ubar.isDisabled().should.not.equal(true);
    });

    it ('should be enabed after calling enable()', function() {
      ubar.enable();
      ubar.isEnabled().should.equal(true);
      ubar.isDisabled().should.equal(false);
    });

    it ('should be disabled after calling disable()', function() {
      ubar.disable();
      ubar.isEnabled().should.equal(false);
      ubar.isDisabled().should.equal(true);
    });
  });

})();
