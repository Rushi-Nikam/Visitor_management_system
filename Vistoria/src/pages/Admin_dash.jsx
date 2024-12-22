import React from 'react'
import Forms from '../Component/Forms'

const Admin_dash = () => {
  return (
    <div>
 <Forms formType='visitor'
 submitUrl="http://localhost:3000/api/visitor/create"/>
    </div>
  )
}

export default Admin_dash
