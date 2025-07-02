import React from 'react'
import Sidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'

export default function AdminMain() {
  return (
        <div className="d-flex">
      <Sidebar />
      <div className="container-fluid" style={{ marginLeft: '250px' }}>
        
      <Outlet/>
      </div>
    </div>
  )
}
