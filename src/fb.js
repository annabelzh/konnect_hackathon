function init() {
    FB.api(
        '/l214.animaux',
        { "fields": "fan_count" },
        function (response) {
            alert(response.fan_count);
        }
    );
}

window.fbAsyncInit = function () {
    FB.init({
        appId: 'your-app-id',
        xfbml: true,
        version: 'v2.5'
    });

    init();
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
