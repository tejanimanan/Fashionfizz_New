import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Orders() {
  const orders = [
    { id: 1, user: 'John', product: 'T-shirt', status: 'Delivered' },
    { id: 2, user: 'Sara', product: 'Watch', status: 'Pending' },
  ];

  return (
    <div className="d-flex">
     
      <div className="container-fluid" >
        <div className="mt-4">
          <h2>All Orders</h2>
          <div className="table-responsive bg-white p-4 mt-4 rounded shadow-sm">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">User</th>
                  <th scope="col">Product</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.user}</td>
                    <td>{order.product}</td>
                    <td>
                      <span className={`badge ${order.status === 'Delivered' ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
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
