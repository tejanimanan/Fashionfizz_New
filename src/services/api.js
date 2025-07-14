import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const API_BASE = 'http://localhost:5000/api';
export const api = {
  // Products
  getProducts: async () => {
    const response = await fetch(`http://localhost:5000/api/product/`);
    return response.json();
  },

  getProductById: async (id) => {
    const response = await fetch(`http://localhost:5000/api/product/${id}`);
    return response.json();
  },

  // Categories
  // getCategories: async () => {
  //   const response = await fetch(`${API_BASE_URL}categories`);
  //   return response.json();
  // },

  // Cart
  getCart: async (id) => {
    const response = await fetch(`http://localhost:5000/api/cart/${id}`, {
      method: "GET"
    });
    return response.json();
  },

  addToCart: async (product) => {
    const response = await fetch(`http://localhost:5000/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return response.json();
  },

  removeFromCart: async (productId) => {
    const response = await fetch(`http://localhost:5000/api/cart/${productId}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Users
  getUserById: async (userId) => {
    const res = await fetch(`http://localhost:5000/api/user/${userId}`);
    const user = await res.json();
    return user;
  },
  getAllUser:async()=>{
      const res = await fetch('http://localhost:5000/api/user/',{method:'GET'});
      return res.json();
  },

  updateUser: async (userId, userData) => {
    const response = await fetch(`${API_BASE_URL}user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  // Orders
  addOrder : async (order) => {
    const response = await fetch('http://localhost:5000/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });

    const result = await response.json();
    if (response.ok) {
      alert("Order placed successfully!");
      // return response.json()
    } else {
      alert(result.message || "Failed to place order.");
    }
  },
  getOrders: async (userId) => {
    const response = await fetch(`http://localhost:5000/api/order/user/${userId}`);
    return response.json();
  },
  getAllorder:async()=>{
    const response =  await fetch('http://localhost:5000/api/order');
    return response.json();
  },
  deleteOrder: async (id) => {
    const res = await axios.delete(`${API_BASE}/order/${id}`);
    return res.data;
  },
  updateOrderStatus: async (id, status) => {
    const res = await axios.put(`${API_BASE}/order/${id}/status`, { status });
    return res.data;
  },
  getDashboardCounts:async ()=>{
    const res = await axios.get('http://localhost:5000/api/product/dashboard-counts');
    return res.data;
  }
}; 