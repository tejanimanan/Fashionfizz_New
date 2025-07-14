import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { api } from '../services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.getAllorder();
      setOrders(response);  
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDelete = async (id) => {
    
      try {
        const res = await api.deleteOrder(id);
        if(res){
          alert("order is delete")
        }
        fetchOrders();
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateOrderStatus(id, newStatus);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="d-flex">
      <div className="container-fluid">
        <div className="mt-4">
          <h2>All Orders</h2>
          <div className="table-responsive bg-white p-4 mt-4 rounded shadow-sm">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">User</th>
                  <th scope="col">Address</th>
                  <th scope="col">Product(s)</th>
                  <th scope="col">Total Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders && orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.userId}{order.username}</td>
                      <td>{order.deliveryAddress}</td>
                      <td>
                        {order.items.map((item, idx) => (
                          <div key={idx}>
                            <div>{item.name} ₹{item.price} × {item.quantity}</div>
                            <img src={`https://fashionfizzbackend.onrender.com/${item.image}`} alt="Product" width="60" height="60" />
                          </div>
                        ))}
                      </td>
                      <td>₹{order.totalAmount}</td>
                      
                      <td>
                        <select
                          className={`form-select form-select-sm ${order.status === 'Delivered' ? 'bg-success text-white' : 'bg-warning text-dark'}`}
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(order.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
