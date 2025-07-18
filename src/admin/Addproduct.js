import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditProductForm from './EditProductForm';
import AddProductForm from './AddProductForm';


export default function AddProduct() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  // const API_BASE_URL = process.env.REACT_APP_API_URL;
  const fetchProducts = async () => {
    const res = await axios.get('https://fashionfizzbackend.onrender.com/api/product/');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditProduct(product);
  };
  const handleDelete = async (product) => {
  try {
    const res = await axios.delete('https://fashionfizzbackend.onrender.com/api/product/' + product.id);
    if (res.status === 200) {
      alert("Product deleted successfully");
      // Remove product from local state
      setProducts(prevProducts => prevProducts.filter(p => p.id !== product.id));
    }
  } catch (error) {
    alert("Failed to delete product");
    console.error(error);
  }
};
  return (
    <div className="container my-4 shadow-lg roundend-4  p-4 ">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className='fw-bold'>Product List</h3>
        <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
          Add Product
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Size</th>
              <th>Color</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.name}</td>
                <td>{prod.category}</td>
                <td>₹{prod.price}</td>
                <td>{prod.size.join(', ')}</td>
                <td>{prod.color.join(', ')}</td>
                <td>
                  {prod.image && <img src={`https://fashionfizzbackend.onrender.com${prod.image}`}  alt="Product" width="60" height="60" />}
                </td>
                <td>
                  <button className="btn btn-sm btn-success" onClick={() => handleEdit(prod)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger mx-2" onClick={() => handleDelete(prod)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editProduct && <EditProductForm product={editProduct} onClose={() => { setEditProduct(null); fetchProducts(); }} />}
      {showAddForm && <AddProductForm onClose={() => { setShowAddForm(false); fetchProducts(); }} />}
    </div>
  );
}
