import { useState } from "react"
import { useParams } from 'react-router-dom';
import axios from 'axios'

function UserDetail() {
    const [userData, setUserData] = useState<any>()
    axios
    .get("https://reqres.in/api/users?page=1")
    .then((res) => {
        console.log(res.data.data)
      setUserData(res.data.data)
    })
    .catch((err) => {
      console.warn(err)
    })
    const { userId } = useParams();
    if(!userData) return <div>ERROR!</div>
    const thisUser = userData.find(
        (prod: any) => prod.id === userId,
    );

    return (
        <>
            {thisUser.id}
        </>
    )
}

export default UserDetail
