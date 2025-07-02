import React from 'react'
import Sidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'

export default function AdminMain() {
  return (
    <div className="d-flex admin-main-bg">
      <Sidebar />
      <div className="container-fluid admin-content" style={{ marginLeft: '250px', transition: 'margin-left 0.3s' }}>
        <Outlet/>
      </div>
    </div>
  )
}
