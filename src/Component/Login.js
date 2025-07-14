import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const UserLogin = (e) => {
        e.preventDefault();
        const API_BASE_URL = process.env.REACT_APP_API_URL;
        fetch(`https://fashionfizzbackend.onrender.com/api/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.user) {
                toast.success('Login Successful', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    theme: "dark",
                    transition: Slide,
                });
                console.log("login user==",data.user)
                localStorage.setItem('userId', data.user.id); // Store user ID
                if(data.user.role == "customer"){

                    navigate('/'); // Redirect to home or dashboard
                }
                else{
                    navigate('/admin/dashboard')
                }
            } else {
                toast.error(data.message || 'Invalid credentials.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    theme: "dark",
                    transition: Slide,
                });
            }
        })
        .catch((error) => {
            console.error("Login Error:", error);
            toast.error('Something went wrong. Please try again.', {
                position: "top-right",
                autoClose: 2000,
                theme: "dark",
                transition: Slide,
            });
        });
    };

    return (
        <div style={{ height: "100vh" }} className="d-flex align-items-center justify-content-center">
            <ToastContainer />
            <div className="container">
                <div className="row shadow-lg rounded overflow-hidden"
                    style={{
                        backgroundImage: "url('/images/Login_logo.png')",
                        objectFit: "cover",
                        backgroundRepeat: "no-repeat",
                        width: "100%",
                    }}>
                    {/* Image Side */}
                    <div className="col-md-5 bg-dark"
                        style={{
                            backgroundImage: "url('/images/Login_logo.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "100%",
                        }}>
                    </div>

                    {/* Form Side */}
                    <div className="col-md-7 bg-white p-5">
                        <h3 className="text-center mb-4"><b>Login</b></h3>
                        <form onSubmit={UserLogin}>
                            <div className="mb-4 text-start">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter your email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4 text-start">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter your password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 py-2">Login</button>
                        </form>
                        <div className="text-center mt-3">
                            <p className="mb-0">Don't have an account? <Link to="/register">Sign Up here</Link></p>
                            <p><a href="#">Forgot Password?</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
