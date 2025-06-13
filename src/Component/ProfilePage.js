import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from './Footer';
import { FaPowerOff, FaShoppingBag } from 'react-icons/fa';

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    id: ''
  });
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

      const handleLogout = () => {
          // Optionally, remove other login-related data like userId
          localStorage.removeItem('userId');
          alert("logout SuccessFully")
          navigate('/login');
      };
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please login first');
      navigate('/login');
      return;
    }

    // Fetch user data
    fetch(`${API_URL}user/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load profile data');
      });

    // Fetch user orders
    fetch(`${API_URL}orders?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load orders');
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    
    fetch(`${API_URL}user/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => {
      if (res.ok) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
      } else {
        throw new Error('Failed to update profile');
      }
    })
    .catch(error => {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    });
  };

  const renderOrders = () => (
    <Card className="p-4 shadow-lg text-start mb-5">
      <h5 className="mb-3 fw-bold">My Orders</h5>
      <div style={{ maxHeight: 600, minHeight: 200, overflowY: 'auto' }}>
        {orders.length > 0 ? (
          orders.map((order, idx) => (
            <Card key={order.id} className="mb-3 p-3 m-3 border-0 shadow-lg bg-light ">
              <Row>
                {/* <Col md={2}>
                  <div className="bg-light rounded p-2 text-center">
                 
                    <i className="fas fa-shopping-bag fa-2x text-primary"></i>
                  </div>
                </Col> */}
                <Col md={10}>
                  <h6>Order #{order.id}</h6>
                  <p className="text-muted mb-1">
                    {order.items.length} items
                  </p>
                  <small className={`fw-semibold ${
                    order.status === 'Delivered' ? 'text-success' : 
                    order.status === 'Cancelled' ? 'text-danger' : 
                    'text-warning'
                  }`}>
                    ● {order.status}
                  </small>
                  <p className="mb-0 text-muted">
                    Order Date: {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <p className="mb-0 text-muted">
                    Payment Method: {order.paymentMethod.toUpperCase()}
                  </p>
                  <p className="mb-0 text-muted">
                    Delivery Address: {order.deliveryAddress}
                  </p>
                </Col>
                <Col md={2} className="text-end">
                  <div className="fw-bold">Rs.{order.totalAmount}</div>
                  <small className="text-muted">Total Amount</small>
                </Col>
              </Row>
              <hr />
              <div className="mt-2">
                <h6 className="mb-2">Order Items:</h6>
                {order.items.map((item, index) => (
                  <div key={index} className="d-flex align-items-center mb-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 6, marginRight: 10 }}
                    />
                    <span className="me-2">{item.name}</span>
                    <span className="ms-auto">Qty: {item.quantity}</span>
                    <span className="ms-3">Rs.{item.price}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-5">
            <i className="fas fa-shopping-bag fa-3x text-muted mb-3"></i>
            <h5>No Orders Yet</h5>
            <p className="text-muted">You haven't placed any orders yet.</p>
          </div>
        )}
      </div>
    </Card>
  );

  const renderProfile = () => (
    <Card className="p-4 shadow-sm mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Personal Information</h5>
        {
          (!isEditing)?
           <Button 
          variant={isEditing ? "success" : "primary"} 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
          :""
        }
      </div>
      <Form onSubmit={handleUpdateProfile}>
        <Row className="mb-3 text-start">
          <Col md={6}>
            <Form.Label>Name</Form.Label>
            <Form.Control 
              name="name"
              value={user.name} 
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
              name="email"
              value={user.email} 
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Col>
        </Row>
        <Row className="mb-3 text-start">
          <Col md={6}>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control 
              name="phone"
              value={user.phone} 
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Address</Form.Label>
            <Form.Control 
              name="address"
              value={user.address} 
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Col>
        </Row>
        {isEditing && (
          <Button type="submit" variant="success" className="mt-3">
            Save Changes
          </Button>
        )}
      </Form>
    </Card>
  );

  return (
    <div >
      <NavBar/>
      <Container className="mt-5">
        <Row>
          {/* Sidebar */}
          <Col md={3}>
            <Card className="mb-3 shadow-sm">
              <Card.Body className="text-center">
                <div className="rounded-circle bg-primary text-white d-inline-flex justify-content-center align-items-center" style={{ width: 60, height: 60, fontSize: 24 }}>
                  {user.name ? user.name[0].toUpperCase() : ''}
                </div>
                <h6 className="mt-2">Hello,</h6>
                <h5>{user.name}</h5>
              </Card.Body>
            </Card>

            <ListGroup className="shadow-sm">
              <ListGroup.Item action onClick={() => setActiveSection('orders')}>MY ORDERS <span className='px-2'><FaShoppingBag size={18} color="blue" /></span></ListGroup.Item>
              <ListGroup.Item><b>ACCOUNT SETTINGS</b></ListGroup.Item>
              <ListGroup.Item className="ps-4 text-primary" action onClick={() => setActiveSection('profile')}>Profile Information</ListGroup.Item>
              <ListGroup.Item className="ps-4 text-primary" action onClick={() => handleLogout()}>LogOut<span className='px-2'><FaPowerOff size={18} color="blue" /></span> </ListGroup.Item>
              <ListGroup.Item className="ps-4 text-danger" action onClick={() => handleLogout()}>Delete Account</ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Main Section */}
          <Col md={9}>
            {activeSection === 'orders' ? renderOrders() : renderProfile()}
          </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  );
};

export default ProfilePage;
