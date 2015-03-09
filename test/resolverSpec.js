(function() {

  var chai = require('chai');
  var moment = require('moment');
  var sinon = require('sinon');
  var should = chai.should();

  var defaultConfig = require('../js/ubar/config');

  var Resolver = require('../js/ubar/resolver');
  var ubar_resolver;

  var UbarHelpers = require('../js/ubar/helpers');
  var ubarHelpers = new UbarHelpers();

  var ubar_device = require('../js/ubar/device');

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
        ubar_resolver = new Resolver(defaultConfig);
        sinonSandbox.stub(ubar_device, 'isWindowsMobile').returns(true);
        sinonSandbox.stub(ubar_device, 'isAndroid').returns(false);
        ubar_resolver.getAppDeepLink(defaultConfig).should.equal(defaultConfig.windows_app_deep_link);
      });

      it('ios should return ios_app_deep_link', function () {
        ubar_resolver = new Resolver(defaultConfig);
        sinonSandbox.stub(ubar_device, 'isWindowsMobile').returns(false);
        sinonSandbox.stub(ubar_device, 'isAndroid').returns(false);
        ubar_resolver.getAppDeepLink(defaultConfig).should.equal(defaultConfig.ios_app_deep_link);
      });

      it('android should return android_app_deep_link', function () {
        ubar_resolver = new Resolver(defaultConfig);
        sinonSandbox.stub(ubar_device, 'isWindowsMobile').returns(false);
        sinonSandbox.stub(ubar_device, 'isAndroid').returns(true);
        ubar_resolver.getAppDeepLink(defaultConfig).should.equal(defaultConfig.android_app_deep_link);
      });
    });


    describe('getAppStoreUrl for ', function () {

      it('android should return android_app_store_url', function () {
        ubar_resolver = new Resolver(defaultConfig);
        sinonSandbox.stub(ubar_device, 'isWindowsMobile').returns(false);
        sinonSandbox.stub(ubar_device, 'isAndroid').returns(true);
        ubar_resolver.getAppStoreUrl(defaultConfig).should.equal(defaultConfig.android_app_store_url);
      });

      it('iOS should return ios_app_store_url', function () {
        ubar_resolver = new Resolver(defaultConfig);
        sinonSandbox.stub(ubar_device, 'isWindowsMobile').returns(false);
        sinonSandbox.stub(ubar_device, 'isAndroid').returns(false);
        ubar_resolver.getAppStoreUrl(defaultConfig).should.equal(defaultConfig.ios_app_store_url);
      });

      it('Windows should return android_app_store_url', function () {
        ubar_resolver = new Resolver(defaultConfig);
        sinonSandbox.stub(ubar_device, 'isWindowsMobile').returns(true);
        sinonSandbox.stub(ubar_device, 'isAndroid').returns(false);
        ubar_resolver.getAppStoreUrl(defaultConfig).should.equal(defaultConfig.windows_app_store_url);
      });

    });
  });

})();
