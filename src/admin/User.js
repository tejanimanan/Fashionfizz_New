import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { api } from '../services/api';

export default function Users() {
  // const users = [
  //   { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer' },
  //   { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer' },
  // ];
  const [user,SetUser] = useState([])
  useEffect(() => {
      fetchUser();
    }, []);
  
    const fetchUser = async () => {
      try {
        const response = await api.getAllUser();
        SetUser(response);  
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  return (
    <div className="user-bg py-4">
      <div className="container-fluid">
        <div className="mt-2 mb-4">
          <h2 className="user-title">All Users</h2>
        </div>
        <div className="table-responsive bg-white p-4 rounded shadow-sm user-table">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user) => (
                <tr key={user.id}>
                  <td><span className="badge bg-secondary">{user.id}</span></td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className="badge bg-success">{user.role?user.role:"Customer"}</span></td>
                </tr>
              ))}
              {user.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
