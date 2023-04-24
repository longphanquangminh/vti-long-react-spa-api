import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'

function UserPosts() {
    const { id } = useParams<{ id: string }>(); // get the 'id' parameter from the route
    const [userPost, setUserPost] = useState<any>()
    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
            .then((res) => {
                setUserPost(res.data)
            })
            .catch((err) => {
                console.warn(err)
            })
    }, [id])

    if (!userPost) return <div>Loading...</div>

    return (
        <>
            <h1>User Posts:</h1>
            <div className="my-5">
                {userPost.map((post: any, index: any) => {
                    return <p key={post.id} id={post.id}>{index + 1}. {post.title}</p>
                })}
            </div>
            <Link to={`/users/${id}`}>Back to User Details</Link>
        </>
    )
}

export default UserPosts
