import React from 'react'
import Detail from './Detail'
import FileUpload from './FileUpload'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate();
  return (
    <>
      <Detail/>
      <div className='flex justify-center'><h1 className=''>Already have an account? <Link to="/admin-login" className='text-xl text-blue-800 cursor-pointer'>Login</Link></h1></div>
    </>
    
  )
}

export default Register

