import React from 'react'
import Visitor_Register from '../Component/Visitor_Register'

const RegisterPage = () => {
  return (
    <main className='flex  mx-10 p-10 my-12 max-h-[1200px] justify-evenly'>
        <div className='border-2 w-[1200px] h-fit rounded-md border-solid border-gray-300 '> 
           <Visitor_Register/>
       </div>
    </main>
  )
}

export default RegisterPage
