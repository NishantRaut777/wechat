import React, { useEffect } from 'react'
import  Button  from "daisyui"
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import { useAuthStore } from './store/useAuthStore'

import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"
import Navbar from './components/Navbar'
import AddFriends from './pages/AddFriends'

const App = () => {

  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  useEffect(() => {
    checkAuth()
  },[checkAuth]);

  console.log("OL USERS:", onlineUsers);

  console.log(authUser);

  if(isCheckingAuth && !authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader  className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
        <Route path='/signup' element={!authUser ? <Signup />: <Navigate to={"/"} />} />
        <Route path='/login' element={!authUser ? <Login />: <Navigate to={"/"} />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/profile' element={   authUser ? <Profile />: <Navigate to={"/login"} />} />
        <Route path='/addFriends' element={   authUser ? <AddFriends />: <Navigate to={"/login"} />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
