(function() {

  var chai = require('chai');
  var should = chai.should();
  var expect = chai.expect();

  var sinon = require('sinon');
  var server;

  var defaultConfig = require('../js/ubar/config');
  var ubarHelpers = require('../js/ubar/helpers');

  var Dom = require('../js/ubar/dom');
  var ubarDom = new Dom(defaultConfig);

  var templateHtml = '<div class="component-ubar ubar-hide"></div>';

  describe("Ubar Dom 'sending template' ", function () {

    beforeEach(function (done) {
      this.server = sinon.fakeServer.create();

      this.server.respondWith("GET", defaultConfig.sending_template_path,
        [ 200, { "Content-Type": "text" }, JSON.stringify({ 'responseText' : '<div class="component-ubar ubar-hide"></div>' }) ]);

      // Wait until banner is rendered before continuing with any tests
      ubarDom.renderBanner(defaultConfig.sending_template_path).then(function() {
        done();
      });

      this.server.respond();
    });

    afterEach(function () {
      this.server.restore();
    });

    // it("renderBanner function", function () {
    //   ubarDom.renderBanner().should.eventually.equal("foo").notify(done);
    // });

    it("show function", function () {
      ubarDom.show();
      ubarDom.banner.className.should.equal("component-ubar ubar-show");
    });

    it("hide function", function () {
      ubarDom.hide();
      ubarDom.banner.className.should.equal("component-ubar ubar-hide");
    });

    it("remove function", function () {
      ubarDom.remove();
      should.not.exist(ubarDom.banner);
    });

  });

})();
