import { useState, useEffect } from "react"
import axios from 'axios'
import UserCard from "./UserCard";
import MyButton from "./MyButton";
import Loading from "./Loading";
import { useParams, Link } from 'react-router-dom';

interface Data {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    // Add more properties as needed
}

const fetchData = async (page: number): Promise<Data[]> => {
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
    return response.data.data;
};

export default function SearchResult() {
    const { letters } = useParams<{ letters?: string }>(); // get the 'id' parameter from the route

    const [userData, setUserData] = useState<any>()
    const [data, setData] = useState<any>()
  const [numberOfPages, setNumberOfPages] = useState(1);
  useEffect(() => {
    const getData = async () => {
        let page = 1;
        let allData: Data[] = [];

        while (true) {
            const newData = await fetchData(page);

            if (newData.length === 0) {
                // No more data available
                break;
            }

            allData = [...allData, ...newData];
            page++;
        }
        allData = [...allData, {
            "id": 999,
            "email": "phanquangminhlong@gmail.com",
            "first_name": "Long",
            "last_name": "Phan",
            "avatar": "https://longphanquangminh.github.io/Long-Phan-Resume/images/logoML.png"
          }]
        setData(allData);
    };

    getData();
}, []);
useEffect(() => {
    if (data && letters) { // add a check for letters
        const filteredData = data.filter((item: any) =>
            (item.first_name + " " + item.last_name)?.toLowerCase().includes(letters.toLowerCase()) ||
            item.email?.toLowerCase().includes(letters.toLowerCase())
        );
        setUserData(filteredData);
    }
}, [data, letters]);
  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users?page=${numberOfPages}`)
      .then((res) => {
        setUserData(res.data.data)
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
            <>
                <h1 className="text-center font-light text-2xl">Search: {letters}, {userData.length} result{userData.length > 1 ? "s" : ""}</h1>
          <div className="grid grid-cols-1 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
            {userData.map((user: any) => (
              <UserCard key={user.id} id={user.id} first_name={user.first_name} last_name={user.last_name} avatar={user.avatar} email={user.email} />
            ))}

          </div>
            </>
        )}
      </>

    </>
  )
}
