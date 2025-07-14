import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FaMale, FaFemale, FaGem, FaClipboardList, FaUsers, FaProductHunt } from 'react-icons/fa';
import { api } from '../services/api';

export default function AdminDashboard() {

  // getDashboardCounts
  const [counter,SetCounter] = useState('')
   useEffect(() => {
      fetchCounter();
    }, []);
  
    const fetchCounter = async () => {
      try {
        const response = await api.getDashboardCounts();
        // console.log("counter data",response)
        SetCounter(response);  
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  return (
    <div className="container-fluid py-4">
      <h2 className="mt-2 mb-4 dashboard-title">Dashboard Overview</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card dashboard-card dashboard-men text-white text-center h-100">
            <div className="card-body">
              <FaProductHunt size={36} className="mb-2" />
              <h5 className="card-title text-dark fw-bold">All Product</h5>
              <p className="card-text fw-bold text-dark ">Products: {counter.Allproduct}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card dashboard-card dashboard-men text-white text-center h-100">
            <div className="card-body">
              <FaMale size={36} className="mb-2" />
              <h5 className="card-title fw-bold text-dark ">Men</h5>
              <p className="card-text fw-bold text-dark ">Products: {counter?.productCounts?.Men || 0}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card dashboard-card dashboard-women text-white text-center h-100">
            <div className="card-body">
              <FaFemale size={36} className="mb-2" />
              <h5 className="card-title fw-bold text-dark ">Women</h5>
              <p className="card-text fw-bold text-dark ">Products: {counter?.productCounts?.Women || 0}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card dashboard-card dashboard-accessories text-white text-center h-100">
            <div className="card-body">
              <FaGem size={36} className="mb-2" />
              <h5 className="card-title fw-bold text-dark ">Accessories</h5>
              <p className="card-text fw-bold text-dark ">Products: {counter?.productCounts?.Accessories || 0}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card dashboard-card dashboard-men text-white text-center h-100">
            <div className="card-body">
              <FaUsers size={36} className="mb-2" />
              <h5 className="card-title fw-bold text-dark ">User</h5>
              <p className="card-text fw-bold text-dark ">{counter.userCount} </p>
            </div>
          </div>
        </div>
         <div className="col-md-4">
          <div className="card dashboard-card dashboard-men text-white text-center h-100">
            <div className="card-body">
              <FaClipboardList size={36} className="mb-2" />
              <h5 className="card-title fw-bold text-dark ">order</h5>
              <p className="card-text fw-bold text-dark ">{counter.orderCount}</p>
            </div>
          </div>
        </div>
      </div>
      <Outlet/>
    </div>
  );
}
