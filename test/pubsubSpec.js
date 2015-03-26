(function() {

  var chai = require('chai');
  var should = chai.should();
  var expect = chai.expect;

  var pubsub = require('../js/ubar/pubsub');


  describe("ubarPubsub", function () {

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it("subscribe with empty string topic does not fire a publish event", function () {
      var test = false;

      pubsub.subscribe('', function (data) {
        test = true;
      });

      test.should.equal(false);

      pubsub.publish('', {});

      test.should.equal(false);
    });

    it("subscribe with an undefined topic does not fire a publish event", function () {
      var test = false;

      pubsub.subscribe(undefined, function (data) {
        test = true;
      });

      test.should.equal(false);

      pubsub.publish(undefined, {});

      test.should.equal(false);
    });

    it("subscribe with empty object returns an empty object", function () {
      var test = false;

      pubsub.subscribe('on', function (data) {
        test = true;
      });

      test.should.equal(false);

      pubsub.publish('on', {});

      test.should.equal(true);
    });

    it("subscribe with undefined returns empty object", function () {
      var test = undefined;

      pubsub.subscribe('on', function (data) {
        test = data;
      });

      expect(test).to.be.undefined;

      pubsub.publish('on', undefined);

      expect(test).should.be.an('object');
    });

    it("subscribe with data as an object with key and value returns the object", function () {
      var test = undefined;

      pubsub.subscribe('on', function (data) {
        test = data;
      });

      expect(test).to.be.undefined;

      pubsub.publish('on', {testKey : 'testValue'});

      test.testKey.should.equal('testValue');
    });

    it("subscribe with data as a string returns the string", function () {
      var test = undefined;

      pubsub.subscribe('on', function (data) {
        test = data;
      });

      expect(test).to.be.undefined;

      pubsub.publish('on', 'I am an awesome test string');

      test.should.equal('I am an awesome test string');
    });

    it("subscribe with data as a boolean returns the boolean", function () {
      var test = undefined;

      pubsub.subscribe('on', function (data) {
        test = data;
      });

      expect(test).to.be.undefined;

      pubsub.publish('on', true);

      test.should.equal(true);
    });

    it("subscribe with data as a number returns the number", function () {
      var test = undefined;

      pubsub.subscribe('on', function (data) {
        test = data;
      });

      expect(test).to.be.undefined;

      pubsub.publish('on', Infinity);

      test.should.equal(Infinity);
    });

  });

})();
