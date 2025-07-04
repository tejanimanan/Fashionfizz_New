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
              <div className="row text-start">
                <div className="mb-3 col-md-6">
                  <label htmlFor="name" className="form-label">Product Name</label>
                  <input
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Name"
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="category" className="form-label">Category</label>
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Category</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input
                    name="price"
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Price"
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="size" className="form-label">Size</label>
                  <input
                    name="size"
                    id="size"
                    value={formData.size.join(',')}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Size (comma separated)"
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="color" className="form-label">Color</label>
                  <input
                    name="color"
                    id="color"
                    value={formData.color.join(',')}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Color (comma separated)"
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="image" className="form-label">Upload New Image</label>
                  <input
                    name="image"
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-control"
                  />
                </div>

                {formData.image && (
                  <div className="mb-3 col-12">
                    <label className="form-label">Current Image</label><br />
                    <img
                      src={`http://localhost:5000${formData.image}`}
                      alt="Current"
                      height="80"
                      className="rounded border"
                    />
                  </div>
                )}

                <div className="mb-3 col-12">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                    rows="3"
                    placeholder="Description"
                  />
                </div>
              </div>
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
