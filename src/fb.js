import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import FB from 'fb';

export default class Facebook extends Component {

    state = {
        isLoggedIn: false,
        auth: false,
        name: '',
        email: '',
        picture: '',
    };

    responseFacebook = response => {
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
        this.checkLoginState();
    }

    checkLoginState() {
        FB.getLoginStatus(function (response) {
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

    buildProfile(user) {
        let profile = `
          <h3>${user.name}</h3>
          <ul class="list-group">
            <li class="list-group-item">User ID: ${user.id}</li>
            <li class="list-group-item">Email: ${user.email}</li>
            <li class="list-group-item">Birthday: ${user.birthday}</li>
            <li class="list-group-item">User ID: ${user.location.name}</li>
          </ul>
        `;

        document.getElementById('profile').innerHTML = profile;
    }

    buildFeed(feed) {
        let output = '<h3>Latest Posts</h3>';
        for (let i in feed.data) {
            if (feed.data[i].message) {
                output += `
              <div class="well">
                ${feed.data[i].message} <span>${feed.data[i].created_time}</span>
              </div>
            `;
            }
        }

        document.getElementById('feed').innerHTML = output;
    }

    content() {

        console.log("CONTENT IS HEREEEEEE");
        // console.log(FB.api(
        //     '/108579077594343/feed',
        //     'GET',
        //     {},
        //     function (response) {
        //         // Insert your code here
        //         console.log(response);
        //         let output = '<h3>Latest Posts</h3>';
        //         for (let i in response.data) {
        //             if (response.data[i].message) {
        //                 output += `<div class="well">${response.data[i].message} <span> ${response.data[i].created_time}</span></div>`;
        //             }
        //         }

        //         document.getElementById('feed').innerHTML = output;
        //         // document.getElementById('feed').innerHTML = output;
        //     }
        // ));
        // FB.api('/108579077594343', function (response) {
        //     console.log(response);
        // });

        window.FB.api(
            '/108579077594343/feed',
            'GET',
            {},
            function (response) {
                // Insert your code here
                console.log(response);
                let output = '<h3>Latest Posts</h3>';
                for (let i in response.data) {
                    if (response.data[i].message) {
                        output += `<div class="well">${response.data[i].message} <span>${response.data[i].created_time}</span></div>`;
                    }
                }

                document.getElementById('feed').innerHTML = output;
                // document.getElementById('feed').innerHTML = output;
            }
        );
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
                    Email: {this.state.email}
                    {this.content()}
                </div>
            ) :
            facebookData = (<FacebookLogin
                appId="956629761469528" // Konnect: 956629761469528, fbid: 106395927814864
                autoLoad={true}
                fields="name,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />);

        return (
            <>
                {facebookData}
                <div class="container">
                    <h3 id="heading">Log in to view your profile</h3>
                    <div id="profile">Profile</div>
                    <div id="feed">Feed</div>
                </div>

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