(function() {

  var chai = require('chai');
  var should = chai.should();

  var ubarTracking = require('../js/ubar/tracking');
  var subscribe = require('../js/ubar/pubsub').subscribe;


  describe("ubarTracking ", function () {

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it("turnUbarOn publishes an event with key: turnedUbarOn", function () {
      var test = false;

      subscribe('turnedUbarOn', function () {
        test = true;
      });

      test.should.equal(false);

      ubarTracking.turnUbarOn();

      test.should.equal(true);
    });

    it("turnUbarOff publishes an event with key: turnedUbarOff", function () {
      var test = false;

      subscribe('turnedUbarOff', function () {
        test = true;
      });

      test.should.equal(false);

      ubarTracking.turnUbarOff();

      test.should.equal(true);
    });

    it("choseDownloadApp publishes an event with key: choseDownloadApp", function () {
      var test = false;

      subscribe('choseDownloadApp', function () {
        test = true;
      });

      test.should.equal(false);

      ubarTracking.choseDownloadApp();

      test.should.equal(true);
    });

    it("closeBanner publishes an event with key: closedBanner", function () {
      var test = false;

      subscribe('closedBanner', function () {
        test = true;
      });

      test.should.equal(false);

      ubarTracking.closeBanner();

      test.should.equal(true);
    });

    it("returnToApp publishes an event with key: returnedToApp", function () {
      var test = false;

      subscribe('returnedToApp', function () {
        test = true;
      });

      test.should.equal(false);

      ubarTracking.returnToApp();

      test.should.equal(true);
    });

    it("attemptToRedirectToAppStore publishes an event with key: attemptedToRedirectToAppStore", function () {
      var test = false;

      subscribe('attemptedToRedirectToAppStore', function () {
        test = true;
      });

      test.should.equal(false);

      ubarTracking.attemptToRedirectToAppStore();

      test.should.equal(true);
    });

    it("attemptToRedirectToApp publishes an event with key: attemptedToRedirectToApp", function () {
      var test = false;

      subscribe('attemptedToRedirectToApp', function () {
        test = true;
      });

      test.should.equal(false);

      ubarTracking.attemptToRedirectToApp();

      test.should.equal(true);
    });

    it("showBanner publishes an event with key: showedBanner", function () {
      var test = false;

      subscribe('showedBanner', function () {
        test = true;
      });

      test.should.equal(false);

      ubarTracking.showBanner();

      test.should.equal(true);
    });
  });

})();
