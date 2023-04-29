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
import Typography2 from '@mui/joy/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BadgeAvatars from './UserAvatar';
import TextareaDecorators from './CommentBox';
import Loading from './Loading';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Box from '@mui/joy/Box';
import IconButton2 from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';
import FormControl from '@mui/joy/FormControl';
import Popover from '@mui/material/Popover';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
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
    userId: number,
    postId: number,
    postTitle: string,
    postBody: string
}

export default function RecipeReviewCard(props: Props) {
    const [postComments, setPostComments] = useState<any>()
    const [loadComments, setLoadComments] = useState<any>(0)
    const loadLeft = 2
    const [postPhoto, setPostPhoto] = useState<any>()
    const [postUserData, setPostUserData] = useState<any>()
    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/posts/${props.postId}/comments`)
            .then((res) => {
                setPostComments(res.data)
                setLoadComments(res.data.length)
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
  useEffect(() => {
    axios
        .get(`https://reqres.in/api/users/${props.userId}`)
        .then((res) => {
          setPostUserData(res.data.data)
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
  const [heart, setHeart] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [emailSend, setEmailSend] = React.useState('phanquangminhlong@gmail.com');
  const [emailTemp, setEmailTemp] = React.useState('');
  const [text, setText] = React.useState<any>('');
  const [commentTemp, setCommentTemp] = React.useState('');
  const addEmoji = (emoji: string) => () => setText(`${text}${emoji}`);
  
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setEmailTemp(emailSend);
      setCommentTemp(text);
    //   if(emailSend && text) {
    //     setPostComments([...postComments, {postId: props.postId, id: postComments.length + 1, name: "1", email: emailSend, body: text}])
    //     setEmailSend('phanquangminhlong@gmail.com');
    //     setText('');
    // }
    if(text.trim()) {
      const demotext = text.trim().replace(/[^\S\r\n]+/g, ' ').replace(/\n{2,}/g, '\n\n').split('\n').map((line: string) => line.trim()).join('\n');
      setPostComments([...postComments, {postId: props.postId, id: postComments.length + 1, name: "1", email: "Long Phan", body: demotext}])
      setEmailSend('phanquangminhlong@gmail.com');
      setText('');
  }
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // prevent default behavior of Enter key
      setText(text + "\n");
      // .trim().replace(/(?<!\n)\s+/g, " ")
    }
  };
  if (!postComments || !postPhoto || !postUserData || loadComments == 0) return <div className='m-5'>
    <RemoveScrollBar />
    <Skeleton height={220} />
    <Skeleton height={110} />
    <Skeleton height={110} />
    </div>
  return (
    <div className="flex justify-center mb-10">
        <Card sx={{width: 1145}}>
      <CardHeader
        avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={props.userAvatar} />
        <Link to={`/users/${props.userId}`}><BadgeAvatars srcAvatar={postUserData.avatar} altAvatar={postUserData.first_name} /></Link>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<><Link className='hover:underline' to ={`/users/${props.userId}`}>{postUserData.first_name + " " + postUserData.last_name}</Link></>}
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
          {"Title: " + props.postTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <p>Content:</p>
          <pre>{props.postBody}</pre>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div onClick={() => setHeart(!heart)}>
          <IconButton color={!heart ? `default` : `error`} aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </div>
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
          {loadComments > (loadLeft + 1) && <button className='mb-5 cursor-pointer text-gray-500 hover:underline' onClick={() => {setLoadComments(loadComments - loadLeft);}}>Load {loadLeft} more comments</button>}
          {(loadComments <= (loadLeft + 1) && loadComments > loadLeft) && <button className='mb-5 cursor-pointer text-gray-500 hover:underline' onClick={() => {setLoadComments(loadComments - 1);}}>Load 1 more comment</button>}
        {postComments && postComments.slice(loadComments - loadLeft, postComments.length).map((comment: any) => (
              <Typography paragraph>
              <p className='font-bold text-cyan-500'>{`${comment.email.includes("@") ? `${comment.email.substring(0, comment.email.indexOf("@")).replace(/[._]/g, " ").split(" ").length > 1 ? comment.email.substring(0, comment.email.indexOf("@")).replace(/[._]/g, " ") : comment.email.substring(0, comment.email.indexOf("@")).replace(/[._]/g, " ") + " Cena"}` : comment.email}` + " commented: "}</p>
              <pre>{comment.body}</pre>
            </Typography>
            ))}
        </CardContent>
      </Collapse>
      <FormControl>
        {/* <Input type="email" onChange={(event) => {setEmailSend(event.target.value)}} placeholder="Your email..." sx={{ mb: 1 }} defaultValue={emailSend} value={emailSend} /> */}
        <Textarea
          placeholder="Type your comment in here…"
          value={text}
          onChange={(event) => {setText(event.target.value)}}
          // onKeyDown={handleKeyDown}
          minRows={4}
          maxRows={4}
          startDecorator={
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton2 variant="outlined" color="neutral" onClick={addEmoji('👍')}>
                👍
              </IconButton2>
              <IconButton2 variant="outlined" color="neutral" onClick={addEmoji('😍')}>
                😍
              </IconButton2>
              <IconButton2 variant="outlined" color="neutral" onClick={addEmoji('🐆')}>
                🐆
              </IconButton2>
              <IconButton2 variant="outlined" color="neutral" onClick={addEmoji('🐧')}>
                🐧
              </IconButton2>
            </Box>
          }
          endDecorator={
            <>
              <Typography2 level="body3" sx={{ ml: 'auto' }}>
            {text.length} character{text.length > 1 ? `s` : ``}
          </Typography2>
          <div className="ml-auto">
            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
              Send
            </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {/* <Typography2 sx={{ p: 2 }}>{emailTemp && commentTemp ? "Your comment has been sent." : "Please write comment & email."}</Typography2> */}
        <Typography2 sx={{ p: 2 }}>{commentTemp.trim() ? "Your comment has been sent." : "Please write comment."}</Typography2>
      </Popover></div>
            </>
          
        }
          
          ></Textarea>

    </FormControl>
    </Card>
    </div>
  );
}
