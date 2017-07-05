(function(exports, moduleName) {
'use strict';

function create (handlebars, when, request) {

  var templatesCache = templatesCache || {};

  /**
   * Requests the provided template.
   *
   * @private
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
      type: 'text',
      success: function (resp) {
        dfd.resolve(handlebars.compile(resp.responseText));
      }
    });

    return dfd.promise;
  }

  /**
   * Returns a promise that resolves to a template function from templateCache.
   * If the template is not in templateCache, it requests the template and puts the template in templateCache.
   *
   * @protected
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
   * Renders template with passed in content
   *
   * @protected
   * @method renderTemplate
   *
   * @param   {String}  templateUrl  URL of template
   * @param   {Object}  content      data to render template with
   *
   * @return  {String}               Resolves to the compiled template
   */
  function renderTemplate (templateUrl, content) {
    content = content || {};
    return loadTemplate(templateUrl).then(function (template) {
      return template(content);
    });
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
    this.UBAR_CONTAINER_CLASS = config.ubar_container;
    this._renderTemplate = config.renderTemplate || renderTemplate;
    this._loadTemplate = config.loadTemplate || loadTemplate;
  };

  /**
   * Renders UBAR template.
   *
   * If a pre-existing UBAR-dedicated container element is found in the DOM, then uses that. Otherwise, creates a new container as the first element of the body.
   * Injects the UBAR markup in the container.
   *
   * @public
   * @method renderBanner
   * @param  {Object} templateSource The template to render
   * @return  {Promise} Resolves after adding banner to the dom, otherwise rejects.
   */
  UbarDom.prototype.renderBanner = function renderBanner (templateSource) {
    var
      self = this,
      ubarContainer = document.querySelector('.' + self.UBAR_CONTAINER_CLASS);

    return this._renderTemplate(templateSource).then(function (renderedHtml) {
      if (!ubarContainer) {
        // No pre-existing UBAR Container Element was found.
        ubarContainer = document.createElement('div');
        document.body.insertBefore(ubarContainer, document.body.firstChild);
      }
      ubarContainer.innerHTML = renderedHtml;
      self.banner = ubarContainer.querySelector('.' + self.MAIN_UBAR_CLASS);
    });
  };

  /** Loads a template, but does not render it.
   *
   * @public
   * @method loadBanner
   * @param  {Object} templateSource The template to render
   */
  UbarDom.prototype.loadBanner = function renderBanner (templateSource) {
    this._loadTemplate(templateSource);
  };

  /**
   * Removes ubar banners from the DOM.
   *
   * As browser support for `ChildNode.remove()` isn't great, we need to rely on `Node.removeChild()` instead.
   * @public
   * @method removeBanner
   */
  UbarDom.prototype.remove = function remove () {
    var ubarContainer;

    if (this.banner && this.banner.parentElement) {
      ubarContainer = this.banner.parentElement;
      if (ubarContainer.parentElement) {
        // If the container has a parent element, then it's safe to remove the container.
        ubarContainer.parentElement.removeChild(ubarContainer);
      }
      else {
        // Otherwise, just remove the banner.
        ubarContainer.removeChild(this.banner);
      }

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
