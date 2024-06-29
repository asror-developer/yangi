import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home/Home'
function App() {
  return (
   <div>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
   </div>
  )
}

export default App
  