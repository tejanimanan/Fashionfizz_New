const API_BASE_URL = process.env.REACT_APP_API_URL;

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
  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}categories`);
    return response.json();
  },

  // Cart
  getCart: async () => {
    const response = await fetch(`${API_BASE_URL}cart`);
    return response.json();
  },

  addToCart: async (product) => {
    const response = await fetch(`${API_BASE_URL}cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return response.json();
  },

  removeFromCart: async (productId) => {
    const response = await fetch(`${API_BASE_URL}cart/${productId}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Users
  getUserById: async (userId) => {
    const response = await fetch(`${API_BASE_URL}user/${userId}`);
    return response.json();
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
  addOrder: async (order) => {
    const response = await fetch(`${API_BASE_URL}orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    return response.json();
  },

  getOrders: async (userId) => {
    const response = await fetch(`${API_BASE_URL}orders?userId=${userId}`);
    return response.json();
  },
}; 