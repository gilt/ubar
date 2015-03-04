(function (name, root, factory) {

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(
      name,

      [
       '../node_modules/handlebars/dist/handlebars.min.js',
       '../node_modules/when/when.js'
      ],

      factory
    );

  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(
      require('../node_modules/handlebars/dist/handlebars.min.js'),
      requre('../node_modules/when/when.js')
    );

  } else {
    root[name] = factory(
      root['handlebars'],
      root['when']
    );
  }

} ('ubar_dom', this, function ubar_dom (handlebars, when) {

    'use strict';

    var
      MAIN_UBAR_CLASS = 'main-ubar',
      BODY_ELEM = 'body',
      UBAR_SHOW_CLASS = 'ubar-show',
      UBAR_HIDE_CLASS = 'ubar-hide',
      MIN_IOS_SUPPORT = 7,
      banner,
      html = document.querySelectorAll('html')[0];


  /**
   * Renders a template as the first element inside body.
   *
   * @private
   * @method renderTemplate
   * @param  {Object} templateSource The template to render
   */
  function renderTemplate (templateSource) {
    var dfd = when.defer(),
        bodyElem = document.querySelectorAll('.' + BODY_ELEM)[0],
        ubarDiv = document.createElement('div'),
        renderedHtml;

    when(handlebars.compile(templateSource)).then(function(template) {
      when(template({})).then(function(renderedHtml) {

        ubarDiv.innerHTML = renderedHtml;
        bodyElem.parentElement.insertBefore(ubarDiv, bodyElem.firstChild);
        banner = document.querySelectorAll('.' + MAIN_UBAR_CLASS)[0];

        dfd.resolve(renderedHtml);
      });
    });

    return dfd.promise;
  }

  /**
   * Removes ubar banners from the DOM.
   *
   * @public
   * @method removeBanner
   */
  function removeBanner () {
    var ubarElem = document.querySelectorAll('.' + MAIN_UBAR_CLASS)[0],
        ubarParentElem;

    if (ubarElem) {
      ubarParentElem = ubarElem.parentElement;
      ubarParentElem.remove();
    }
  }

  /**
   * Hides the currently displayed banner.
   *
   * TODO: classList not supported in IE8 and IE9
   *
   * @public
   * @method hideBanner
   */
  function hideBanner () {
    banner.classList.remove(UBAR_SHOW_CLASS);
    banner.classList.add(UBAR_HIDE_CLASS);
  }

  /**
   * Shows the currently displayed banner.
   *
   * TODO: classList not supported in IE8 and IE9
   *
   * @public
   * @method showBanner
   */
  function showBanner () {
    banner.classList.remove(UBAR_HIDE_CLASS);
    banner.classList.add(UBAR_SHOW_CLASS);
  }

  /**
   * Determine if device is iPhone safari based on browser_detect module.
   *
   * TODO: classList not supported in IE8 and IE9
   *
   * @public
   * @method isIOS
   */
  function isIOS () {
    return html.classList.contains('mobile') && html.classList.contains('ios');
  }

  /**
   * Determine if device is ios greater or equal to current minimum ios the app
   * supports based on browser_detect module.
   *
   * @private
   * @method isSupportedIOS
   */
  function isSupportedIOS () {
    return isIOS() && parseInt(html.className.match(/ios(\d+)_(\d+)/)[1], 10) >= MIN_IOS_SUPPORT;
  }

  /**
   * Determine it there is an app for this device which supports open to app
   *
   * @public
   * @method isAppSupported
   */
  function isAppSupported () {
    return isSupportedIOS();
  }

  return {
    version: '$$PACKAGE_VERSION$$',
    isAppSupported : isAppSupported,
    isIOS : isIOS,
    hide: hideBanner,
    show: showBanner,
    remove: removeBanner,
    renderTemplate: renderTemplate,
  };

}));
