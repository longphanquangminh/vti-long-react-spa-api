import BackPageButton from "./BackPageButton";
import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'
import Loading from "./Loading";
import RecipeReviewCard from "./Post";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function NewsFeed() {
    const [userPost, setUserPost] = useState<any>()
    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/posts`)
            .then((res) => {
                setUserPost(res.data)
            })
            .catch((err) => {
                console.warn(err)
            })
    }, [])
    if (!userPost) return <Loading />

    return (
        <>
        {/* <div className="absolute top-20 left-5 z-30">
            <BackPageButton id={id} />
        </div> */}
            <div className="">
                {userPost.length > 0 ? userPost.slice(15, 25).map((post: any, index: any) => {
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

export default NewsFeed
