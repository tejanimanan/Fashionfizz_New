import React from 'react';
import { Outlet } from 'react-router-dom';
import { FaMale, FaFemale, FaGem } from 'react-icons/fa';

export default function AdminDashboard() {
  return (
    <div className="container-fluid py-4">
      <h2 className="mt-2 mb-4 dashboard-title">Dashboard Overview</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card dashboard-card dashboard-men text-white text-center h-100">
            <div className="card-body">
              <FaMale size={36} className="mb-2" />
              <h5 className="card-title">Men</h5>
              <p className="card-text">Products: 120</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card dashboard-card dashboard-women text-white text-center h-100">
            <div className="card-body">
              <FaFemale size={36} className="mb-2" />
              <h5 className="card-title">Women</h5>
              <p className="card-text">Products: 140</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card dashboard-card dashboard-accessories text-white text-center h-100">
            <div className="card-body">
              <FaGem size={36} className="mb-2" />
              <h5 className="card-title">Accessories</h5>
              <p className="card-text">Products: 80</p>
            </div>
          </div>
        </div>
      </div>
      <Outlet/>
    </div>
  );
}
