import React, { useState, useEffect } from 'react';
import logo from './Images/logo.png';
import wings from './Images/cancel_me_noew_wings.png';
import './App.css';
import './style.css';
import Card from "./Card";
import Modal from '@material-ui/core/Modal';
import cleanwings from './Images/wings.png';

import Button from '@material-ui/core/Button';
import SearchBar from "material-ui-search-bar";
import FacebookIcon from '@material-ui/icons/Facebook';

import TwitterIcon from '@material-ui/icons/Twitter';

import CircularProgress from '@material-ui/core/CircularProgress';


import FacebookLogin from 'react-facebook-login';
import Facebook from './fb'

//import {get7DayTweets} from './TwitterManager';


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import FacebookData from './facebookdata.json';
const facebookPostList = FacebookData.data;

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 500,
        // background: '#13202C',
        color: '#13202C',
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginBottom: "20px"
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

var tweets = {};

function App() {
    document.title = '#CancelMe!'
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [socialMediaOption, setSocialMediaOption] = React.useState(0);
    const [twitterCards, setTwitterCards] = useState({});
    const [facebookCards, setFacebookCards] = useState({});
    const [cancelled, setCancelled] = useState(false);
    const [cancelRotate, setCancelRotate] = useState(false);
    const [slide, setSlide] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mapping, setMapping] = useState({});
    const [cards, setCards] = useState({ 1: { image: "https://pbs.twimg.com/media/EgkWveqUwAIj0uc?format=jpg&name=360x360", username: "kimkar", text: "abc", date: "2007-02-20T14:35:54.000Z" }, 2: { image: null, username: "kimkar", text: "efg", date: "2009-02-20T14:35:54.000Z" } });
    const [searchVal, setSearchVal] = useState("");

    useEffect(() => {
        initCards("");
        facebookInitCards("");
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <img src={cleanwings} className="wingButtonLogo" alt="logo" />
            <h2 id="simple-modal-title">Congrats, you are now cancelled 👼🏻</h2>
            {/* <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p> */}
            {/* <SimpleModal /> */}
        </div>
    );

    const initCards = (keyword) => {
        setLoading(true);
        console.log("loading" + loading);
        console.log("fetching " + keyword)
        callAPI(keyword)
            .then((data) => {
                setTwitterCards({});
                return data;
            }
            )
            .then(data => {
                setMapping({});
                const fetchedData = data["data"];
                const newCard = {};
                let copy = twitterCards;
                let mapCopy = {}
                for (var tweet in fetchedData) {
                    let card = fetchedData[tweet];
                    console.log(card)
                    const tmp = {};
                    tmp["id"] = card["id"];
                    tmp["date"] = card["created_at"];
                    tmp["text"] = card["text"];
                    tmp["username"] = data["includes"]["users"][0]["username"];
                    tmp["profilepic"] = data["includes"]["users"][0]["profile_image_url"];
                    try {
                        let media_key = card["attachments"]["media_keys"][0];
                        for (let i in data["includes"]["media"]) {
                            if (data["includes"]["media"][i]["media_key"] === media_key) {
                                tmp["image"] = data["includes"]["media"][i]["url"];
                            }
                        }

                    } catch (e) {
                        tmp["image"] = null;
                    }
                    newCard["id"] = card["id"];
                    mapCopy[card["id"]] = true;
                    newCard["data"] = tmp;

                    copy[card["id"]] = tmp;
                }
                setMapping(mapCopy);
                setTwitterCards(copy);
                tweets = copy;
                console.log(tweets);
                console.log("not loading" + loading);
                console.log(JSON.stringify(twitterCards));
                setLoading(false);

            }
            )
        // newCard.map( card => {
        //   const tmp = {};
        //   tmp["id"] = card["id"];
        // })
    }

    const facebookInitCards = (keyword) => {
        setLoading(true);
        console.log("loading" + loading);
        console.log("fetching " + keyword);

        console.log("FAcebook data");
        console.log(facebookPostList);

        setFacebookCards({});
        const newCard = {};
        for (let i = 0; i < facebookPostList.length; i++) {
            console.log(facebookPostList[i]);
            let card = facebookPostList[i];
            // console.log(card)
            const tmp = {};
            tmp["date"] = card["created_at"];
            // console.log("facebook date", tmp);
            tmp["text"] = card["text"];
            tmp["username"] = card["author_name"];
            tmp["profilepic"] = "https://scontent-mia3-1.cdninstagram.com/v/t51.2885-19/s320x320/109136688_610125179899980_1868015297406610141_n.jpg?_nc_ht=scontent-mia3-1.cdninstagram.com&_nc_ohc=s-a2L5jlbl8AX_IqEaO&oh=f49e39c741fa2880cd09f8d4cca3b850&oe=5F73FFDA";
            // try {
            //     let media_key = card["attachments"]["media_keys"][0];
            //     for (let i in data["includes"]["media"]) {
            //         if (data["includes"]["media"][i]["media_key"] === media_key) {
            //             tmp["image"] = data["includes"]["media"][i]["url"];
            //         }
            //     }

            // } catch (e) {
            //     tmp["image"] = null;
            // }
            newCard["id"] = card["id"];
            newCard["data"] = tmp;

            facebookCards[card["id"]] = tmp;
        }
        setFacebookCards(facebookCards);
        console.log("not loading" + loading);
        console.log(JSON.stringify(facebookCards));
        setLoading(false);
        // newCard.map(card => {
        //     const tmp = {};
        //     tmp["id"] = card["id"];
        // })
    }

    const callAPI = async (keyword = "pizza") => {
        const response = await fetch("http://localhost:9000/testAPI?keyword=" + keyword)
        return response.json();

    }


    const handleChange = (event, newValue) => {
        console.log(newValue);
        setSocialMediaOption(newValue);

    };

    const updateTweetFetch = (value) => {
        initCards(value);
    }

    const updateFacebookFetch = (value) => {
        facebookInitCards(value);
    }


    const RotateButton = () => {
        if (cancelRotate === true) {
            // setCancelRotate(false);
            return (
                <Button
                    // className={"wingButton "}
                    className={"wingButton rotate"}
                    id="buttonWings"
                    onClick={() => {
                        setTwitterCards({});
                        setCancelRotate(false);
                        setSlide(true);
                    }}
                >
                    <img src={wings} className="wingButtonLogo" alt="logo" />
                    <span class="tooltiptext">Click me to delete selected feeds</span>

                </Button>
            )
        } else {
            return (
                <Button className="wingButton"
                    onClick={() => {
                        setTwitterCards({});
                        setCancelRotate(true);
                        handleOpen();
                    }}
                >
                    <img src={wings} className="wingButtonLogo" alt="logo" />
                    <span className="tooltiptext">Click me to delete selected feeds</span>

                </Button>
            )
        }
    }

    const removeFromCardList = (id) => {
        console.log(id);
        let copy = twitterCards;
        delete copy[id];
        console.log(copy);
        tweets = copy;
        setTwitterCards(copy);
        let mapCopy = mapping;
        mapCopy[id] = false;
        setMapping(mapCopy);
        setSearchVal(searchVal + " ");
    }

    const RenderCards = () => {
        console.log(JSON.stringify(tweets));
        if (socialMediaOption === 0) {
            return (<div><Facebook />{loading ? <CircularProgress /> : Object.keys(facebookCards).map(c => <Card
                inline
                key={c}
                card={facebookCards[c]}
                props={facebookCards}
                removeFromCardList={() => {
                    //hi
                }}
            />)}</div>);

        } else if (socialMediaOption === 1) {
            return (
                <div>
                    <RotateButton />
                    { /*
                Object.keys(cards).map(c => {
                console.log("hi");
                console.log(cards[c]);
                return (<Card
                    inline
                    key={c}
                    allCards={cards}
                    deleteFeed={() => {
                        console.log("delete from App");
                        delete cards[c];
                        console.log(cards);
                    }}
                    card={cards[c]}
                />) 
                }
            ) */}

                    {loading ? <CircularProgress /> : Object.keys(twitterCards).map(c => <Card
                        inline
                        key={c}
                        id={c}
                        card={twitterCards[c]}
                        props={twitterCards}
                        removeFromCardList={removeFromCardList}
                    />)}


                </div>
            );
        }

        const RenderCards = () => {
            console.log(JSON.stringify(facebookCards));
            if (socialMediaOption === 0) {
                return (<div><Facebook />
                    {loading ? <CircularProgress /> : Object.keys(facebookCards).map(c => <Card
                        inline
                        key={c}
                        card={facebookCards[c]}
                        props={facebookCards}
                        removeFromCardList={() => {
                            //hi
                        }}
                    />)}</div>);

            } else if (socialMediaOption === 1) {
                return (
                    <div>
                        <RotateButton />
                        { /*
          Object.keys(cards).map(c => {
            console.log("hi");
            console.log(cards[c]);
            return (<Card
              inline
              key={c}
              allCards={cards}
              deleteFeed={() => {
                  console.log("delete from App");
                  delete cards[c];
                  console.log(cards);
              }}
              card={cards[c]}
            />) 
          }
        ) */}

                        {loading ? <CircularProgress /> : Object.keys(twitterCards).map(c => <Card
                            inline
                            key={c}
                            card={twitterCards[c]}
                            props={twitterCards}
                            removeFromCardList={() => {
                                //hi
                            }}
                        />)}


                    </div>
                );
            }

            // const RenderCards = () => {
            //     if (socialMediaOption === 0) {
            //         return (<div></div>);

            //     } else if (socialMediaOption === 1) {
            //         return (
            //             <div>
            //                 <RotateButton />
            //                 {/* {cards.map(c => <Card/>)} */}
            //                 {cards.map(c => <Card
            //                     text={c.text}
            //                     removeFromCardList={() => {
            //                         //hi
            //                     }}
            //                 />)}


            //             </div>
            //         );
            //     }
            //     return (
            //         <div></div>
            //     );
            // }

            return (
                <div></div>
            );
        }
        console.log("loading..? " + loading);
        return (
            <div></div>
        );
    }
    console.log("loading..? " + loading);
    return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo" />

            <div className="sub middle">Cancelling the Cancel Culture</div>

            {/* <div className="picksosmed">
        Pick your social media:
      </div> */}
            <div className="middle">

                {/* <Paper className={classes.root}> */}
                <Tabs
                    value={socialMediaOption}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="icon label tabs example"
                    className={classes.root}
                >

                    <Tab icon={<FacebookIcon style={{ fontSize: 50 }} />} label="Facebook" />
                    <Tab icon={<TwitterIcon style={{ fontSize: 50 }} />} label="Twitter" />
                </Tabs>
                {/* </Paper> */}

            </div>
            {console.log("dsa")}

            <div className="middle">
                <SearchBar
                    style={{
                        height: "7vh",
                        width: "40%",
                        marginBottom: "3%",
                        justifyContent: "spaceBetween",
                    }}
                    placeholder="Type your posts here to start cancelling..."

                    // value={this.state.value}
                    onChange={(newVal) => setSearchVal(newVal)}
                    // onChange={(newValue) => this.setState({ value: newValue })}
                    onRequestSearch={() => updateTweetFetch(searchVal)}
                ></SearchBar>
                <br />
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>


            {/* <div className="middle">
                {RenderCards()}
            </div> */}


            {/* <div className="middle">
                <SearchBar
                    style={{
                        height: "7vh",
                        width: "40%",
                        marginBottom: "3%",
                        justifyContent: "spaceBetween",
                    }}
                    placeholder="Type your posts here to start cancelling..."

                    // value={this.state.value}
                    onChange={(newVal) => setSearchVal(newVal)}
                    // onChange={(newValue) => this.setState({ value: newValue })}
                    onRequestSearch={() => updateTweetFetch(searchVal)}
                ></SearchBar>
                <br />
            </div> */}
            <div className="middle">
                {RenderCards()}
            </div>







        </div >
    );
}

export default App;
