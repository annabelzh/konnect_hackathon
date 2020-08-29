import facebook as FB from "..//connect.facebook.net/en_US/sdk.js";

class FacebookUtil {

    init() {
        // comes from https://developers.facebook.com/docs/javascript/quickstart
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '289539768860109',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v2.10'
            });
            window.FB.AppEvents.logPageView();
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    login() {
        window.FB.login();
        console.log("hii");
        console.log(window.FB.login());
    }
}

myacc = new FacebookUtil();
console.log(myacc.init);
myacc.init;
myacc.login;
