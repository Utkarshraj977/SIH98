import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import Router from './Routes/Router'
import AdminProvider from './Context/AdminContext'
function App() {


  return (
    <>
     <AdminProvider>
      <RouterProvider router={Router} />   
      </AdminProvider>
    </>
  )
}

export default App
