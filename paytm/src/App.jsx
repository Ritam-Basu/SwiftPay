import { useState } from 'react'

import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { Signup } from './pages/signup'
import { Sendmoney } from './pages/Sendmoney'
import { Sendpage } from './pages/Sendpage'
import {Updatepage} from './pages/Updatepage'
import { Profile } from './pages/Profile'
import { Transactionhist } from './pages/Transactionhist'




function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sendmoney"  element={<Sendmoney/>}/>
      <Route path="/signup"  element={<Signup/>}/>
      <Route path="/send"  element={<Sendpage/>}/>
      <Route path="/update"  element={<Updatepage/>}/>
      <Route path="/profile"  element={<Profile/>}/>
      <Route path="/history"  element={<Transactionhist/>}/>

      
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
