import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
// import Product from './Product.js'

function Layout() {
  return (
    <div>
        <Navbar/>
        {/* <Product /> */}
        <Outlet/>
    </div>
  )
}

export default Layout