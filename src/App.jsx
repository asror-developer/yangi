import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home/Home'
import { ToastContainer } from 'react-toastify'

export default function App(){
    return(
        <div>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
           {/* Category */}
          </Routes>
         
        </div>
    )
}