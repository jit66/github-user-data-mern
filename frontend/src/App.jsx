import { Navigate, Route, Routes } from "react-router-dom";
import {Toaster} from "react-hot-toast"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Explore from "./pages/Explore"
import Likes from "./pages/Likes"
import Home from "./pages/Home"
import Sidebar from "./components/Sidebar"
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser, loading } = useAuthContext();
	console.log("Authenticated user:", authUser);

	if (loading) return null;
  return (
    <div className="flex text-white">
      <Sidebar/>
      <div className="my-5 flex-1 mx-auto text-white max-w-5xl">
        <Routes>
        <Route path='/' element={<Home />} />
					<Route path='/login' element={!authUser ? <Login /> : <Navigate to={"/"} />} />
					<Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to={"/"} />} />
					<Route path='/explore' element={authUser ? <Explore /> : <Navigate to={"/login"} />} />
					<Route path='/likes' element={authUser ? <Likes /> : <Navigate to={"/login"} />} />
        </Routes>
        <Toaster/>
      </div>
    </div>
  )
}

export default App
