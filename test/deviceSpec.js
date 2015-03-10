(function() {

  var chai = require('chai');
  var moment = require('moment');
  var should = chai.should();
  var sinon = require('sinon');

  var ubarHelpers = require('../js/ubar/helpers');
  var config = require('../js/ubar/config');
  var device = require('../js/ubar/device');

  function setUserAgent (string) {
    device._setUserAgent(string);
  }

  var sinonSandbox;

  var userAgentList = {
    'ios6'       : 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',
    'ios7'       : 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53',
    'ios8'       : 'Mozilla/6.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/8.0 Mobile/10A5376e Safari/8536.25',
    'ios8_1'     : 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) CriOS/38.0.2125.67 Mobile/12B411 Safari/600.1.4',
    'android2_3' : 'Mozilla/5.0 (Linux; U; Android 2.3.4; fr-fr; HTC Desire Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
    'android4_0' : 'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    'android4_1' : 'Mozilla/5.0 (Linux; U; Android 4.1.2; nl-nl; GT-I9300 Build/JZO54K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    'android4_3' : 'Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JWR66D) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.111 Safari/537.36',
    'android4_4' : 'Mozilla/5.0 (Linux; Android 4.4; Nexus 7 Build/KOT24) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.105 Safari/537.36',
    'android5_0' : 'Mozilla/5.0 (Linux; Android 5.0; Nexus 5 Build/LPX13D) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.102 Mobile Safari/537.36',
    'windows7'   : 'Mozilla/4.0 (compatible; MSIE 7.0; Windows Phone OS 7.0; Trident/3.1; IEMobile/7.0; Nokia;N70)',
    'windows9'   : 'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)',
    'windows10'  : 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)'
  };

  var userAgentSupport = {
    'ios6'       : false,
    'ios7'       : true,
    'ios8'       : true,
    'ios8_1'     : true,
    'android2_3' : false,
    'android4_0' : false,
    'android4_1' : false,
    'android4_3' : false,
    'android4_4' : false,
    'android5_0' : false,
    'windows7'   : false,
    'windows9'   : false,
    'windows10'  : false
  };

  describe("ubar_device for", function () {

    beforeEach(function () {
      sinonSandbox = sinon.sandbox.create();
    });

    afterEach(function () {
      sinonSandbox.restore();
    });

    describe("sanity check: ", function () {
      it("should pass a test", function () {
        true.should.equal(true);
      });
    });

    describe("IOS function", function () {
      describe("isIOS",  function () {
        it("should return true for IOS6", function () {
          setUserAgent(userAgentList.ios6);
          device.isIOS().should.equal(true);
        });
        it("should return true for IOS7", function () {
          setUserAgent(userAgentList.ios7);
          device.isIOS().should.equal(true);
        });
        it("should return true for IOS8", function () {
          setUserAgent(userAgentList.ios8);
          device.isIOS().should.equal(true);
        });
        it("should return true for IOS8.1", function () {
          setUserAgent(userAgentList.ios8_1);
          device.isIOS().should.equal(true);
        });
        it("should return false for Android", function () {
          setUserAgent(userAgentList.android4_3);
          device.isIOS().should.equal(false);
        });
        it("should return false for WindowsMobile", function () {
          setUserAgent(userAgentList.windows10);
          device.isIOS().should.equal(false);
        });
      });

      describe("isSupportedIOS", function () {
        it("should return false for IOS6", function () {
          setUserAgent(userAgentList.ios6);
          device._isSupportedIOS(config.min_ios_support).should.equal(false);
        });
        it("should return true for IOS7", function () {
          setUserAgent(userAgentList.ios7);
          device._isSupportedIOS(config.min_ios_support).should.equal(true);
        });
        it("should return true for IOS8", function () {
          setUserAgent(userAgentList.ios8);
          device._isSupportedIOS(config.min_ios_support).should.equal(true);
        });
        it("should return true for IOS8.1", function () {
          setUserAgent(userAgentList.ios8_1);
          device._isSupportedIOS(config.min_ios_support).should.equal(true);
        });
        it("should return false for Android", function () {
          setUserAgent(userAgentList.android4_3);
          device._isSupportedIOS(config.min_ios_support).should.equal(false);
        });
        it("should return false for WindowsMobile", function () {
          setUserAgent(userAgentList.windows10);
          device._isSupportedIOS(config.min_ios_support).should.equal(false);
        });
      });

      describe("getIOSVersion", function () {
        it("should return 6 for IOS6", function () {
          setUserAgent(userAgentList.ios6);
          device._getIOSVersion().should.equal(6);
        });
        it("should return 7 for IOS7", function () {
          setUserAgent(userAgentList.ios7);
          device._getIOSVersion().should.equal(7);
        });
        it("should return 8 for IOS8", function () {
          setUserAgent(userAgentList.ios8);
          device._getIOSVersion().should.equal(8);

        });
        it("should return 8.1 for IOS8.1", function () {
          setUserAgent(userAgentList.ios8_1);
          device._getIOSVersion().should.equal(8.1);
        });
        it("should return 0 for Android", function () {
          setUserAgent(userAgentList.android4_3);
          device._getIOSVersion().should.equal(0);
        });
        it("should return 0 for WindowsMobile", function () {
          setUserAgent(userAgentList.windows10);
          device._getIOSVersion().should.equal(0);
        });
      });
    });

    describe("Android function", function () {
      describe("isAndroid",  function () {
        it("should return true for Android 2.3", function () {
          setUserAgent(userAgentList.android2_3);
          device.isAndroid().should.equal(true);
        });
        it("should return true for Android 4.0", function () {
          setUserAgent(userAgentList.android4_0);
          device.isAndroid().should.equal(true);
        });
        it("should return true for Android 4.1", function () {
          setUserAgent(userAgentList.android4_1);
          device.isAndroid().should.equal(true);
        });
        it("should return true for Android 4.3", function () {
          setUserAgent(userAgentList.android4_3);
          device.isAndroid().should.equal(true);
        });
        it("should return true for Android 4.4", function () {
          setUserAgent(userAgentList.android4_4);
          device.isAndroid().should.equal(true);
        });
        it("should return true for Android 5.0", function () {
          setUserAgent(userAgentList.android5_0);
          device.isAndroid().should.equal(true);
        });
        it("should return false for IOS", function () {
          setUserAgent(userAgentList.ios6);
          device.isAndroid().should.equal(false);
        });
        it("should return false for WindowsMobile", function () {
          setUserAgent(userAgentList.windows10);
          device.isAndroid().should.equal(false);
        });
      });

      describe("getAndroidVersion", function () {
        it("should return true for Android 2.3", function () {
          setUserAgent(userAgentList.android2_3);
          device._getAndroidVersion().should.equal(2.3);
        });
        it("should return true for Android 4.0", function () {
          setUserAgent(userAgentList.android4_0);
          device._getAndroidVersion().should.equal(4.0);
        });
        it("should return true for Android 4.1", function () {
          setUserAgent(userAgentList.android4_1);
          device._getAndroidVersion().should.equal(4.1);
        });
        it("should return true for Android 4.3", function () {
          setUserAgent(userAgentList.android4_3);
          device._getAndroidVersion().should.equal(4.3);
        });
        it("should return true for Android 4.4", function () {
          setUserAgent(userAgentList.android4_4);
          device._getAndroidVersion().should.equal(4.4);
        });
        it("should return true for Android 5.0", function () {
          setUserAgent(userAgentList.android5_0);
          device._getAndroidVersion().should.equal(5.0);
        });
        it("should return false for IOS", function () {
          setUserAgent(userAgentList.ios6);
          device._getAndroidVersion().should.equal(0);
        });
        it("should return false for WindowsMobile", function () {
          setUserAgent(userAgentList.windows10);
          device._getAndroidVersion().should.equal(0);
        });
      });

      describe("_isSupportedAndroid", function () {
        it("should return true for Android 2.3", function () {
          setUserAgent(userAgentList.android2_3);
          device._isSupportedAndroid(config.min_android_support).should.equal(false);
        });
        it("should return true for Android 4.0", function () {
          setUserAgent(userAgentList.android4_0);
          device._isSupportedAndroid(config.min_android_support).should.equal(false);
        });
        it("should return true for Android 4.1", function () {
          setUserAgent(userAgentList.android4_1);
          device._isSupportedAndroid(config.min_android_support).should.equal(false);
        });
        it("should return true for Android 4.3", function () {
          setUserAgent(userAgentList.android4_3);
          device._isSupportedAndroid(config.min_android_support).should.equal(true);
        });
        it("should return true for Android 4.4", function () {
          setUserAgent(userAgentList.android4_4);
          device._isSupportedAndroid(config.min_android_support).should.equal(true);
        });
        it("should return true for Android 5.0", function () {
          setUserAgent(userAgentList.android5_0);
          device._isSupportedAndroid(config.min_android_support).should.equal(true);
        });
        it("should return false for IOS", function () {
          setUserAgent(userAgentList.ios6);
          device._isSupportedAndroid(config.min_android_support).should.equal(false);
        });
        it("should return false for WindowsMobile", function () {
          setUserAgent(userAgentList.windows10);
          device._isSupportedAndroid(config.min_android_support).should.equal(false);
        });
      });
    });

    describe("WindowsMobile function", function () {
      describe("isWindowsMobile",  function () {
        it("should return true for WindowsMobile 7", function () {
          setUserAgent(userAgentList.windows7);
          device.isWindowsMobile().should.equal(true);
        });
        it("should return true for WindowsMobile 9", function () {
          setUserAgent(userAgentList.windows9);
          device.isWindowsMobile().should.equal(true);
        });
        it("should return true for WindowsMobile 10", function () {
          setUserAgent(userAgentList.windows10);
          device.isWindowsMobile().should.equal(true);
        });
        it("should return false for IOS", function () {
          setUserAgent(userAgentList.ios8_1);
          device.isWindowsMobile().should.equal(false);
        });
        it("should return false for Android", function () {
          setUserAgent(userAgentList.android4_3);
          device.isWindowsMobile().should.equal(false);
        });
      });

      describe("getWindowsMobileVersion",  function () {
        it("should return true for WindowsMobile 7", function () {
          setUserAgent(userAgentList.windows7);
          device._getWindowsMobileVersion().should.equal(7);
        });
        it("should return true for WindowsMobile 9", function () {
          setUserAgent(userAgentList.windows9);
          device._getWindowsMobileVersion().should.equal(9);
        });
        it("should return true for WindowsMobile 10", function () {
          setUserAgent(userAgentList.windows10);
          device._getWindowsMobileVersion().should.equal(10);
        });
        it("should return false for IOS", function () {
          setUserAgent(userAgentList.ios8_1);
          device._getWindowsMobileVersion().should.equal(0);
        });
        it("should return false for Android", function () {
          setUserAgent(userAgentList.android4_3);
          device._getWindowsMobileVersion().should.equal(0);
        });
      });

      describe("isSupportedWindowsMobile",  function () {
        it("should return false for WindowsMobile 7", function () {
          setUserAgent(userAgentList.windows7);
          device._isSupportedWindowsMobile(config.min_windows_mobile_support).should.equal(false);
        });
        it("should return false for WindowsMobile 9", function () {
          setUserAgent(userAgentList.windows9);
          device._isSupportedWindowsMobile(config.min_windows_mobile_support).should.equal(false);
        });
        it("should return false for WindowsMobile 10", function () {
          setUserAgent(userAgentList.windows10);
          device._isSupportedWindowsMobile(config.min_windows_mobile_support).should.equal(false);
        });
        it("should return true if we override config for WindowsMobile 10", function () {
          setUserAgent(userAgentList.windows10);
          sinonSandbox.stub(config, 'min_windows_mobile_support', 10);
          device._isSupportedWindowsMobile(config.min_windows_mobile_support).should.equal(true);
        });
        it("should return false for IOS", function () {
          setUserAgent(userAgentList.ios8_1);
          device._isSupportedWindowsMobile(config.min_windows_mobile_support).should.equal(false);
        });
        it("should return false for Android", function () {
          setUserAgent(userAgentList.android4_3);
          device._isSupportedWindowsMobile(config.min_windows_mobile_support).should.equal(false);
        });
      });
    });

    describe("function isAppSupported", function () {
      Object.keys(userAgentList).forEach(function (key) {
        it("should return " + userAgentSupport[key] + " for " + key, function () {
          setUserAgent(userAgentList[key]);
          device.isAppSupported(config).should.equal(userAgentSupport[key]);
        });
      });
    });
  });
})();
