(function() {

  var chai = require('chai');
  var moment = require('moment');
  var should = chai.should();

  var ubarTracking = require('../js/ubar/tracking');


  describe("ubarTracking ", function () {

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it("_turnUbarOn is a no-op", function () {
      ubarTracking.turnUbarOn().should.equal(true);
      ubarTracking.turnUbarOn().should.not.equal(false);
    });

    it("_turnUbarOff is a no-op", function () {
      ubarTracking.turnUbarOff().should.equal(true);
      ubarTracking.turnUbarOff().should.not.equal(false);
    });

    it("_attemptToRedirectToAppStore is a no-op", function () {
      ubarTracking.attemptToRedirectToAppStore().should.equal(true);
      ubarTracking.attemptToRedirectToAppStore().should.not.equal(false);
    });

    it("_attemptToRedirectToApp is a no-op", function () {
      ubarTracking.attemptToRedirectToApp().should.equal(true);
      ubarTracking.attemptToRedirectToApp().should.not.equal(false);
    });

    it("_showReturningBanner is a no-op", function () {
      ubarTracking.showReturningBanner().should.equal(true);
      ubarTracking.showReturningBanner().should.not.equal(false);
    });

    it("_showSendingBanner is a no-op", function () {
      ubarTracking.showSendingBanner().should.equal(true);
      ubarTracking.showSendingBanner().should.not.equal(false);
    });
  });

})();
