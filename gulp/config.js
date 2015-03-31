var MODULE_NAME = 'ubar';

module.exports = {

  js : {
    JS_BASE_FILE              : './js/main.js',
    BASE_MODULE_FILE          : './js/' + MODULE_NAME + '/' + MODULE_NAME + '.js',
    JS_SOURCE_FILES           : './js/' + MODULE_NAME + '/*.js',
    JS_DEST_FULL_FILE              : './' + MODULE_NAME + '.module.full.js',
    JS_DEST_MINIFIED_FILE     : './' + MODULE_NAME + '.module.min.js',
    JS_DEST_BROWSERIFIED_FILE  : './' + MODULE_NAME + '.browserified.full.js',
    JS_DEST_BROWSERIFIED_MINIFIED_FILE  : './' + MODULE_NAME + '.browserified.min.js',
    JS_DEST_FOLDER            : './dist/js'
  },

  css : {
    LESS_SOURCE_FILES : './css/' + MODULE_NAME + '/*.less',
    LESS_BASE_FILE    : './css/' + MODULE_NAME + '/' + MODULE_NAME + '.less',
    CSS_DEST_FOLDER       : './dist/css',
    GH_PAGES_CSS_FILE : './css/gh_pages/gh_pages.less'
  },

  spec : {
    SOURCE_FILES  : './test/*.js',
    SOURCE_FOLDER : './test/'
  },

  ext_deps : [
    'handlebars',
    'moment',
    'when',
    'bean',
    'reqwest'
  ],

  source_map : [
    'js/' + MODULE_NAME + '/device.js',
    'js/' + MODULE_NAME + '/pubsub.js',
    'js/' + MODULE_NAME + '/dom.js',
    'js/' + MODULE_NAME + '/helpers.js',
    'js/' + MODULE_NAME + '/resolver.js',
    'js/' + MODULE_NAME + '/storage.js',
    'js/' + MODULE_NAME + '/tracking.js',
    'js/' + MODULE_NAME + '/config.js',
    'js/' + MODULE_NAME + '/' + MODULE_NAME + '.js',
  ]
};
