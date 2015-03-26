// JS configs
var JS_BASE_FILE = './js/main.js';
var JS_MODULE_BASE_FILE = './js/ubar/ubar.js';
var JS_SOURCE_FILES = './js/ubar/*.js';
var JS_DEST_FOLDER = './';
var JS_DEST_FILE = './ubar.js';
var JS_DEST_MINIFIED_FILE = './ubar.min.js';
var JS_MODULE_ONLY = './ubar.module.js';

// CSS configs
var CSS_SOURCE_FILES = './css/ubar/*.less';
var CSS_BASE_FILE = './css/ubar/ubar.less';
var CSS_DEST_FOLDER = './';
var CSS_DEST_FILE = 'ubar.css';

var CSS_PAGE_BASE_FILE = './css/page/page.less';

// SPEC configs
var SPEC_SOURCE_FOLDER = './test/';
var SPEC_SOURCE_FILES = SPEC_SOURCE_FOLDER + '*.js';

var external_dependencies = [
	'handlebars',
	'moment',
	'when',
	'bean',
	'reqwest'
];

/*
this order is super important as it gets added to exports
sequnetially in the Gilt build.
*/
var source_map = [
	'js/ubar/device.js',
	'js/ubar/pubsub.js',
	'js/ubar/dom.js',
	'js/ubar/helpers.js',
	'js/ubar/resolver.js',
	'js/ubar/storage.js',
	'js/ubar/tracking.js',
	'js/ubar/config.js',
	'js/ubar/ubar.js',
];

module.exports = {
	js : {
		BASE_FILE    		: JS_BASE_FILE,
		BASE_MODULE_FILE 	: JS_MODULE_BASE_FILE,
		SOURCE_FILES 		: JS_SOURCE_FILES,
		DEST_FILE    		: JS_DEST_FILE,
		DEST_MINIFIED_FILE 	: JS_DEST_MINIFIED_FILE,
		DEST_MODULE_FILE	: JS_MODULE_ONLY,
		DEST_FOLDER  		: JS_DEST_FOLDER,
	},

	css : {
		SOURCE_FILES 	: CSS_SOURCE_FILES,
		BASE_FILE 		: CSS_BASE_FILE,
		DEST_FILE   	: CSS_DEST_FILE,
		DEST_FOLDER 	: CSS_DEST_FOLDER,
		PAGE_FILE       : CSS_PAGE_BASE_FILE
	},

	spec : {
		SOURCE_FILES  : SPEC_SOURCE_FILES,
		SOURCE_FOLDER : SPEC_SOURCE_FOLDER
	},

	ext_deps : external_dependencies,
	source_map : source_map
};
