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

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:userId" element={<UserDetail />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
