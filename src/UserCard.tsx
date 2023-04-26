import { Link } from "react-router-dom"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function UserCard(props: any) {

  return (
    <>
      <Link to={props.id == 999 ? `/my-profile` : `/users/${props.id}`} key={props.id} className="m-5 text-center">
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              className="h-96"
              image={props.avatar}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.first_name + " " + props.last_name}
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
