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
import Image from './Images/map.png';
import DeleteIcon from '@material-ui/icons/Delete';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    textAlign: 'left',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
  const classes = useStyles();
  
  const deletePost = () => {
    alert("Are you sure you want to delete this post? Once deleted you may not be able to restore it.");
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            K
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title="@your_account"
        subheader="September 14, 2010"
      />
      <CardMedia
        className={classes.media}
        image={Image}
        title="Map"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        This is very offensive content! I love racism, sexism, homophobia and illegal stuff like murdering haha it is very funny I think. {props.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small" color="primary" startIcon={<DeleteIcon />}
          onClick={deletePost}>
          Delete
        </Button>
        <Button size="small" color="primary" startIcon={<TwitterIcon />}
          onClick={() => console.log("hello????")}>
          View Tweet
        </Button>
      </CardActions>
    </Card>
    
  );
}
