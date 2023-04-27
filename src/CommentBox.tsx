import * as React from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';
import FormControl from '@mui/joy/FormControl';
import Popover from '@mui/material/Popover';

export default function TextareaDecorators() {
  const [text, setText] = React.useState('');
  const [commentFull, setCommentFull] = React.useState('');
  const addEmoji = (emoji: string) => () => setText(`${text}${emoji}`);
  
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setCommentFull(text);
      setText('');
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
        <FormControl>
        <Textarea placeholder="Your email..." sx={{ mb: 1 }} defaultValue={"phanquangminhlong@gmail.com" || ""} />
        <Textarea
          placeholder="Type your comment in here…"
          value={text}
          onChange={(event) => setText(event.target.value)}
          minRows={4}
          maxRows={4}
          startDecorator={
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
                👍
              </IconButton>
              <IconButton variant="outlined" color="neutral" onClick={addEmoji('🏖')}>
                🏖
              </IconButton>
              <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>
                😍
              </IconButton>
              <IconButton variant="outlined" color="neutral" onClick={addEmoji('🐆')}>
                🐆
              </IconButton>
              <IconButton variant="outlined" color="neutral" onClick={addEmoji('🐧')}>
                🐧
              </IconButton>
            </Box>
          }
          endDecorator={
            <>
              <Typography level="body3" sx={{ ml: 'auto' }}>
            {text.length} character{text.length > 1 ? `s` : ``}
          </Typography>
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
        <Typography sx={{ p: 2 }}>{commentFull ? "Your comment has been sent." : "Please write comment & email."}</Typography>
      </Popover></div>
            </>
          
        }
          
          ></Textarea>

    </FormControl>
    
    </>
  );
}
