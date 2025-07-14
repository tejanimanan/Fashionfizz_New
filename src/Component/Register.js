import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Register() {
    const navigate = useNavigate()
    const [name, SetName] = useState()
    const [email, SetEmail] = useState()
    const [password, Setpass] = useState()
    const [conPass, SetConPass] = useState()
    const [phone, SetPhone] = useState()
    const [address, SetAddress] = useState()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password validation regex (at least 6 chars, 1 special char, 1 digit)
    // const passwordRegex = /^(?=.[0-9])(?=.[!@#$%^&])[A-Za-z0-9!@#$%^&]{6,}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&])[A-Za-z0-9!@#$%^&]{6,}$/;

    const data = [];

    const HandleSubmit = (e) => {
        e.preventDefault()

            // Validations
            if (!name.trim()) {
                alert("Enter First Name");
                return;
            }
            if (!email.trim()) {
                alert("Enter Email");
                return;
            }
            if (!emailRegex.test(email)) {
                alert("Enter a valid Email");
                return;
            }
            if (!password.trim()) {
                alert("Enter Password");
                return;
            }
            // if (!passwordRegex.test(password)) {
            //     console.log(password)
            //     alert("Password must be at least 6 characters, contain 1 special character & 1 number");
            //     return;
            // }

            // Prepare data for submission
            const dataobj = { name: name, email: email, password: password, phone: phone, address: address };

            // Send POST request
            fetch(`http://localhost:5000/api/user/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataobj),
            })
                .then((res) => {
                    if (res.ok) {
                        navigate("/login");
                    }
                });
        
    }

    return (
        <div className='bg-img p-5'>
            <div className='container mt-5'>
                <div className='row mb-5'>

                </div>
            </div>
            <div className="container pb-5  mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-header text-center">
                                <h4>Register</h4>
                            </div>
                            <div className="card-body text-start">
                                <form onSubmit={HandleSubmit}>
                                    {/* Name */}
                                    <div className='row justify-content-center'>
                                        <div className="mb-3 col-lg-5">
                                            <label htmlFor="fullName" className="form-label">Full Name</label>
                                            <input value={name} onChange={(e) => SetName(e.target.value)} type="text" className="form-control" id="fullName" placeholder="Enter your full name" required />
                                        </div>
                                        {/* Email */}
                                        <div className="mb-3 col-lg-5">
                                            <label htmlFor="email" className="form-label">Email address</label>
                                            <input value={email} onChange={(e) => SetEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="Enter your email" required />
                                        </div>
                                    </div>
                                    {/* Password */}
                                    <div className='row justify-content-center'>
                                        <div className="mb-3 col-lg-5">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input value={password} onChange={(e) => Setpass(e.target.value)} type="password" className="form-control" id="password" placeholder="Create a password" required />
                                        </div>
                                        {/* Confirm Password */}
                                        <div className="mb-3 col-lg-5">
                                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                            <input value={conPass} onChange={(e) => SetConPass(e.target.value)} type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password" required />
                                        </div>
                                    </div>
                                    {/* Phone */}
                                    <div className='row justify-content-center'>
                                        <div className="mb-3 col-lg-5">
                                            <label htmlFor="phone" className="form-label">Phone Number</label>
                                            <input value={phone} onChange={(e) => SetPhone(e.target.value)} type="tel" className="form-control" id="phone" placeholder="Enter your phone number" />
                                        </div>
                                        {/* Address */}
                                        <div className="mb-3 col-lg-5">
                                            <label htmlFor="address" className="form-label">Shipping Address</label>
                                            <input value={address} onChange={(e) => SetAddress(e.target.value)} type="text" className="form-control" id="address" placeholder="Enter your address" />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button type="submit" className="btn btn-primary w-100 my-3">Register</button>
                                </form>
                            </div>
                            <div className="card-footer text-center">
                                <p>Already have an account? <Link to="/login">Login here</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
