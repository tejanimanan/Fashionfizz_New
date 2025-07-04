import React, { useState } from 'react';
import axios from 'axios';

export default function EditProductForm({ product, onClose }) {
  const [formData, setFormData] = useState({
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    size: product.size,
    color: product.color,
    description: product.description,
    image: product.image
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

    // If new image is selected, append it
    if (imageFile) {
      data.append('image', imageFile);
    } else {
      data.append('image', formData.image); // Keep existing image path
    }

    await axios.put(`http://localhost:5000/api/product/${formData.id}`, data, {
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
              <h5 className="modal-title">Edit Product</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <input name="name" value={formData.name} onChange={handleChange} className="form-control mb-2" placeholder="Name" />
              <input name="category" value={formData.category} onChange={handleChange} className="form-control mb-2" placeholder="Category" />
              <input name="price" type="number" value={formData.price} onChange={handleChange} className="form-control mb-2" placeholder="Price" />
              <input name="size" value={formData.size.join(',')} onChange={handleChange} className="form-control mb-2" placeholder="Size (comma separated)" />
              <input name="color" value={formData.color.join(',')} onChange={handleChange} className="form-control mb-2" placeholder="Color (comma separated)" />
              
              {/* File input for new image */}
              <input name="image" type="file" accept="image/*" onChange={handleImageChange} className="form-control mb-2" />

              {/* Show current image */}
              {formData.image && (
                <div className="mb-2">
                  <small>Current Image:</small><br />
                  <img src={`http://localhost:5000${formData.image}`} alt="current" height="80" />
                </div>
              )}

              <textarea name="description" value={formData.description} onChange={handleChange} className="form-control mb-2" placeholder="Description" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-success">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
