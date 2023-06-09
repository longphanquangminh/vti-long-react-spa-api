import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'
import Loading from "./Loading";
import SignUp from "./UserInfo";

function UserDetail() {
    const { id } = useParams<{ id: string }>(); // get the 'id' parameter from the route
    const [userData, setUserData] = useState<any>()

    useEffect(() => {
        axios
            .get(`https://reqres.in/api/users/${id}`)
            .then((res) => {
                setUserData(res.data.data)
            })
            .catch((err) => {
                console.warn(err)
            })
    }, [id])

    if (!userData) return <Loading />

    return (
        <>
            {/* <h1>User Details:</h1>
            <p>Name: {userData.first_name} {userData.last_name}</p>
            <p>Email: {userData.email}</p>
            <img src={userData.avatar} alt={userData.first_name} />
            <div className="ml-5">
                <div className="mt-5"><Link to={`/users/${id}/posts`}>See user posts</Link></div>
                <div className="mt-5"><Link to={`/users/${id}/todos`}>See user tasks</Link></div>
            </div> */}
            <SignUp id={userData.id} avatar={userData.avatar} first_name={userData.first_name} last_name={userData.last_name} email={userData.email} />
        </>
    )
}

export default UserDetail
