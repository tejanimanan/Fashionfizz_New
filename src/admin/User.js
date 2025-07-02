import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Users() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer' },
  ];

  return (
    <div className="d-flex">
      
      <div className="container-fluid" >
        <div className="mt-4">
          <h2>All Users</h2>
          <div className="table-responsive bg-white p-4 mt-4 rounded shadow-sm">
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
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
                {users.length === 0 && (
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
    </div>
  );
}
