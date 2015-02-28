UBAR 
=====
UBAR: Unidirectional Browser App Resolver.


What is UBAR
-------------
UBAR is a front-end library that shepherds users into native apps from the browser and handles users returning to the browser.
With UBAR you can promote your app to your mobile-web users in a similar fashion to [Smart App Banners](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/PromotingAppswithAppBanners/PromotingAppswithAppBanners.html) but with extra functionality as well as greater ability to customize look and feel.

Mobile browser Users who turn UBAR on, will instantly be redirected to the app's deep link so they can continue in the app rather than the mobile-web.
However, if the user returns from the app to the mobile web shortly after having being redirected to the app, UBAR will recognize that they perhaps prefer the mobile web to the app and give them the ability to turn UBAR off and only continue in the mobile web.


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
