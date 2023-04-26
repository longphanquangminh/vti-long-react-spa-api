import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BadgeAvatars from './UserAvatar';
import TextareaDecorators from './CommentBox';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

type Props = {
    userFirstName: string,
    userLastName: string,
    userEmail: string,
    userAvatar: string,
    postId: number,
    postOrder: number,
    postTitle: string,
    postBody: string
}

export default function RecipeReviewCard(props: Props) {
    const [postComments, setPostComments] = useState<any>()
    const [postPhoto, setPostPhoto] = useState<any>()
    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/posts/${props.postId}/comments`)
            .then((res) => {
                setPostComments(res.data)
            })
            .catch((err) => {
                console.warn(err)
            })
    }, [props.postId])
    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/photos/${props.postId}`)
            .then((res) => {
                setPostPhoto(res.data)
            })
            .catch((err) => {
                console.warn(err)
            })
    }, [props.postId])
    const today = new Date().toLocaleDateString('vi-VN');
    const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1; // Add 1 because getMonth() returns 0-based index
  const year = date.getFullYear();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="m-5 flex justify-center">
        <Card sx={{width: 1145}}>
      <CardHeader
        avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={props.userAvatar} />
        <BadgeAvatars srcAvatar={props.userAvatar} altAvatar={props.userFirstName} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${props.userFirstName + " "} ${props.userLastName}`}
        subheader={`${date}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={postPhoto ? `${postPhoto.url}` : `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227724992-stock-illustration-image-available-icon-flat-vector.jpg`}
        alt="Paella dish"
      />
      <CardContent>
         <Typography variant="h5" component="div">
          {"Title post " + props.postOrder + ": " + props.postTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {"Content: " + props.postBody}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        {postComments && postComments.map((comment: any) => (
              <Typography paragraph>
              <p className='font-bold text-cyan-500'>{comment.email + " commented: "}</p>
              <p>{comment.body}</p>
            </Typography>
            ))}
        </CardContent>
      </Collapse>
      <TextareaDecorators userEmail={props.userEmail} />
    </Card>
    </div>
  );
}
