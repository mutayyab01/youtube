import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import SideNavigation from './SideNavigation'
import Head from './Head'

const Body = () => {
  return (
    <div className='flex'>
      <Head />
      <SideNavigation />
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Body