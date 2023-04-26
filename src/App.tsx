import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  Router,
  RouterProvider,
} from 'react-router-dom';
import './App.css'
import Footer from './Footer'
import Header from './Header'
import Home from './Home'
import NoPage from './NoPage';
import UserDetail from './UserDetail';
import UserPosts from './UserPosts';
import UserTasks from './UserTasks';
import SignUp from "./UserInfo";
import NewsFeed from './NewsFeed';
import SearchResult from './SearchResult';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <div className='p-12'></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/users/:id/posts" element={<UserPosts />} />
          <Route path="/users/:id/todos" element={<UserTasks />} />
          <Route path="/news" element={<NewsFeed />} />
          <Route path="/search/:letters" element={<SearchResult />} />
          <Route path="/my-profile" element={<SignUp id={999} avatar={`https://avatars.githubusercontent.com/u/111166256`} first_name={`Long`} last_name={`Phan`} email={`phanquangminhlong@gmail.com`} />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
