import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'
import Loading from "./Loading";

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

    if (!userPost) return <Loading />

    return (
        <>
            <h1>User Posts:</h1>
            <div className="my-5">
                {userPost.length > 0 ? userPost.map((post: any, index: any) => {
                    return <p key={post.id} id={post.id}>{index + 1}. {post.title}</p>
                }) : (<p>No posts found!</p>)}
            </div>
            <Link to={id == String(999) ? `/my-profile` : `/users/${id}`}>{`Back to ${id == String(999) ? "my profile" : "user page"}`}</Link>
        </>
    )
}

export default UserPosts
