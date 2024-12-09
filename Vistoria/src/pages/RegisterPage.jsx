import React from 'react'
import Visitor_Register from '../Component/Visitor_Register'

const RegisterPage = () => {
  return (
    <main className='flex  mx-10 p-10 my-12 max-h-[1200px] justify-evenly'>
      <div className='flex gap-10 items-center justify-around border-2 border-solid border-gray-500 w-96 p-8 rounded-full'>
      
        <img src="/img.png" alt="register_Image" />
       
      </div>
        <div className='border-2 w-[500px] h-fit rounded-md border-solid border-gray-700 '>
<  Visitor_Register/>
        </div>
    </main>
  )
}

export default RegisterPage
