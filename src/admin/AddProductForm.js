import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function AddProductForm({ onClose }) {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: '',
    category: '',
    price: '',
    size: [],
    color: [],
    description: ''
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'size' || name === 'color') {
      setFormData({ ...formData, [name]: value.split(',') });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('id', formData.id);
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('size', JSON.stringify(formData.size));
    data.append('color', JSON.stringify(formData.color));
    data.append('image', imageFile);

    await axios.post('http://localhost:5000/api/product/', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="modal-header">
              <h5 className="modal-title">Add Product</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <input name="name" onChange={handleChange} className="form-control mb-2" placeholder="Name" />
              <input name="category" onChange={handleChange} className="form-control mb-2" placeholder="Category" />
              <input name="price" type="number" onChange={handleChange} className="form-control mb-2" placeholder="Price" />
              <input name="size" onChange={handleChange} className="form-control mb-2" placeholder="Size (comma separated)" />
              <input name="color" onChange={handleChange} className="form-control mb-2" placeholder="Color (comma separated)" />
              <input name="image" type="file" accept="image/*" onChange={handleImageChange} className="form-control mb-2" />
              <textarea name="description" onChange={handleChange} className="form-control mb-2" placeholder="Description" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
