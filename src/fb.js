import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import FB from 'fb';

var allPosts = { "data": [] };
var uniqPosts = {};

export const pls = () => {
    console.log("get all posts");
    console.log(allPosts);
    return allPosts;
}

export default class Facebook extends Component {

    state = {
        isLoggedIn: false,
        auth: false,
        name: '',
        email: '',
        picture: '',
        allPosts: { "data": [] },
    };

    responseFacebook = response => {
        console.log("response");
        console.log(response);
        if (response.status !== 'unknown')
            this.setState({
                isLoggedIn: true,
                userID: response.userID,
                auth: true,
                name: response.name,
                email: response.email,
                picture: response.picture.data.url,
            });
    }

    componentClicked = () => {
        console.log('Facebook btn clicked');
        // this.checkLoginState();
    }

    checkLoginState() {
        window.FB.getLoginStatus(function (response) {
            this.statusChangeCallback(response);
        });
    }

    setElements(isLoggedIn) {
        if (isLoggedIn) {
            document.getElementById('logout').style.display = 'block';
            document.getElementById('profile').style.display = 'block';
            document.getElementById('feed').style.display = 'block';
            document.getElementById('fb-btn').style.display = 'none';
            document.getElementById('heading').style.display = 'none';
        } else {
            document.getElementById('logout').style.display = 'none';
            document.getElementById('profile').style.display = 'none';
            document.getElementById('feed').style.display = 'none';
            document.getElementById('fb-btn').style.display = 'block';
            document.getElementById('heading').style.display = 'block';
        }
    }

    statusChangeCallback(response) {
        if (response.status === 'connected') {
            console.log('Logged in and authenticated');
            this.setElements(true);
            console.log("connected");
            this.testAPI();
        } else {
            console.log('Not authenticated');
            this.setElements(false);
        }
    }

    testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        // FB.api('/me', function (response) {
        //     console.log('Successful login for: ' + response.name);
        //     document.getElementById('status').innerHTML =
        //         'Thanks for logging in, ' + response.name + '!';
        // });

        FB.api('/me?fields=name,email,birthday,location', function (response) {
            if (response && !response.error) {
                //console.log(response);
                this.buildProfile(response);
            }

            FB.api('/me/feed', function (response) {
                if (response && !response.error) {
                    this.buildFeed(response);
                }
            });
        })

        // FB.api(
        //     '/108579077594343/feed',
        //     'GET',
        //     {},
        //     function (response) {
        //         // Insert your code here
        //         console.log(response);
        //     }
        // );
    }

    showFeed = () => {
        // console.log("CONTENT IS HEREEEEEE");
        allPosts = { "data": [] };

        window.FB.api(
            '/108579077594343/feed',
            'GET',
            {},
            function (response) {
                // Insert your code here
                // console.log(response);
                let output = '<h3>Latest Posts</h3>';
                for (let i in response.data) {
                    if (response.data[i].message && !(response.data[i].id in uniqPosts)) {
                        // can remove additional text here it's for debugging

                        var post = { "author": "Hoogle Bot", "text": response.data[i].message, "created_at": response.data[i].created_time, "id": response.data[i].id };
                        // console.log("post", post);
                        allPosts["data"].push(post);
                        output += `<div class="well">${response.data[i].message} <span> created time: ${response.data[i].created_time}</span><span> id: ${response.data[i].id}</span></div>`;
                        uniqPosts[response.data[i].id] = 1;
                    }
                }

                // document.getElementById('feed').innerHTML = output;
            }
        );

        // console.log("final");
        // console.log(allPosts);

        // this.passAllPosts(allPosts);
        // return allPosts;
    }

    // THE FUNCTION THAT SHOULD RETURN THE DATA IN THIS FORMAT
    // var post = { "author": "Hoogle Bot", 
    //              "text": response.data[i].message, 
    //              "created_at": response.data[i].created_time, 
    //              "id": response.data[i].id 
    //             };
    getAllPosts() {
        console.log("get all posts");
        console.log(allPosts);
        return allPosts;
        // var OG = "108579077594343_138201507965433";
        // var res = OG.split("_");
        // this.deletePost(res[1]);
    }

    deletePost(postId) {
        console.log("Deleting Post");
        window.FB.api(postId, '/108579077594343/feed',
            'DELETE',
            {}, function (response) {
                if (!response || response.error) {
                    alert('Error occured');
                } else {
                    alert('Post was deleted');
                }
            });
    }

    render() {

        let facebookData;

        this.state.auth ?
            facebookData = (
                <div
                    style={{
                        width: "400px",
                        margin: "auto",
                        background: "#f4f4f4",
                        padding: "20px",
                        color: 'black',
                    }}>
                    <img src={this.state.picture} alt={this.state.name} />
                    <h2>Welcome {this.state.name}</h2>
                    {/* Email: {this.state.email} */}
                    {this.showFeed()}
                    {this.getAllPosts()}
                </div>
            ) :
            facebookData = (<FacebookLogin
                appId="956629761469528" // Konnect: 956629761469528, fbid: 106395927814864, other: 1258433741178117
                autoLoad={true}
                fields="name,picture"
                onClick={this.componentClicked}
            // callback={this.responseFacebook}
            />);

        return (
            <>
                {facebookData}

                {/* <script>
                    window.fbAsyncInit = function() {
                        FB.init({
                            appId: '956629761469528',
                            autoLogAppEvents: true,
                            xfbml: true,
                            version: 'v8.0'
                        })
                    }
                </script>
                <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script> */}
            </>
        );
    }
}
