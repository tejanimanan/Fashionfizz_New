import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState([]);
    // const [loginid,SetLoginId] = useState();
    const navigate = useNavigate();


    const UserLogin = (e) => {
        e.preventDefault(); // Prevent the default form submission
        // Fetch users data
        const API_URL = process.env.REACT_APP_API_URL;
        fetch(`${API_URL}user`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                // Check for matching user
                const user1 = data.find((u) => u.email === email && u.password === password);

                if (user1) {
                    // alert('Login Successful');
                    toast.success(' Login Successful', {
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
                    console.log("login id is:" + user1.id);
                    localStorage.setItem('userId', user1.id);

                    navigate('/');
                } else {
                    toast.error('Invalid credentials.', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Slide,
                    });
                    // alert('Invalid credentials. Please check email and password.');
                    // navigate('/register');
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                alert("There was an error logging in. Please try again.");
            });
    };

    // return (
    //     <div className='bg-img-login' style={{background:"url('images/loaderimg.png')",height:"100vh"}}>
    //         <div className="container">
    //             <div className="row justify-content-center">
    //                 <div className="col-lg-6">
    //                     <div className="card shadow-lg">
    //                         <div className="card-header fs-3 text-center bg-light text-dark">
    //                             <b>Login</b>
    //                         </div>
    //                         <div className="card-body text-start">
    //                             <form onSubmit={UserLogin}>
    //                                 {/* Email */}
    //                                 <div className="mb-4">
    //                                     <label htmlFor="email" className="form-label">Email address</label>
    //                                     <input
    //                                         type="email"
    //                                         className="form-control"
    //                                         id="email"
    //                                         placeholder="Enter your email"
    //                                         required
    //                                         value={email}
    //                                         onChange={(e) => setEmail(e.target.value)}
    //                                     />
    //                                 </div>

    //                                 {/* Password */}
    //                                 <div className="mb-4">
    //                                     <label htmlFor="password" className="form-label">Password</label>
    //                                     <input
    //                                         type="password"
    //                                         className="form-control"
    //                                         id="password"
    //                                         placeholder="Enter your password"
    //                                         required
    //                                         value={password}
    //                                         onChange={(e) => setPassword(e.target.value)}
    //                                     />
    //                                 </div>

    //                                 {/* Submit Button */}
    //                                 <button type="submit" className="btn btn-primary w-100 py-2">Login</button>
    //                             </form>
    //                         </div>
    //                         <div className="card-footer text-center">
    //                             <p className="mb-0">Don't have an account? <Link to="/register">Sign Up here</Link></p>
    //                             <p><a href="#">Forgot Password?</a></p>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
    return (
        <div style={{ height: "100vh" }} className="d-flex align-items-center justify-content-center">
            <ToastContainer/>
            <div className="container">
                <div className="row shadow-lg rounded overflow-hidden "  style={{
                            backgroundImage: "url('/images/Login_logo.png')",
                            objectFit: "cover",
                            backgroundPosition: "",
                            backgroundRepeat: "no-repeat",
                            width:"100%",
                            
                        }}>
                    {/* Image Side */}
                    <div
                        className="col-md-5 bg-dark"
                        style={{
                            backgroundImage: "url('/images/Login_logo.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "100%",
                            
                        }}
                    ></div>

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
