UBAR
=====
UBAR: Unidirectional Browser App Resolver.


What is UBAR
-------------
UBAR is a front-end library that shepherds users into native apps from the browser and handles users returning to the browser.
With UBAR you can promote your app to your mobile-web users in a similar fashion to [Smart App Banners](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/PromotingAppswithAppBanners/PromotingAppswithAppBanners.html) but with extra functionality as well as greater ability to customize look and feel.

Mobile browser Users who turn UBAR on, will instantly be redirected to the app's deep link so they can continue in the app rather than the mobile-web.
However, if the user returns from the app to the mobile web shortly after having being redirected to the app, UBAR will recognize that they perhaps prefer the mobile web to the app and give them the ability to turn UBAR off and only continue in the mobile web.

For more details, [click here to see the Github Page](http://gilt.github.com/ubar).


How does UBAR work?
-------------------
If there's no UBAR cookie on your user's computer, we presume they have never seen the UBAR banners and give them the following choices:
* Install your app (redirects to your app in the app store)
* Always redirect them from your mobile-web to your app (turns on UBAR)
* Close this (close banner and turn off UBAR by setting UBAR cookie to off)

<pre>
                ------------------------------------------
                |   Do you want to always open in app?   |
                ------------------------------------------
                                |
                                v
        -----------------------------------------------------
      |                         |                           |
      v                         v                           v
----------------          --------------          ---------------------
| CLOSE Banner |          | INSTALL App |         | Always OPEN IN APP |
----------------          ---------------         ----------------------

</pre>


Turn UBAR On Banner
--------------------
<pre>
                       --------------------
                       |   Turn UBAR On   |
                       --------------------
                                |
                                v
             ------------------------------------------
             | Set Cookie that User has turned UBAR On |
             -------------------------------------------
                                |
                                v
-------------------------------------------------------------------
| Set short term cookie that UBAR is attempting to redirect to app |
--------------------------------------------------------------------
                                |
                                v
                 ------------------------------
                 | Try to send user to the app |
                 -------------------------------
                                |
                                v
                 ------------------------------
                | Wait for a couple of seconds |
                 -------------------------------
                                |
                                v
                              /   \
                            /       \
                          /     is    \
                        /   the user    \
                      /    still on the   \
                      \     page in the   /
                        \    browser?   /
                          \           /
                            \       /
                              \   /
                                |
                               YES
                                |
                                v
           -------------------------------------------------
          | iOS didn't find the app to redirect the user to|
           -------------------------------------------------
                                |
                                v
              -------------------------------------
              | Try to send user to the app store |
              -------------------------------------

</pre>

What it means to have UBAR on
------------------------------
The next time your user who has previously turned UBAR on, comes to your mobile-web site, the user wants to be redirected to your app from step 3 onwards of the above chart.

Installation
--------------
Ubar can be downloaded using npm.
````
npm install ubar
// or
npm install --save ubar
````

Usage
--------------
Ubar is a mostly self contained component which you can override when necessary.
Ubar works with requirejs, browserify, and on the window.

**Using requirejs:**
Copy ubar css, js, and templates directories from node modules into your project directory (i.e. public/).

In your main js module (app.js) require ubar:
````
define(function(require) {
  var ubar = require('./ubar');

  ubar.init();
});
````
You can also shim ubar in your requirejs config to look in your node_modules folder.
````
// config.js
requirejs.config({
    baseUrl: 'public',
    paths: {
        ubar: '../node_modules/ubar/js/ubar/ubar'
    }
});

// app.js
define(function(require) {
  var ubar = require('ubar');

  ubar.init();
});
````
**Using browserify:**
If you are using browserify, there is no need to copy the js to your project
directory. Instead just require ubar. If you are planning on using the ubar template and css, then you may still want to copy the ubar templates and less files to your project directory. For the [sample ubar page](http://gilt.github.com/ubar), we've chosen to accomplish this using gulp.
````
var ubar = require('ubar');

ubar.init();
````
**On the window:**
If you muuuuuust set ubar to the window (its strongly suggest you don't), ubar will work there too. Copy /dist/ubar.browserified.full.js or dist/ubar.browserified.min.js to your project folder. Add a script tag to your html page for ubar and ubar will then be avalible on the window.
````
window.ubar.init();
````

Customizing ubar
----------------
Ubar allows you to customize every config value. To see a full list of config values look in [js/ubar/config.js](https://github.com/gilt/ubar/blob/master/js/ubar/config.js). Below is an example of a customized ubar:
````
ubar.init({
  ios_app_store_url     : 'https://itunes.apple.com/us/app/appname/id331804452?mt=8',
  ios_app_deep_link     : 'gilt://',
  android_app_store_url : 'https://play.google.com/store/apps/details?id=com.gilt.android&hl=en',
  android_app_deep_link : 'gilt://',
  windows_app_store_url : 'http://www.windowsphone.com/en-us/store/app/gilt/fff0a9b7-074c-4a43-805d-cb6c81e319f8',
  windows_app_deep_link : 'gilt://'
});
````
Ubar by default uses vanilla [Handlebars](http://handlebarsjs.com/) for templating and [reqwest](https://github.com/ded/reqwest) for asynchronously loading the banner templates. Ubar allows you to use other templating modules by passing renderTemplate and loadTemplate methods during the ubar init. Ubar expects these methods to return an [A+ Promise](https://promisesaplus.com/) (ubar uses [when](https://github.com/cujojs/when) be default).
````
ubar.init({
  renderTemplate : function () { console.log('I render templates and return a Promise.');},
  loadTemplate : function () { console.log('I load templates and return a Promise.');}
});
````
