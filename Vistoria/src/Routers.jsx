import React, { useState } from 'react'
import {Routes,Route } from 'react-router-dom'

import Home from './pages/Home'
import RegisterPage from './pages/RegisterPage'
import Login from './pages/Login'
const Routers = () => {
  return (
 
    <Routes>
        {/* <Route index element={<Navbar/>}/> */}
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
    
        <Route path='/login' element={<Login/>}/>
        <Route path='/*' element={<div>404 - Page not found</div>} />
    </Routes>
  
  )
}

export default Routers