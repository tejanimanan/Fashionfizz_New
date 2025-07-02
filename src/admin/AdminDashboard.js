import React from 'react';
import { Outlet } from 'react-router-dom';


export default function AdminDashboard() {
  return (
    <div className="d-flex">
      {/* <Sidebar /> */}
      <div className="container-fluid">
        <h2 className="mt-4">Dashboard Overview</h2>
        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Men</h5>
                <p className="card-text">Products: 120</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Women</h5>
                <p className="card-text">Products: 140</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Accessories</h5>
                <p className="card-text">Products: 80</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet/>
    </div>
  );
}
