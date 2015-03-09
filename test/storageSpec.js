(function() {

  var chai = require('chai');
  var moment = require('moment');
  var should = chai.should();
  var defaultConfig = require('../js/ubar/config');;

  var ubarHelpers = require('../js/ubar/helpers');
  var Storage = require('../js/ubar/storage');

  describe("ubarStorage ", function () {

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it("isEnabled should be false to start", function () {
      var ubarStorage = new Storage(defaultConfig);
      ubarStorage.isEnabled().should.equal(false);
    });

    it("isDisabled should be false to start", function () {
      var ubarStorage = new Storage(defaultConfig);
      ubarStorage.isEnabled().should.equal(false);
    });

    it("isUserRedirected should be false to start", function () {
      var ubarStorage = new Storage(defaultConfig);
      ubarStorage.isUserRedirected().should.equal(false);
    });

    it("UBAR_KEY should be set", function () {
      var ubarStorage = new Storage(defaultConfig);
      ubarStorage.UBAR_KEY.should.equal(defaultConfig.device_preference_cookie);
    });

    it("REDIRECTED_NAME should be set", function () {
      var ubarStorage = new Storage(defaultConfig);
      ubarStorage.REDIRECTED_NAME.should.equal(defaultConfig.redirected_cookie);
    });

    it("EXP_DURATION_REDIRECTED_MS should be set and equal to 60 seconds", function () {
      var ubarStorage = new Storage(defaultConfig);
      (ubarStorage.EXP_DURATION_REDIRECTED_MS).should.equal(ubarHelpers.getTimeInSeconds(defaultConfig.manage_window_time));
    });

    it("EXP_DURATION_DISABLED_MS should be set and equal to 1209600", function () {
      var ubarStorage = new Storage(defaultConfig);
      ubarStorage.EXP_DURATION_DISABLED_MS.should.equal(ubarHelpers.getTimeInSeconds(defaultConfig.disabled_time));
    });

    it("EXP_DURATION_ENABLED_MS should be set and equal to 31536000", function () {
      var ubarStorage = new Storage(defaultConfig);
      ubarStorage.EXP_DURATION_ENABLED_MS.should.equal(ubarHelpers.getTimeInSeconds(defaultConfig.enabled_time));
    });

    it("disable() should set isDisabled() to true", function () {
      var ubarStorage = new Storage(defaultConfig);
      ubarStorage.disable();
      ubarStorage.isDisabled().should.equal(true);
    });

    it("disable() should set isEnabled() to false", function () {
      var ubarStorage = new Storage(defaultConfig);
      ubarStorage.disable();
      ubarStorage.isEnabled().should.equal(false);
    });

    it("enable() should set isDisabled to false", function () {
      var ubarStorage = new Storage(defaultConfig);
      ubarStorage.enable();
      ubarStorage.isDisabled().should.equal(false);
    });

    it("enable() should set isEnabled to true", function () {
      var ubarStorage = new Storage(defaultConfig);
      ubarStorage.enable();
      ubarStorage.isEnabled().should.equal(true);
    });

    it("isUserRedirected() should return false when cookie isn't set", function () {
      var ubarStorage = new Storage(defaultConfig);
      ubarStorage.isUserRedirected().should.equal(false);
    });

    it("setRedirected() should return true after calling setRedirected()", function () {
      var ubarStorage = new Storage(defaultConfig);
      ubarStorage.setRedirected();
      ubarStorage.isUserRedirected().should.equal(true);
    });

    it("clear(), oafe is not enabled", function () {
      var ubarStorage = new Storage(defaultConfig);
      ubarStorage.setRedirected();
      ubarStorage.clear();
      ubarStorage.isEnabled().should.equal(false);
    });

    it("clear(), oafe means disabled is false", function () {
      var ubarStorage = new Storage(defaultConfig);
      ubarStorage.setRedirected();
      ubarStorage.clear();
      ubarStorage.isDisabled().should.equal(false);
    });

    it("clear(), oafe means user was not redirected", function () {
      var ubarStorage = new Storage(defaultConfig);
      ubarStorage.setRedirected();
      ubarStorage.clear();
      ubarStorage.isUserRedirected().should.equal(false);
    });
  });

})();
