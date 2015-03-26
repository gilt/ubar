(function(exports, moduleName) {
'use strict';

function create (handlebars, when, request) {

  var templatesCache = templatesCache || {};

  /**
   * Returns a promise that resolves to a template function from templateCache.
   * If the template is not in templateCache, it requests the template and puts the template in templateCache.
   *
   * @public
   * @method loadTemplate
   *
   * @param   {String}  templateUrl  URL of template
   *
   * @return  {Promise}              Resolves to template function or rejects with reason
   */
  function loadTemplate (templateUrl) {
    if (!templatesCache[templateUrl]) {
      templatesCache[templateUrl] = requestTemplate(templateUrl);
    }

    return templatesCache[templateUrl];
  }

  /**
   * Requests the provided template.
   *
   * @public
   * @method requestTemplate
   *
   * @param   {String}  templateUrl  URL of template
   *
   * @return  {Promise}              Resolves to compiled template
   */
  function requestTemplate (templateUrl) {
    var dfd = when.defer();

    request({
      url : templateUrl,
      dataType : 'text',
      success: function (resp) {
        dfd.resolve(resp);
      }
    });

    return dfd.promise;
  }

  /**
   * Compiles the provided template.
   *
   * @public
   * @method compileTemplate
   *
   * @param   {String}  templateUrl  URL of template
   *
   * @return  {String}               Resolves to the compiled template
   */
  function compileTemplate (templateString) {
    return handlebars.compile(templateString)({});
  }

  /**
   * View class responsible for rendering the UBAR banners
   * and hiding and showing the banners.
   *
   * @public
   * @constructor
   *
   * @params {Object} config  Config object for ubar
   */
  var UbarDom = function UbarDom (config) {
    this.MAIN_UBAR_CLASS = config.component_class;
    this.UBAR_SHOW_CLASS = config.ubar_show_class;
    this.UBAR_HIDE_CLASS = config.ubar_hide_class;
  };

  /**
   * Renders a template as the first element inside body.
   *
   * @public
   * @method renderBanner
   * @param  {Object} templateSource The template to render
   */
  UbarDom.prototype.renderBanner = function renderBanner (templateSource) {
    var
      self = this,
      ubarDiv = document.createElement('div');

    return loadTemplate(templateSource).then(function (resp) {
      var content = resp instanceof XMLHttpRequest ? resp.responseText : JSON.parse(resp).responseText;

      ubarDiv.innerHTML = compileTemplate(content);
      document.body.insertBefore(ubarDiv, document.body.firstChild);
      self.banner = document.querySelectorAll('.' + self.MAIN_UBAR_CLASS)[0];
    });
  };

  /**
   * Loads a template, but does not render it.
   *
   * @public
   * @method loadBanner
   * @param  {Object} templateSource The template to render
   */
  UbarDom.prototype.loadBanner = function renderBanner (templateSource) {
    loadTemplate(templateSource);
  };

  /**
   * Removes ubar banners from the DOM.
   *
   * @public
   * @method removeBanner
   */
  UbarDom.prototype.remove = function remove () {
    if (this.banner && this.banner.parentElement) {
      document.body.removeChild(this.banner.parentElement);
      this.banner = undefined;
    }
  };

  /**
   * Hides the currently displayed banner.
   *
   * TODO: classList not supported in IE8 and IE9
   *
   * @public
   * @method hideBanner
   */
  UbarDom.prototype.hide = function hide () {
    this.banner.classList.remove(this.UBAR_SHOW_CLASS);
    this.banner.classList.add(this.UBAR_HIDE_CLASS);
  };

  /**
   * Shows the currently displayed banner.
   *
   * TODO: classList not supported in IE8 and IE9
   *
   * @public
   * @method showBanner
   */
  UbarDom.prototype.show = function show () {
    this.banner.classList.remove(this.UBAR_HIDE_CLASS);
    this.banner.classList.add(this.UBAR_SHOW_CLASS);
  };

  return UbarDom;
}

if (typeof define === 'function' && define.amd) {
  define(
    moduleName,
    ['handlebars',
     'when',
     'reqwest'],
    create
  );

} else if (typeof module === 'object' && module.exports) {
  /*
    Using CommonJS syntax, we have to explicitly require each
    module because browserify uses static module analysis.
  */
  module.exports = create(
    require('handlebars'),
    require('when'),
    require('reqwest')
  );

} else {
  /*
    Gilt build syntax. 'exports' variable could be window here
    or an empty object, as in Gilt's case
  */
  exports[moduleName] = create(
    exports.handlebars || handlebars,
    exports.when       || when,
    exports.reqwest    || reqwest
  );
}

}(typeof exports === 'object' && exports || this, 'ubar_dom' /* moduleName */));
