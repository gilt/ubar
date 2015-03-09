(function() {

  var chai = require('chai');
  var moment = require('moment');
  var sinon = require('sinon');
  var should = chai.should();

  var defaultConfig = require('../js/ubar/config');
  var Resolver = require('../js/ubar/resolver');
  var ubarResolver;
  var ubarHelpers = require('../js/ubar/helpers');
  var ubarDevice = require('../js/ubar/device');

  var sinonSandbox;



  describe('ubar_storage ', function () {

    beforeEach(function () {
      sinonSandbox = sinon.sandbox.create();
    });

    afterEach(function () {
      sinonSandbox.restore();
    });

    describe('getAppDeepLink for ', function () {

      it('windows should return windows_app_deep_link', function () {
        ubarResolver = new Resolver(defaultConfig);
        sinonSandbox.stub(ubarDevice, 'isWindowsMobile').returns(true);
        sinonSandbox.stub(ubarDevice, 'isAndroid').returns(false);
        ubarResolver.getAppDeepLink(defaultConfig).should.equal(defaultConfig.windows_app_deep_link);
      });

      it('ios should return ios_app_deep_link', function () {
        ubarResolver = new Resolver(defaultConfig);
        sinonSandbox.stub(ubarDevice, 'isWindowsMobile').returns(false);
        sinonSandbox.stub(ubarDevice, 'isAndroid').returns(false);
        ubarResolver.getAppDeepLink(defaultConfig).should.equal(defaultConfig.ios_app_deep_link);
      });

      it('android should return android_app_deep_link', function () {
        ubarResolver = new Resolver(defaultConfig);
        sinonSandbox.stub(ubarDevice, 'isWindowsMobile').returns(false);
        sinonSandbox.stub(ubarDevice, 'isAndroid').returns(true);
        ubarResolver.getAppDeepLink(defaultConfig).should.equal(defaultConfig.android_app_deep_link);
      });
    });


    describe('getAppStoreUrl for ', function () {

      it('android should return android_app_store_url', function () {
        ubarResolver = new Resolver(defaultConfig);
        sinonSandbox.stub(ubarDevice, 'isWindowsMobile').returns(false);
        sinonSandbox.stub(ubarDevice, 'isAndroid').returns(true);
        ubarResolver.getAppStoreUrl(defaultConfig).should.equal(defaultConfig.android_app_store_url);
      });

      it('iOS should return ios_app_store_url', function () {
        ubarResolver = new Resolver(defaultConfig);
        sinonSandbox.stub(ubarDevice, 'isWindowsMobile').returns(false);
        sinonSandbox.stub(ubarDevice, 'isAndroid').returns(false);
        ubarResolver.getAppStoreUrl(defaultConfig).should.equal(defaultConfig.ios_app_store_url);
      });

      it('Windows should return android_app_store_url', function () {
        ubarResolver = new Resolver(defaultConfig);
        sinonSandbox.stub(ubarDevice, 'isWindowsMobile').returns(true);
        sinonSandbox.stub(ubarDevice, 'isAndroid').returns(false);
        ubarResolver.getAppStoreUrl(defaultConfig).should.equal(defaultConfig.windows_app_store_url);
      });

    });
  });

})();
