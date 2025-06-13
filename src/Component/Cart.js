import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { Bounce, Slide, toast, ToastContainer } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import { Modal, Form, Button } from 'react-bootstrap';

export default function Cart() {
    const [product, SetProduct] = useState([]);
    const [cartQuantities, SetCartQuantities] = useState({});
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    // Load cart items and user data when component is mounted
    useEffect(() => {
        if (userId) {
            // Fetch cart items
            fetch(`${API_URL}cart`)
                .then((res) => res.json())
                .then((data) => {
                    const userCartItems = data.filter((cartItem) => cartItem.userId === userId);
                    SetProduct(userCartItems);

                    const initialQuantities = {};
                    userCartItems.forEach(item => {
                        initialQuantities[item.id] = item.quantity || 1;
                    });
                    SetCartQuantities(initialQuantities);
                });

            // Fetch user data for address
            fetch(`${API_URL}user/${userId}`)
                .then(res => res.json())
                .then(data => {
                    setUser(data);
                    setDeliveryAddress(data.address || '');
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    toast.error('Failed to load user data');
                });
        } else {
            toast.error('Please log in first');
            navigate('/login');
        }
    }, [userId, navigate]);

    // Handle increment and decrement of product quantity
    const handleQuantityChange = (id, increment) => {
        const newQuantities = { ...cartQuantities };
        newQuantities[id] = newQuantities[id] + (increment ? 1 : -1);

        if (newQuantities[id] < 1) {
            newQuantities[id] = 1;
        }

        SetCartQuantities(newQuantities);

        fetch(`${API_URL}cart/` + id, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...product.find(p => p.id === id), quantity: newQuantities[id] }),
        });
    };

    // Calculate the total price of the cart
    const calculateTotal = () => {
        return product.reduce((total, item) => {
            const itemTotal = item.price * (cartQuantities[item.id] || 1);
            return total + itemTotal;
        }, 0).toFixed(2);
    };

    const Ondelete = (id) => {
        SetProduct(product.filter((v) => v.id !== id))
        fetch(`${API_URL}cart/` + id, {
            method: 'DELETE',
        }).then((res) => {
            if (res) {
                toast.error('🦄 Product removed from cart!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                });
            }
        });
    };

    const handlePlaceOrder = () => {
        if (!deliveryAddress.trim()) {
            toast.error('Please enter delivery address');
            return;
        }

        // Create order object
        const order = {
            userId: userId,
            items: product.map(item => ({
                productId: item.id,
                name: item.name,
                image: item.image,
                quantity: cartQuantities[item.id],
                price: item.price
            })),
            totalAmount: calculateTotal(),
            deliveryAddress: deliveryAddress,
            paymentMethod: paymentMethod,
            status: 'pending',
            orderDate: new Date().toISOString()
        };

        // Save order to database
        fetch(`${API_URL}orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to place order');
            }
            return res.json();
        })
        .then(() => {
            // Clear cart after successful order
            const deletePromises = product.map(item => 
                fetch(`${API_URL}cart/${item.id}`, {
                    method: 'DELETE'
                })
            );

            return Promise.all(deletePromises);
        })
        .then(() => {
            toast.success('Order placed successfully!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
            });

            setShowOrderModal(false);
            navigate('/profile'); // Redirect to profile page to see order status
        })
        .catch(error => {
            console.error('Error placing order:', error);
            toast.error('Failed to place order. Please try again.');
        });
    };

    return (
        <div className=''>
            <NavBar />
            <div className='' style={{background:"linear-gradient(to right,rgb(210, 214, 224),rgb(192, 194, 198))"}} >
                <ToastContainer />
                <div className="container py-5 ">
                    {
                        product.length > 0 ? (<> <div className="row justify-content-center">
                            <div className="col-lg-8 d-flex gap-4">
                                {product && product.map((v) => (
                                    <div key={v.id} className="card mb-3 shadow-sm text-start col-lg-4">
                                        <div className="card-body">
                                            <div className="d-flex flex-column align-items-center">
                                                {/* Image */}
                                                <div className="mb-2 text-center">
                                                    <img src={v.image} className="img-fluid rounded" style={{ width: "100px", height: "100px", objectFit: "cover" }} alt={v.name} />
                                                </div>
                                                {/* Details */}
                                                <div className="flex-grow-1 w-100">
                                                    <div className="fw-bold mb-2 text-center">{v.name}</div>
                                                    <div className="mb-2 text-center">
                                                        <span className="fw-bold small">Price: </span>
                                                        Rs.{v.price}
                                                    </div>
                                                    <div className="mb-2 text-center">
                                                        <span className="fw-bold small">Qty: </span>
                                                        <button
                                                            onClick={() => handleQuantityChange(v.id, false)}
                                                            className="btn btn-sm btn-info mx-1"
                                                        >-</button>
                                                        <span>{cartQuantities[v.id]}</span>
                                                        <button
                                                            onClick={() => handleQuantityChange(v.id, true)}
                                                            className="btn btn-sm btn-info mx-1"
                                                        >+</button>
                                                    </div>
                                                    <div className="mb-2 text-center">
                                                        <span className="fw-bold small">Total: </span>
                                                        Rs.{(v.price * (cartQuantities[v.id] || 1)).toFixed(2)}
                                                    </div>
                                                    <div className="text-center">
                                                        <button onClick={() => Ondelete(v.id)} className='btn btn-danger btn-sm'>
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                                {/* <Link to="/" className="btn btn-primary m-3">Continue Shopping</Link> */}
                            <div className="col-lg-4">
                                <div className='card'>
                                    <div className='card-header' style={{background:"linear-gradient(to right,rgb(86, 104, 149),rgb(58, 76, 110))"}}>
                                        <h4 className='text-start fw-bolder text-white'>Cart Detail</h4>
                                    </div>
                                    <div className='card-body'>
                                        <div className='d-flex justify-content-between'>
                                            <b>Price (item{product.length})</b>
                                            <b>Rs.{calculateTotal()}</b>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <b>Discount(10%)</b>
                                            <b>Rs.{(calculateTotal() * 0.1).toFixed(2)}</b>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <b>Delivery Charges</b>
                                            <b><del>Rs.80</del> <span className='text-success'>Free</span></b>
                                        </div>
                                        <hr></hr>
                                        <div className='d-flex justify-content-between'>
                                            <b>Total Amount</b>
                                            <b>Rs.{(calculateTotal() * 0.9).toFixed(2)}</b>
                                        </div>
                                    </div>
                                    <button 
                                        className='ms-auto btn bg-info my-2 mx-2 fw-bold w-50'
                                        onClick={() => setShowOrderModal(true)}
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div></>) : (<>
                            <div className="d-flex justify-content-center align-items-center vh-100 bg-img">
                                <div className="text-center p-4 border-0 card shadow-sm">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                                        alt="Empty Cart"
                                        className="img-fluid"
                                        style={{ maxWidth: "250px" }}
                                    />
                                    <h2 className="mt-3">Your Cart is Empty</h2>
                                    <p className="text-muted">Looks like you haven't added anything to your cart yet.</p>
                                    <Link to="/" className="btn btn-primary mt-3">Continue Shopping</Link>
                                </div>
                            </div>
                        </>)
                    }
                </div>
            </div>

            {/* Order Confirmation Modal */}
            <Modal show={showOrderModal} onHide={() => setShowOrderModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Your Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Delivery Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                placeholder="Enter your delivery address"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Payment Method</Form.Label>
                            <Form.Select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <option value="cod">Cash on Delivery</option>
                                <option value="card">Credit/Debit Card</option>
                                <option value="upi">UPI</option>
                            </Form.Select>
                        </Form.Group>

                        <div className="border-top pt-3">
                            <h5>Order Summary</h5>
                            <div className="d-flex justify-content-between">
                                <span>Items ({product.length})</span>
                                <span>Rs.{calculateTotal()}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Discount (10%)</span>
                                <span>-Rs.{(calculateTotal() * 0.1).toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Delivery</span>
                                <span className="text-success">Free</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between fw-bold">
                                <span>Total Amount</span>
                                <span>Rs.{(calculateTotal() * 0.9).toFixed(2)}</span>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowOrderModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handlePlaceOrder}>
                        Confirm Order
                    </Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </div>
    );
}
