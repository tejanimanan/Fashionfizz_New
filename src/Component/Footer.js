import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className='mt-5'>
            <div className='container-fluid bg-dark'>
                <div className='row offset-1 p-5  text-white'>
                    <div className='col-lg-2 text-start'>
                        <h4 className='fw-bold pb-3 mt-3 pt-4'>Categories</h4>
                        <Link to={'/shop/women'} className='d-block text-decoration-none mb-2 text-white-50'>Women</Link>
                        <Link to={'/shop/men'} className='d-block text-decoration-none mb-2 text-white-50'>Men</Link>
                        <Link to={'/shop/Accessories'} className='d-block text-decoration-none mb-2 text-white-50'>Bag</Link>
                        <Link to={'/shop'} className='d-block text-decoration-none mb-2 text-white-50'>Shose</Link>
                        <Link to={'/shop/Accessories'} className='d-block text-decoration-none mb-2 text-white-50'>Watch</Link>
                    </div>
                    <div className='col-lg-2 text-start'>
                        <h4 className='fw-bold pb-3 mt-3 pt-4'>Help</h4>
                        <p className='text-white-50'>Track order</p>
                        <p className='text-white-50'>Return</p>
                        <p className='text-white-50'>Shiping</p>
                        <p className='text-white-50'>FAQs</p>

                    </div>
                    <div className='col-lg-3'>
                        <h4 className='fw-bold pb-3 mt-3 pt-4 text-start'> GET IN TOUCH </h4>
                        <p className='text-white-50 text-start' >Any questions? Let us know in store at Jambala,Sihor, Bhavanagar, Gujarat 364240 IN or call us on (+91) 9898666545 </p>
                       
                    </div>
                    <div className='col-lg-3 text-start text-white ms-5'>
                        <h4 className='fw-bold pb-3 mt-3 pt-4 text-start'>Newsletter</h4>
                        <input className='form-control' type='email' placeholder='email@example.com'></input>
                        <button className='btn btn-primary rounded-pill my-3 w-50 px-4 py-2 fw-bolder'>SUBSCRIBE</button>
                    </div>
                </div>
                <div className='row    text-white'>
                    <div className='col-lg-12 text-center'>
                            <p className=''>
                            Copyright ©2025 All rights reserved | Made with <i className="fa-solid fa-heart" style={{color: "#ff0000"}}></i> by Manan & distributed by Patel&Patel
                            </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
