import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { Bounce, Slide, toast, ToastContainer } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItemQuantity, removeCartItem, clearUserCart } from '../redux/cartSlice';
import { api } from '../services/api';

export default function Cart() {
    const dispatch = useDispatch();
    const { items: product, status, error } = useSelector((state) => state.cart);
    const [cartQuantities, SetCartQuantities] = useState({});
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    // Load cart items and user data when component is mounted
    useEffect(() => {
        if (userId) {
            dispatch(fetchCart(userId));

            // Fetch user data for address
            api.getUserById(userId)
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
    }, [userId, navigate, dispatch]);

    // Update local quantities state when Redux cart items change
    useEffect(() => {
        const initialQuantities = {};
        product.forEach(item => {
            initialQuantities[item.id] = item.quantity || 1;
        });
        SetCartQuantities(initialQuantities);
    }, [product]);

    // Handle increment and decrement of product quantity
    const handleQuantityChange = (id, increment) => {
        const currentQuantity = cartQuantities[id];
        let newQuantity = currentQuantity + (increment ? 1 : -1);

        if (newQuantity < 1) {
            newQuantity = 1;
        }

        const itemToUpdate = product.find(p => p.id === id);
        if (itemToUpdate) {
            dispatch(updateCartItemQuantity({ itemId: id, quantity: newQuantity, currentItem: itemToUpdate }));
        }
    };

    // Calculate the total price of the cart
    const calculateTotal = () => {
        return product.reduce((total, item) => {
            const itemTotal = item.price * (cartQuantities[item.id] || 1);
            return total + itemTotal;
        }, 0).toFixed(2);
    };

    const Ondelete = (id) => {
        dispatch(removeCartItem(id));
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
    };

    const handlePlaceOrder = async () => {
        if (!deliveryAddress.trim()) {
            toast.error('Please enter delivery address');
            return;
        }

        // Create order object
        const order = {
            userId: userId,
            items: product.map(item => ({
                productId: item.productId,
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

        try {
            const response = await api.addOrder(order);
            if (response) {
                await dispatch(clearUserCart(userId));
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
                navigate('/profile');
            } else {
                toast.error('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    if (status === 'loading') {
        return (
            <div className=''>
                <NavBar />
                <div className="container py-5 ">
                    <div>Loading cart...</div>
                </div>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className=''>
                <NavBar />
                <div className="container py-5 ">
                    <div>Error: {error}</div>
                </div>
            </div>
        );
    }

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
                        </div>
                        <Link to="/" className="btn btn-secondary mt-3">Continue Shopping</Link>
                        </>) : (<> <div className='my-5 py-5'>
                            <h3 className='py-5'>Your Cart Is Empty</h3>
                            <Link to="/" className='btn btn-primary'>Go To Shop</Link>
                        </div> </>)
                    }
                </div>
            </div>

            {/* Order Modal */}
            <Modal show={showOrderModal} onHide={() => setShowOrderModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Place Your Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Delivery Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter delivery address"
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Payment Method</Form.Label>
                            <div>
                                <Form.Check
                                    type="radio"
                                    label="Cash on Delivery (COD)"
                                    name="paymentMethod"
                                    id="cod"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Online Payment (Coming Soon)"
                                    name="paymentMethod"
                                    id="online"
                                    value="online"
                                    checked={paymentMethod === 'online'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    disabled
                                />
                            </div>
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                            <strong>Total Amount:</strong>
                            <span>Rs.{(calculateTotal() * 0.9).toFixed(2)}</span>
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
        </div>
    );
}
