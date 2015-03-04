var requirejs = require('requirejs');
var chai = require('chai');
var should = chai.should();

describe('basic sanity test', function () {
  it('had better work', function () {
    true.should.equal(true);
  });

  it('be false. Fail damn it', function () {
    requirejs(['ubar_storage'], function(storage) {
      (false.should.equal(true)).should.equal(false);
      false.should.not.equal(true);
    });
  });
});
