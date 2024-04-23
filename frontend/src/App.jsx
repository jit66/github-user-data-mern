import { Route,Routes } from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Explore from "./pages/Explore"
import Likes from "./pages/Likes"
import Home from "./pages/Home"
import Sidebar from "./components/Sidebar"

function App() {

  return (
    <div className="flex text-white">
      <Sidebar/>
      <div className="my-5 flex-1 mx-auto text-white max-w-5xl">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/explore" element={<Explore/>} />
          <Route path="/likes" element={<Likes/>} />
        </Routes>
        <Toaster/>
      </div>
    </div>
    
  )
}

export default App
