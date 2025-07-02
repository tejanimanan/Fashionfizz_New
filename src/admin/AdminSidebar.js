import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="d-flex flex-column flex-shrink-0 bg-light p-3 vh-100 position-fixed" style={{ width: isCollapsed ? '80px' : '250px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        {!isCollapsed && <h4 className="text-primary m-0">Admin Panel</h4>}
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle sidebar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/admin" className="nav-link text-dark">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/addproduct" className="nav-link text-dark">
            All Product
          </Link>
        </li>
        <li>
          <Link to="/admin/orders" className="nav-link text-dark">
            View Orders
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="nav-link text-dark">
            All Users
          </Link>
        </li>
        <li>
          <Link to="/manage-password" className="nav-link text-dark">
            Manage Password
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
