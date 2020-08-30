import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import TwitterIcon from '@material-ui/icons/Twitter';
import VisibilityIcon from '@material-ui/icons/Visibility';

import logo from './Images/logo.png';
import kim from './Images/kim.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        textAlign: 'left',
        marginTop: "15px",
        marginBottom: "15px"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    image: {
        height: "40px",
        width: "40px"
    },
    noMedia: {
        height: 0,
        paddingTop: '0%'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));


export default function RecipeReviewCard(props) {
    var d = new Date(props.card["date"]);
    // d = d.toString();
    const classes = useStyles();

    const deletePost = (id) => {
        console.log(id);
        props.removeFromCardList(id);
    }

    // const deletePost = () => {
    //     // alert("Are you sure you want to delete this post? Once deleted you may not be able to restore it.");
    //     props.deleteFeed();
    // }

    const ImageCard = (image) => {
        if (props.card["image"] == null || props.card["image"] === undefined) {
            return (
                <></>
            )
        } else {
            return (
                <CardMedia
                    className={classes.media}
                    image={props.card["image"]}
                    title="Map"
                />
            )
        }
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <img src={props.card["profilepic"]} className={classes.image} alt="logo" />
                    </Avatar>
                }
                // action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }
                title={"@" + props.card["username"]}
                subheader={d.toString().substring(0, 24)}
            />
            {ImageCard(props.card["image"])}

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.card["text"]}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button size="small" color="primary" startIcon={<DeleteIcon />}
                    onClick={() => deletePost(props.card["id"])}>
                    Delete
            </Button>
                <Button size="small" color="primary" startIcon={<VisibilityIcon />}
                    onClick={() => console.log("hello????")}>
                    View Post
            </Button>
            </CardActions>
        </Card>

    );
}
