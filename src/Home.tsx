import { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import UserCard from "./UserCard";

function Home() {
  const [userData, setUserData] = useState<any>()

  axios
  .get("https://reqres.in/api/users?page=1")
  .then((res) => {
    setUserData(res.data.data)
  })
  .catch((err) => {
    console.warn(err)
  })

    return (
      <>
        <h1 className="text-center font-bold">Hello!</h1>
         <div className="grid grid-cols-1 overflow-y-auto md:grid-cols-2 lg:grid-cols-4 gap-4">
          {userData && userData.map((user: any) => (
            <UserCard key={user.id} id={user.id} first_name={user.first_name} last_name={user.last_name} avatar={user.avatar} email={user.email} />
          ))}
          {!userData && (
            <div className="error-load">
              <p>Please wait or Try again!</p>
            </div>
          )}
         </div>
      </>
    )
  }

export default Home
  