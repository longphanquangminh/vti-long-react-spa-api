import { useState, useEffect } from "react"
import axios from 'axios'
import UserCard from "./UserCard";

function Home() {
  const [userData, setUserData] = useState<any>()

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUserData(res.data)
      })
      .catch((err) => {
        console.warn(err)
      })
  }, [])
  return (
    <>
      <h1 className="text-center font-bold">Hello!</h1>
      <div className="grid grid-cols-1 overflow-y-auto md:grid-cols-2 lg:grid-cols-4">
        {userData && userData.map((user: any) => (
          <UserCard key={user.id} id={user.id} name={user.name} email={user.email} />
        ))}
        {!userData && (
          <div className="load">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Home
