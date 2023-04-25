import { useState, useEffect } from "react"
import axios from 'axios'
import UserCard from "./UserCard";
import MyButton from "./MyButton";
import Loading from "./Loading";

function Home() {
  const [userData, setUserData] = useState<any>()
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users?page=${numberOfPages}`)
      .then((res) => {
        setUserData(res.data.data)
        setTotalPages(res.data.total_pages)
      })
      .catch((err) => {
        console.warn(err)
      })
  }, [numberOfPages])

  return (
    <>
      {!userData && (
        <Loading />
      )}
      <>
        {userData && (
          <div className="grid grid-cols-1 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
            {userData.map((user: any) => (
              <UserCard key={user.id} id={user.id} first_name={user.first_name} last_name={user.last_name} avatar={user.avatar} email={user.email} />
            ))}

          </div>
        )}
        <div className={`flex justify-end ${numberOfPages > 1 ? "justify-between" : "justify-start"}`}>
          {numberOfPages > 1 && <MyButton contentButton="Previous page" title="Previous page" onClick={() => { setNumberOfPages(numberOfPages - 1) }} />}
          {numberOfPages < totalPages && <MyButton contentButton="Next page" title="Next page" onClick={() => { setNumberOfPages(numberOfPages + 1) }} />}
        </div>
        <div className="mx-auto flex justify-center gap-6 mb-5">
          {Array.from({ length: totalPages }, (_, index) => index + 1).slice(0).map((value) => (
            <div onClick={() => { setNumberOfPages(value) }} className={`cursor-pointer rounded-full h-9 w-9 text-center grid content-center ${value === numberOfPages ? "bg-black text-white" : "bg-white text-black border-solid border-2 border-neutral-500"}`} key={value}>{value}</div>
          ))}
        </div>
      </>

    </>
  )
}

export default Home
