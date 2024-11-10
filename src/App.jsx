//import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./Pages/Login/Login.jsx"
import { VerifyAccount } from './Pages/VerifyAccount/VerifyAccount.jsx'
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword.jsx"
import Home from './Pages/Home/Home.jsx'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verifyaccount" element={<VerifyAccount />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
