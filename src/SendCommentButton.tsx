import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export type OnDataCallback = (data: string) => void;

interface Props {
    className?: string,
    commentContent?: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onData: OnDataCallback;
}

export default function BasicPopover(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    props.onClick(event);
    props.onData('');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={props.className ? props.className : ""}>
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
        <Typography sx={{ p: 2 }}>{props.commentContent ? "Your comment has been sent." : "Please write comment & email."}</Typography>
      </Popover>
    </div>
  );
}