import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import './App.css'

import { Route, Routes, useNavigate } from "react-router-dom"
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar"
import LoginForm from './pages/Login'
import Register from "./pages/Register"
function App() {
  return (
    <>
    <div className='App bg-[#F5F5F5] min-h-screen w-screen font-inter flex flex-col'>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
    </>
  )
}

export default App
