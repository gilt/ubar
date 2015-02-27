describe('basic require test for ubar_storage', function () {
  it('works', function () {
    var storage = require(['ubar_storage'], function(storage) {
      return storage;
    });
    expect(storage).toBeDefined();
  })
})

describe("the ubar_storage for UBAR cookie should ", function () {


  beforeEach(function () {
    console.log('beforeEach');

  });

  afterEach(function () {
    console.log('afterEach');

    require(['ubar_storage'], function (storage) {
      console.log('clear');
      storage.clear();
    });
  });

  it("be undefined to start", function () {
    require(['ubar_storage'], function(storage) {
      console.log('start');
      expect(storage.isUbarEnabled).toBe(false);
      expect(storage.isUbarDisabled).toBe(false);
    });
  });

  it("be false. Fail damn it", function () {
    require(['ubar_storage'], function(storage) {
      expect(false).toBe(true);
    });
  });
});


