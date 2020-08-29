import React from 'react';
import logo from './Images/logo.png';
import wings from './Images/cancel_me_noew_wings.png';
import twitter from './Images/twitter.png';
import facebook from './Images/facebook.png';
import './App.css';
import './style.css';

import Button from '@material-ui/core/Button';
import SearchBar from "material-ui-search-bar";
import FacebookIcon from '@material-ui/icons/Facebook';
// import LinkedInIcon from '@material-ui/icons/LinkedIn';
// import RedditIcon from '@material-ui/icons/Reddit';
import TwitterIcon from '@material-ui/icons/Twitter';
import CardList from './CardList';


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import FullWidthTabs from "./nav.js";

// function doSomethingWith() {
//   alert("hi");
// }

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    // background: '#13202C',
    color:'#13202C',
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    marginBottom: "20px"
  },
});

const cards = [
  {text: "#cats"},
  {text: "#nemo"},
  {text: "#milk"},
  {text: "#gay"},
]

function App() {
  document.title = '#CancelMe!'
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" /> 

      <div className="sub middle">Cancelling the cancel culture</div>
      
        <div className="picksosmed">
        Pick your social media:
        </div>
        <div className="middle">
       
        {/* <Paper className={classes.root}> */}
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon label tabs example"
            
            className={classes.root}> 
          >
          
          <Tab icon={<FacebookIcon style={{ fontSize: 50 }}  />} label="Facebook" />
          <Tab icon={<TwitterIcon style={{ fontSize: 50 }} />} label="Twitter" />

            {/* <Tab icon={<img src={twitter} className="socialLogo" alt="logo" />} label="Twitter" /> */}
            {/* <Tab icon={<img src={facebook} className="socialLogo" alt="logo" />} label="Facebook" /> */}
          </Tabs>
        {/* </Paper> */}

        </div>


        <div className="middle">
        <SearchBar
        style={{
          height: "7vh",
          width: "40%",
          marginBottom:"3%",
          justifyContent: "spaceBetween",
        }}
        placeholder="Enter your keywords here..."        
        

          // value={this.state.value}
          // onChange={(newValue) => this.setState({ value: newValue })}
          // onRequestSearch={() => doSomethingWith(this.state.value)}
          ></SearchBar>
        <br/>
        </div>

        
        
        <div className="middle">

        <CardList cards={cards} />
        </div>
        <Button className="wingButton"
        onClick={() => { alert('clicked') }}
        >
        <img src={wings} className="wingButtonLogo" alt="logo" /> 
        <span class="tooltiptext">Click me to delete selected feeds</span>
        
        </Button>
    </div>
  );
}

export default App;
