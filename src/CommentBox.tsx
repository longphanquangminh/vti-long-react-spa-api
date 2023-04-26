import * as React from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';

type Props = {
    userEmail?: string
}

export default function TextareaDecorators(props: Props) {
  const [text, setText] = React.useState('');
  const addEmoji = (emoji: string) => () => setText(`${text}${emoji}`);
  return (
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
            <><Typography level="body3" sx={{ ml: 'auto' }}>
            {text.length} character{text.length > 1 ? `s` : ``}
          </Typography>
    <Button sx={{ ml: 'auto' }} onClick={() => {setText('')}}>Send</Button></>
    }
          sx={{ minWidth: 300 }}
        />
    </FormControl>
  );
}
