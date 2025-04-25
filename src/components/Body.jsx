import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import SideNavigation from './SideNavigation'

const Body = () => {
  return (
    <div className='flex'>
      <SideNavigation />
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Body