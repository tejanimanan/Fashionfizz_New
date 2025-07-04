import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTachometerAlt, FaBoxOpen, FaClipboardList, FaUsers, FaKey, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { to: '/admin/addproduct', label: 'All Product', icon: <FaBoxOpen /> },
    { to: '/admin/orders', label: 'View Orders', icon: <FaClipboardList /> },
    { to: '/admin/users', label: 'All Users', icon: <FaUsers /> },
    { to: '/manage-password', label: 'Manage Password', icon: <FaKey /> },
  ];

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 vh-100 position-fixed admin-sidebar"
      style={{
        width: isCollapsed ? '80px' : '250px',
        transition: 'width 0.3s',
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        {!isCollapsed && <h4 className="sidebar-title m-0">Admin Panel</h4>}
        <button
          className="btn btn-sm btn-outline-light sidebar-toggle pb-2"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
      <ul className="nav nav-pills flex-column mb-auto">
        {navItems.map((item) => (
          <li className="nav-item" key={item.to}>
            <Link
              to={item.to}
              className={`nav-link sidebar-link d-flex align-items-center ${location.pathname === item.to ? 'active' : ''}`}
            >
              <span className="me-2 sidebar-icon">{item.icon}</span>
              {!isCollapsed && item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
