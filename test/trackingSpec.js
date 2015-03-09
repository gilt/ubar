(function() {

  var chai = require('chai');
  var moment = require('moment');
  var should = chai.should();

  var ubar_tracking = require('../js/ubar/tracking');

  describe("ubar_tracking ", function () {

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it("_turnUbarOn is a no-op", function () {
      ubar_tracking.turnUbarOn().should.equal(true);
      ubar_tracking.turnUbarOn().should.not.equal(false);
    });

    it("_turnUbarOff is a no-op", function () {
      ubar_tracking.turnUbarOff().should.equal(true);
      ubar_tracking.turnUbarOff().should.not.equal(false);
    });

    it("_attemptToRedirectToAppStore is a no-op", function () {
      ubar_tracking.attemptToRedirectToAppStore().should.equal(true);
      ubar_tracking.attemptToRedirectToAppStore().should.not.equal(false);
    });

    it("_attemptToRedirectToApp is a no-op", function () {
      ubar_tracking.attemptToRedirectToApp().should.equal(true);
      ubar_tracking.attemptToRedirectToApp().should.not.equal(false);
    });

    it("_showReturningBanner is a no-op", function () {
      ubar_tracking.showReturningBanner().should.equal(true);
      ubar_tracking.showReturningBanner().should.not.equal(false);
    });

    it("_showSendingBanner is a no-op", function () {
      ubar_tracking.showSendingBanner().should.equal(true);
      ubar_tracking.showSendingBanner().should.not.equal(false);
    });
  });

})();
