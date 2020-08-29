import React from 'react';
// import logo from './logo.svg';
import './App.css';

import Button from '@material-ui/core/Button';
import SearchBar from "@material-ui-search-bar";
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import RedditIcon from '@material-ui/icons/Reddit';

// function doSomethingWith() {
//   alert("hi");
// }

function App() {
    document.title = '#CancelMe!'
    return (
        <div className="App">
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <h1>#CancelMe</h1>

                <SearchBar
                // value={this.state.value}
                // onChange={(newValue) => this.setState({ value: newValue })}
                // onRequestSearch={() => doSomethingWith(this.state.value)}
                />
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => { alert('clicked') }}>
                    #CancelMe! <span role="img" aria-label="angel"> 👼🏼</span>
                </Button>
                <br />
                <TwitterIcon /><FacebookIcon /><RedditIcon /><LinkedInIcon />
                {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
            </header>
        </div>
    );
}

export default App;

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

