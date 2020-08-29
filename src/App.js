import React from 'react';
// import logo from './logo.svg';
import './App.css';
import './style.css';

import Button from '@material-ui/core/Button';
import SearchBar from "material-ui-search-bar";
// import FacebookIcon from '@material-ui/icons/Facebook';
// import LinkedInIcon from '@material-ui/icons/LinkedIn';
// import RedditIcon from '@material-ui/icons/Reddit';
import TwitterIcon from '@material-ui/icons/Twitter';
import CardList from './CardList';

// function doSomethingWith() {
//   alert("hi");
// }

const cards = [
  {text: "#cats"},
  {text: "#nemo"},
  {text: "#milk"},
  {text: "#gay"},
]

function App() {
  document.title = '#CancelMe!'
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1>#CancelMe</h1>
      
        <SearchBar class='search'
          // value={this.state.value}
          // onChange={(newValue) => this.setState({ value: newValue })}
          // onRequestSearch={() => doSomethingWith(this.state.value)}
          />
        <br/>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => { alert('clicked') }}>
            #CancelMe! <span role="img" aria-label="angel"> 👼🏼</span>
        </Button>
        <br/>
        <TwitterIcon fontSize="large"/>
        {/* <FacebookIcon/><RedditIcon/><LinkedInIcon/> */}
        <br/>
        {/* <Card/><br/>
        <Card/><br/>
        <Card/><br/>
        <Card/><br/>
        <Card/><br/>
        <Card/><br/>
        <Card/><br/> */}
        <CardList cards={cards} />

        {/* 
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
