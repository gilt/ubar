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

    it("showReturningBanner publishes an event with key: showedReturningBanner", function () {
      var test = false;

      subscribe('showedReturningBanner', function () {
        test = true;
      });

      test.should.equal(false);

      ubarTracking.showReturningBanner();

      test.should.equal(true);
    });

    it("showSendngBanner publishes an event with key: showedSendingBanner", function () {
      var test = false;

      subscribe('showedSendingBanner', function () {
        test = true;
      });

      test.should.equal(false);

      ubarTracking.showSendingBanner();

      test.should.equal(true);
    });
  });

})();
