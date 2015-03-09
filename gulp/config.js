// JS configs
var JS_BASE_FILE = './js/main.js';
var JS_SOURCE_FILES = './js/ubar/*.js';
var JS_DEST_FOLDER = './';
var JS_DEST_FILE = './main.min.js';

// CSS configs
var CSS_SOURCE_FILES = './css/ubar/*.less';
var CSS_DEST_FOLDER = './css/ubar';
var CSS_DEST_FILE = 'ubar.css';

// SPEC configs
var SPEC_SOURCE_FOLDER = './test/';
var SPEC_SOURCE_FILES = SPEC_SOURCE_FOLDER + '*.js';

module.exports = {
	js : {
		BASE_FILE    : JS_BASE_FILE,
		SOURCE_FILES : JS_SOURCE_FILES,
		DEST_FILE    : JS_DEST_FILE,
		DEST_FOLDER  : JS_DEST_FOLDER
	},

	css : {
		SOURCE_FILES : CSS_SOURCE_FILES,
		DEST_FILE   : CSS_DEST_FILE,
		DEST_FOLDER : CSS_DEST_FOLDER
	},

	spec : {
		SOURCE_FILES  : SPEC_SOURCE_FILES,
		SOURCE_FOLDER : SPEC_SOURCE_FOLDER
	}

};
