describe('basic sanity test', function () {
  it('had better work', function () {
    expect(true).toBe(true);
  });

  it("be false. Fail damn it", function () {
    require(['ubar_storage'], function(storage) {
      expect(false).toBe(true);
    });
  });
});
