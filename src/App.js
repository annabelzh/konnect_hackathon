import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Button from '@material-ui/core/Button';
import SearchBar from "material-ui-search-bar";
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import RedditIcon from '@material-ui/icons/Reddit';
// import Facebook from 'connect.facebook.net/en_US/sdk.js';
import FacebookLogin from 'react-facebook-login';

// function doSomethingWith() {
//   alert("hi");
// }

// function App() {
//     document.title = '#CancelMe!'

//     return (
//         <div className="App">
//             <header className="App-header">
//                 {/* <img src={logo} className="App-logo" alt="logo" /> */}
//                 <h1>#CancelMe</h1>

//                 <SearchBar
//                 // value={this.state.value}
//                 // onChange={(newValue) => this.setState({ value: newValue })}
//                 // onRequestSearch={() => doSomethingWith(this.state.value)}
//                 />
//                 <br />
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => { alert('clicked') }}>
//                     #CancelMe! <span role="img" aria-label="angel"> 👼🏼</span>
//                 </Button>
//                 <br />
//                 <TwitterIcon /><FacebookIcon /><RedditIcon /><LinkedInIcon />
//                 {/* <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a> */}
//             </header>
//         </div>

//     );

// }

// export default App;

// function init() {
//     FB.api(
//         '/l214.animaux',
//         { "fields": "fan_count" },
//         function (response) {
//             alert(response.fan_count);
//         }
//     );
// }

// window.fbAsyncInit = function () {
//     FB.init({
//         appId: '289539768860109',
//         xfbml: true,
//         version: 'v2.5'
//     });

//     init();
// };

// (function (d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) { return; }
//     js = d.createElement(s); js.id = id;
//     js.src = "//connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));

export default class Facebook extends Component {

    state = {
        auth: false,
        name: '',
        picture: '',
    };

    responseFacebook = response => {
        console.log(response);
        if (response.status !== 'unknown')
            this.setState({
                auth: true,
                name: response.name,
                picture: response.picture.data.url,
            });
    }

    componentClicked = () => {
        console.log('Facebook btn clicked');
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
            this.testAPI();
        } else {
            console.log('Not authenticated');
            this.setElements(false);
        }
    }

    testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function (response) {
            console.log('Successful login for: ' + response.name);
            document.getElementById('status').innerHTML =
                'Thanks for logging in, ' + response.name + '!';
        });


        // FB.api('/me?fields=name,email,birthday,location', function (response) {
        //     if (response && !response.error) {
        //         //console.log(response);
        //         this.buildProfile(response);
        //     }

        //     FB.api('/me/feed', function (response) {
        //         if (response && !response.error) {
        //             this.buildFeed(response);
        //         }
        //     });
        // })
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

    render() {
        let facebookData;

        this.state.auth ?
            facebookData = (
                <div>
                    WOWWOWOWOWOW AMAZE YOU LOGGED IN GGGGGG
                </div>
            ) :
            facebookData = (<FacebookLogin
                appId="956629761469528" // Konnect
                autoLoad={true}
                fields="name,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />);

        return (
            <>
                {facebookData}
                <div class="container">
                    <h3 id="heading">Log in to view your profile</h3>
                    <div id="profile"></div>
                    <div id="feed"></div>
                </div>
            </>
        );
    }
}