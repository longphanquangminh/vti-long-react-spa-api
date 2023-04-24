import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'

function UserTasks() {
    const { id } = useParams<{ id: string }>(); // get the 'id' parameter from the route
    const [userTask, setUserTask] = useState<any>()
    const [render, setRender] = useState(false)
    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
            .then((res) => {
                setUserTask(res.data)
            })
            .catch((err) => {
                console.warn(err)
            })
    }, [id])

    const markDone = (taskId: any) => {
        axios
            .patch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
                completed: true
            })
            .then((response) => {
                userTask.find((item: any) => item.id == taskId).completed = response.data.completed
                setRender(!render)
            });
    }
    if (!userTask) return <div>Loading...</div>

    return (
        <>
            <h1>User Detailed Tasks:</h1>
            <br />
            <h2>Undone Tasks:</h2>
            {userTask.filter((item: any) => item.completed == false).map((task: any, index: any) => {
                return (
                    <div key={task.id} id={task.id} className="mb-5">
                        <p>{index + 1}. {task.title}</p>
                        {!task.completed && <button onClick={() => markDone(task.id)}>Mark done</button>}
                    </div>
                )
            })}
            <br />
            <h2>Done Tasks:</h2>
            {userTask.filter((item: any) => item.completed == true).map((task: any, index: any) => {
                return <p key={task.id} id={task.id}>{index + 1}. {task.title}</p>
            })}
            <br />
            <p>Done {[].concat(...userTask).filter((item: any) => item.completed == true).length} / {[].concat(...userTask).length} tasks</p>
            <br />
            <Link to={`/`}>Back to Homepage</Link>
        </>
    )
}

export default UserTasks
