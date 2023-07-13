import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Fun from './Function'

function Layout() {
  return (
    <div>
        <Navbar/>
        <Fun />
        <Outlet/>
    </div>
  )
}

export default Layout