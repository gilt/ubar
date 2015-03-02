var requirejs = require('requirejs');
var chai = require('chai');
var should = chai.should();

describe("the ubar config for expiration should ", function () {

	beforeEach(function () {
	});

	afterEach(function () {
	});

	it("be the correct enabled time", function() {
		requirejs(['ubar_config'], function(conf) {
			// expect(conf.expirationTime.enabled.asMilliseconds()).toBe(31536000000);
			// console.log(conf.expirationTime.enabled.asMilliseconds());
			// console.log(expect);
			// expect(false).toBe(true);
		});
	});

	it("not be an incorrect enabled time", function() {
		requirejs(['ubar_config'], function(conf) {
			conf.expirationTime.enabled.asMilliseconds().should.equal(3);
		});
	});

	it("be the correct disabled time", function() {
		requirejs(['ubar_config'], function(conf) {
			conf.expirationTime.disabled.asMilliseconds().should.equal(1209600000);
		});
	});

	it("not be an incorrect disabled time", function() {
		requirejs(['ubar_config'], function(conf) {
			conf.expirationTime.disabled.asMilliseconds().should.equal(4);
		});
	});

	it("be the correct redirected time", function() {
		requirejs(['ubar_config'], function(conf) {
			conf.expirationTime.disabled.asMilliseconds().should.equal(60000);
		});
	});

	it("not be an incorrect redirected time", function() {
		requirejs(['ubar_config'], function(conf) {
			conf.expirationTime.disabled.asMilliseconds().should.equaltoBe(5);
		});
	});
});

describe("the ubar config for redirect interval should ", function () {

	beforeEach(function () {
	});

	afterEach(function () {
	});

	it("be the correct ios_app_store time", function() {
		requirejs(['ubar_config'], function(conf) {
			conf.expirationTime.enabled.asMilliseconds().should.equal(2000);
		});
	});

	it("not be an incorrect ios_app_store time", function() {
		requirejs(['ubar_config'], function(conf) {
			conf.expirationTime.enabled.asMilliseconds().should.equal(3);
		});
	});
});

