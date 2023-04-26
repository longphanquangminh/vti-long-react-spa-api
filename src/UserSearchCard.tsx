import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

type Props = {
    userSearchId: number,
    userSearchAvatar: string,
    userSearchFirstName: string,
    userSearchLastName: string,
    userSearchEmail: string    
}

export default function RowCard(props: Props) {
  return (
    <Card
      orientation="horizontal"
      variant="outlined"
      className="w-full"
      sx={{ bgcolor: 'background.body' }}
    >
      <CardOverflow>
      {/* <BrowserView>
      <AspectRatio ratio="1" sx={{ width: 90 }}>
          <img
            src={props.userSearchAvatar ? props.userSearchAvatar : `https://lh3.googleusercontent.com/a/default-user`}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
</BrowserView> */}
        
      </CardOverflow>
      <CardContent sx={{ px: 2 }}>
        <Typography fontWeight="md" textColor="success.plainColor" mb={0.5}>
        <AspectRatio ratio="1" sx={{ width: 90 }}>
          <img
            src={props.userSearchAvatar ? props.userSearchAvatar : `https://lh3.googleusercontent.com/a/default-user`}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
          {props.userSearchFirstName + " " + props.userSearchLastName}
        </Typography>
        <Typography level="body2">{props.userSearchEmail}</Typography>
      </CardContent>
      <Divider />
      <CardOverflow
        variant="soft"
        color={props.userSearchId == 999 ? `warning` : `primary`}
        sx={{
          px: 0.2,
          writingMode: 'vertical-rl',
          textAlign: 'center',
          fontSize: 'xs2',
          fontWeight: 'xl2',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}
      >
        {props.userSearchId == 999 ? `Offline` : `Online`}
      </CardOverflow>
    </Card>
  );
}