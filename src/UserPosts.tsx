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
    const b = !userPost || !userInfo
    if (id == "999" ? !userPost : b) return <Loading />

    return (
        <>
        <div className="absolute top-20 left-5 z-30">
            <BackPageButton id={id} />
        </div>
            <div className="my-10">
                {userPost.length > 0 ? userPost.slice(0, 5).map((post: any, index: any) => {
                    return (
                        <>
                            <RecipeReviewCard
                                userId={post.userId}
                                postId={post.id}
                                postTitle={post.title}
                                postBody={post.body}
                            />
                        </>
                    )
                }) : (<p>No posts found!</p>)}
            </div>
        </>
    )
}

export default UserPosts
