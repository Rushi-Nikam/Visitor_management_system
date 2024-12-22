import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  // const [view,setview]=useState(false);
  return (
    <div className='flex flex-col my-10 justify-center mx-auto items-center'>
    <div>
      <div>
        <div>
          <img src="/Images/Tata_Motor.png" alt="tata_motor" />
        </div>
        <div className='flex flex-1 ml-12 text-2xl text-center gap-2 '>
          <h1>Hello,  please enter visitor details</h1> 
           <Link className='text-blue-500 underline' to={'/Register'}>Click here</Link>
        </div>
      </div>
      <div>
      </div>
    </div>
    </div>
  )
}

export default Home
