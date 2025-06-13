import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from './NavBar';

export default function SingleProduct() {
  const [item, SetItem] = useState(1);
  const [product, SetProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate()
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    console.log(id);
    const API_URL = process.env.REACT_APP_API_URL;
    fetch(`${API_URL}products/` + id)
      .then((res) => res.json())
      .then((data) => SetProduct(data));
  }, []);
  const handleDecrement = () => {
    if (item != 1) {
      SetItem(item - 1)
    }
  }
  // const AddCart = () => {
  //   const userId = localStorage.getItem('userId');

  //   if (userId) { 
  //     const cartItem = {
  //       productId: product.id,  
  //       userId: userId,         
  //       price: product.price,   
  //       quantity: item,         
  //       name: product.name,     
  //       size: product.size,     
  //       color: product.color,   
  //       image: product.image    
  //     };

  //     // Sending cart item to backend
  //     fetch('http://localhost:5001/cart', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(cartItem),
  //     })
  //     alert("Product is added to cart")
  //     navigate('/cart')
  //   } else {
  //       alert('User is not logged in. UserId not found in localStorage.');
  //       navigate('/login')
  //   }
  // };

  const AddCart = async () => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('User is not logged in. UserId not found in localStorage.');
      navigate('/login');
      return;
    }

    try {
      // Step 1: Fetch user's cart to check if the product already exists
      const response = await fetch(`${API_URL}cart?userId=${userId}`);
      const cartItems = await response.json();

      // Step 2: Check if the product is already in the cart
      const productExists = cartItems.some(item => item.productId === product.id);

      if (productExists) {
        alert('This product is already in your cart.');
        return;
      }

      // Step 3: If not in cart, add the product
      const cartItem = {
        productId: product.id,
        userId: userId,
        price: product.price,
        quantity: item,
        name: product.name,
        size: product.size,
        color: product.color,
        image: product.image,
      };

      const addResponse = await fetch(`${API_URL}cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItem),
      });

      if (addResponse.ok) {
        alert('Product is added to cart');
        navigate('/cart');
      } else {
        alert('Failed to add product to cart. Please try again.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  return (
    <div>
      <NavBar />
      <div className='container'>
        <Link to="/shop" className='btn btn-info  fs-5 mt-3'>Go back</Link>
        {product && (
          <div className='row mt-5 shadow p-2 mb-5 rounded-5 bg-light'>
            <div className='col-lg-6'>
              <img src={product.image} className='w-75 rounded-5' alt='no image'></img>
            </div>
            <div className='col-lg-6 col-md-6 pb-3 text-start mt-5'>
              <h2 className=""> {product.name} </h2>
              <span className="fs-4"> ${product.price} </span>
              <p className=""> {product.description} </p>
              {/* */}
              <div className="pt-3">
                <div className="d-flex gap-4 pb-3">
                  <div className=""> Size </div>
                  <div className="">
                    <select className="form-select" aria-label="Default select example">
                      <option selected>Choose an Option</option>
                      {product.size && product.size.map((size, index) => (
                        <option key={index} value={index + 1}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="d-flex gap-3 pb-3">
                  <div className=""> Color </div>
                  <div className="">
                    <select className="form-select text-dark" aria-label="Default select example">
                      <option selected>Choose an Option</option>
                      {product.color && product.color.map((color, index) => (
                        <option key={index} value={index + 1}>{color}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="pb-3">


                  <div className="mt-3 d-flex gap-2">
                    <div > <button className='btn btn-info  fs-5' onClick={() => handleDecrement()}>-</button> </div>
                    <span className='fs-3'>{item}</span>
                    <div > <button className='btn btn-info  fs-5' onClick={() => SetItem(item + 1)}>+</button> </div>
                  </div>
                  <button onClick={() => AddCart()} className="btn btn-warning mt-5 fs-5 fw-semibold "> Add to cart <i className="fa-solid fa-cart-shopping"></i> </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
