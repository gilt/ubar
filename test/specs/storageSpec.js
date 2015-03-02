var requirejs = require('requirejs');
var chai = require('chai');
var should = chai.should();

describe('basic require test for ubar_storage', function () {
  it('works', function () {
    var storage = requirejs(['ubar_storage'], function(storage) {
      return storage;
    });
    storage.should.not.equal(undefined);
  })
})

describe("the ubar_storage for UBAR cookie should ", function () {


  beforeEach(function () {
    console.log('beforeEach');

  });

  afterEach(function () {
    console.log('afterEach');

    requirejs(['ubar_storage'], function (storage) {
      console.log('clear');
      storage.clear();
    });
  });

  it("be undefined to start", function () {
    requirejs(['ubar_storage'], function(storage) {
      console.log('start');
      storage.isUbarEnabled.should.equal(false);
      storage.isUbarDisabled.should.equal(false);
    });
  });
});


