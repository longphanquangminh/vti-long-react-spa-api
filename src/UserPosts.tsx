import BackPageButton from "./BackPageButton";
import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'
import Loading from "./Loading";
import RecipeReviewCard from "./Post";

function UserPosts() {
    const { id } = useParams<{ id: string }>(); // get the 'id' parameter from the route
    const [userPost, setUserPost] = useState<any>()
    const [userInfo, setUserInfo] = useState<any>()
    const [postComments, setPostComments] = useState<any>()
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
    useEffect(() => {
        axios
            .get(`https://reqres.in/api/users/${id}`)
            .then((res) => {
                setUserInfo(res.data.data)
            })
            .catch((err) => {
                console.warn(err)
            })
    }, [id])
    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then((res) => {
                setPostComments(res.data)
            })
            .catch((err) => {
                console.warn(err)
            })
    }, [id])

    if (!userPost) return <Loading />

    return (
        <>
            {/* <h1>User Posts:</h1> */}
            <div className="fixed top-20 left-5 z-50">
            <BackPageButton id={id} />
        </div>
            <div className="my-10">
                {userPost.length > 0 ? userPost.map((post: any, index: any) => {
                    return (
                        <>
                            {/* <p key={post.id} id={post.id}>{index + 1}. {post.title}</p> */}
                            <RecipeReviewCard
                                userId={userInfo.id}
                                userFirstName={userInfo.first_name}
                                userLastName={userInfo.last_name}
                                userAvatar={userInfo.avatar}
                                userEmail={userInfo.email}
                                postId={post.id}
                                postOrder={Math.abs(index - userPost.length)}
                                postTitle={post.title}
                                postBody={post.body}
                            />
                        </>
                    )
                }) : (<p>No posts found!</p>)}
            </div>
            {/* <Link to={id == String(999) ? `/my-profile` : `/users/${id}`}>{`Back to ${id == String(999) ? "my profile" : "user page"}`}</Link> */}
        </>
    )
}

export default UserPosts
