define(function(require) {

var ubar_config = require('ubar_config');
var momentjs = require('moment');

function getTimeinMoments(time_string) {

  var timeString = time_string.split(" "),
      timeValue  = parseInt(timeString[0], 10);
      timeUnit   = timeString[1];

  return moment.duration( timeValue, timeUnit );
}

  describe("the ubar config for expiration should ", function () {

    beforeEach(function () {
      var ubar_config = require('ubar_config');
    });

    afterEach(function () {
    });

    it("be the correct enabled time", function() {
      console.log(ubar_config.defaultConfig.enabled_time);
      getTimeinMoments(ubar_config.defaultConfig.enabled_time).asMilliseconds().should.equal(31536000000);
    });

    it("not be an incorrect enabled time", function() {
      ubar_config.expirationTime.enabled.asMilliseconds().should.equal(3);
      console.log("HI");
    });

    it("be the correct disabled time", function() {
      ubar_config.expirationTime.disabled.asMilliseconds().should.equal(1209600000);
    });

    it("not be an incorrect disabled time", function() {
      ubar_config.expirationTime.disabled.asMilliseconds().should.equal(4);
    });

    it("be the correct redirected time", function() {
      ubar_config.expirationTime.disabled.asMilliseconds().should.equal(60000);
    });

    it("not be an incorrect redirected time", function() {
      ubar_config.expirationTime.disabled.asMilliseconds().should.equaltoBe(5);
    });
  });

  describe("the ubar config for redirect interval should ", function () {

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it("be the correct ios_app_store time", function() {
      ubar_config.expirationTime.enabled.asMilliseconds().should.equal(2000);
    });

    it("not be an incorrect ios_app_store time", function() {
      ubar_config.expirationTime.enabled.asMilliseconds().should.equal(3);
    });
  });
});
