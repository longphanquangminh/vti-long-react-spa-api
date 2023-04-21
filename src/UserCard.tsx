import { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function UserCard(props: any) {

  return (
    <>
      <Link to={`/users/${props.id}/todos`} key={props.id} className="m-5 text-center">
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {props.email}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </>
  )
}

export default UserCard
