import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { FaEye, FaShoppingCart } from 'react-icons/fa'
import { BsEyeFill } from 'react-icons/bs'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AllProduct() {
    const [product, SetProduct] = useState()
    const navigation = useNavigate()
    const API_URL = process.env.REACT_APP_API_URL;
    useEffect(() => {
        fetch(`${API_URL}products`).then((res) => res.json()).then((data) => SetProduct(data))
    }, [])

    
    const AddToCart = async (v) => {
        const userId = localStorage.getItem('userId');
      
        if (!userId) {
          toast.error('Please login first to add items to cart');
          navigation('/login');
          return;
        }
      
        try {
          // Step 1: Fetch user's cart to check if the product already exists
          const response = await fetch(`${API_URL}cart?userId=${userId}`);
          const cartItems = await response.json();
      
          // Step 2: Check if the product is already in the cart
          const productExists = cartItems.some(item => item.productId === v.id);
      
          if (productExists) {
            toast.error('This product is already in your cart');
            return;
          }
      
          // Step 3: If not in cart, add the product
          const cartItem = {
            productId: v.id,
            userId: userId,
            price: v.price,
            quantity: 1,
            name: v.name,
            size: v.size,
            color: v.color,
            image: v.image,
          };
      
          const addResponse = await fetch(`${API_URL}cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cartItem),
          });
      
          if (addResponse.ok) {
            toast.success('Product added to cart successfully!');
            // Add a small delay before navigation
            setTimeout(() => {
              navigation('/cart');
            }, 1500); // 1.5 seconds delay
          } else {
            toast.error('Failed to add product to cart. Please try again.');
          }
        } catch (error) {
          console.error('Error adding to cart:', error);
          toast.error('Something went wrong. Please try again.');
        }
      };


    return (
        <div className='py-4' >
            <ToastContainer />
            <div className='container rounded-5 px-4 py-4' style={{ background: 'linear-gradient(145deg,rgb(230, 235, 237),rgb(246, 247, 248))' }}>
                <div className='row g-4'>
                    {
                        product && product.map((v) => (
                            <div key={v.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                <div className="card h-100 shadow-lg border-0 rounded-3" style={{
                                    background: 'linear-gradient(145deg,rgb(230, 235, 237),rgb(246, 247, 248))'
                                }}>
                                    <div className="position-relative overflow-hidden rounded-3" style={{ height: '270px', background: 'linear-gradient(145deg,rgb(230, 235, 237),rgb(246, 247, 248))' }}>
                                        <img 
                                            src={v.image} 
                                            className="card-img-top p-3 product-img h-100 w-100" 
                                            style={{ objectFit: 'contain' }}
                                            alt={v.name} 
                                        />
                                    </div>
                                    <div className="card-body d-flex flex-column justify-content-between rounded-3 " style={{ background: 'linear-gradient(145deg,rgb(230, 235, 237),rgb(246, 247, 248))' }}>
                                        <div className='card-text mb-3'>
                                            <h5 className="card-title fw-semibold text-dark mb-2">{v.name}</h5>
                                            <p className="card-text fw-bold text-primary mb-3">Rs.{v.price}</p>
                                        </div>
                                        <div className='d-flex flex-wrap gap-2'>
                                            <Link 
                                                to={`/singleproduct/${v.id}`} 
                                                className='btn btn-outline-primary flex-grow-1'
                                                style={{
                                                    background: 'linear-gradient(to right, #0d6efd, #0a58ca)',
                                                    color: 'white',
                                                    border: 'none'
                                                }}
                                            >
                                                Quick View
                                              
                                            </Link>
                                            <button 
                                                onClick={() => AddToCart(v)} 
                                                className='btn flex-grow-1'
                                                style={{
                                                    background: 'linear-gradient(to right, #0F2143, #1a365d)',
                                                    color: 'white',
                                                    border: 'none'
                                                }}
                                            >
                                                Add to cart <FaShoppingCart size={22} color="#ffff" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
