import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddProduct = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: 'T-shirt', category: 'Men', price: 499, image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Handbag', category: 'Women', price: 899, image: 'https://via.placeholder.com/100' }
  ]);

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className="add-product-bg py-4">
      {/* <Sidebar /> */}
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mt-2 mb-4">
          <h2 className="add-product-title">Add Product</h2>
          <button className={`btn ${showForm ? 'btn-danger' : 'btn-success'} add-product-btn`} onClick={toggleForm}>
            {showForm ? 'Close Form' : 'Add New Product'}
          </button>
        </div>

        {showForm && (
          <form className="mt-4 border rounded p-4 bg-white shadow-sm add-product-form">
            <div className="row g-3">
              <div className="mb-3 col-md-4">
                <label className="form-label">Category</label>
                <select className="form-select">
                  <option>Men</option>
                  <option>Women</option>
                  <option>Accessories</option>
                </select>
              </div>
              <div className="mb-3 col-md-4">
                <label className="form-label">Product Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3 col-md-4">
                <label className="form-label">Price</label>
                <input type="number" className="form-control" />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Image URL</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-12">
                <button className="btn btn-primary add-product-save-btn">Save Product</button>
              </div>
            </div>
          </form>
        )}

        <div className="mt-5">
          <h4 className="product-list-title">Product List</h4>
          <div className="table-responsive">
            <table className="table table-bordered mt-3 add-product-table">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price (₹)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">No products found.</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="align-middle">
                      <td><span className="badge bg-secondary">{product.id}</span></td>
                      <td><img src={product.image} alt={product.name} width="60" className="rounded shadow-sm" /></td>
                      <td>{product.name}</td>
                      <td><span className={`badge ${product.category === 'Men' ? 'bg-primary' : product.category === 'Women' ? 'bg-pink' : 'bg-info'} text-white`}>{product.category}</span></td>
                      <td className="fw-bold text-success">₹{product.price}</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-2">Edit</button>
                        <button className="btn btn-sm btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
