import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

import { Route, Routes, useNavigate } from "react-router-dom"
import Home from "./pages/Home";

function App() {
  return (
    <>
      <h1>HEllo</h1>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
