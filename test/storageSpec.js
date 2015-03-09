(function() {

  var chai = require('chai');
  var moment = require('moment');
  var should = chai.should();
  var defaultConfig = require('../js/ubar/config');;

  var UbarHelpers = require('../js/ubar/helpers');
  var Storage = require('../js/ubar/storage');

  var ubarHelpers = new UbarHelpers();

  describe("ubar_storage ", function () {

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it("isEnabled should be false to start", function () {
      var ubar_storage = new Storage(defaultConfig);
      ubar_storage.isEnabled().should.equal(false);
    });

    it("isDisabled should be false to start", function () {
      var ubar_storage = new Storage(defaultConfig);
      ubar_storage.isEnabled().should.equal(false);
    });

    it("isUserRedirected should be false to start", function () {
      var ubar_storage = new Storage(defaultConfig);
      ubar_storage.isUserRedirected().should.equal(false);
    });

    it("UBAR_KEY should be set", function () {
      var ubar_storage = new Storage(defaultConfig);
      ubar_storage.UBAR_KEY.should.equal(defaultConfig.device_preference_cookie);
    });

    it("REDIRECTED_NAME should be set", function () {
      var ubar_storage = new Storage(defaultConfig);
      ubar_storage.REDIRECTED_NAME.should.equal(defaultConfig.redirected_cookie);
    });

    it("EXP_DURATION_REDIRECTED_MS should be set and equal to 60 seconds", function () {
      var ubar_storage = new Storage(defaultConfig);
      (ubar_storage.EXP_DURATION_REDIRECTED_MS).should.equal(ubarHelpers.getTimeInSeconds(defaultConfig.manage_window_time));
    });

    it("EXP_DURATION_DISABLED_MS should be set and equal to 1209600", function () {
      var ubar_storage = new Storage(defaultConfig);
      ubar_storage.EXP_DURATION_DISABLED_MS.should.equal(ubarHelpers.getTimeInSeconds(defaultConfig.disabled_time));
    });

    it("EXP_DURATION_ENABLED_MS should be set and equal to 31536000", function () {
      var ubar_storage = new Storage(defaultConfig);
      ubar_storage.EXP_DURATION_ENABLED_MS.should.equal(ubarHelpers.getTimeInSeconds(defaultConfig.enabled_time));
    });

    it("disable() should set isDisabled() to true", function () {
      var ubar_storage = new Storage(defaultConfig);
      ubar_storage.disable();
      ubar_storage.isDisabled().should.equal(true);
    });

    it("disable() should set isEnabled() to false", function () {
      var ubar_storage = new Storage(defaultConfig);
      ubar_storage.disable();
      ubar_storage.isEnabled().should.equal(false);
    });

    it("enable() should set isDisabled to false", function () {
      var ubar_storage = new Storage(defaultConfig);
      ubar_storage.enable();
      ubar_storage.isDisabled().should.equal(false);
    });

    it("enable() should set isEnabled to true", function () {
      var ubar_storage = new Storage(defaultConfig);
      ubar_storage.enable();
      ubar_storage.isEnabled().should.equal(true);
    });

    it("isUserRedirected() should return false when cookie isn't set", function () {
      var ubar_storage = new Storage(defaultConfig);
      ubar_storage.isUserRedirected().should.equal(false);
    });

    it("setRedirected() should return true after calling setRedirected()", function () {
      var ubar_storage = new Storage(defaultConfig);
      ubar_storage.setRedirected();
      ubar_storage.isUserRedirected().should.equal(true);
    });

    it("clear(), oafe is not enabled", function () {
      var ubar_storage = new Storage(defaultConfig);
      ubar_storage.setRedirected();
      ubar_storage.clear();
      ubar_storage.isEnabled().should.equal(false);
    });

    it("clear(), oafe means disabled is false", function () {
      var ubar_storage = new Storage(defaultConfig);
      ubar_storage.setRedirected();
      ubar_storage.clear();
      ubar_storage.isDisabled().should.equal(false);
    });

    it("clear(), oafe means user was not redirected", function () {
      var ubar_storage = new Storage(defaultConfig);
      ubar_storage.setRedirected();
      ubar_storage.clear();
      ubar_storage.isUserRedirected().should.equal(false);
    });
  });

})();
