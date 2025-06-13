import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

// Placeholder image URLs
const Allproduct = 'https://media.istockphoto.com/id/1345105965/photo/beautiful-female-customer-using-3d-augmented-reality-digital-interface-in-modern-shopping.webp?a=1&b=1&s=612x612&w=0&k=20&c=7u_VjqtRpDjasAIC-dPhuZH1ptiPZ0db4bVeNV3F_so=';
const womenImg = 'https://images.unsplash.com/photo-1698815614885-97a1b2d29669?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29tZW4lMjBjbG90aHxlbnwwfHwwfHx8MA%3D%3D';
const menImg = 'https://media.istockphoto.com/id/1041286698/photo/row-of-mens-shirts-in-blue-colors-on-hanger.webp?a=1&b=1&s=612x612&w=0&k=20&c=4FrWv1JyRRHRuKNqtrFOGcu1v9qgY68BD_hFJrDVjVA=';
const bagImg = 'https://images.unsplash.com/photo-1515940175183-6798529cb860?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFRyZW5kaW5nJTIwR2FkZ2V0cyUyMCUyNiUyMEFwcGxpYW5jZXMlMjBzaG9waW5nfGVufDB8fDB8fHww';

export default function FullShop() {
    return (
        <div className='' style={{ background: "linear-gradient(to right, #f8f9fa, #e9ecef)" }}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <div className="container  p-2 sticky-top">

                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button> */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink style={({ isActive }) => ({ color: isActive ? "dark" : "gray", fontFamily: isActive ? "cursive" : "fantasy" })} className="nav-link   fs-5 ms-3 nav-hover " aria-current="page" to="/shop">
                                    <img src={Allproduct} alt="Women" className="nav-img-card me-2 d-block " />
                                    All Product
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink style={({ isActive }) => ({ color: isActive ? "red" : "gray", fontFamily: isActive ? "cursive" : "fantasy", textDecoration: isActive ? "underline" : "", fontSize: isActive ? "26px" : "18px" })} className="nav-link ms-3 nav-hover " to="/shop/women">
                                    <img src={womenImg} alt="Women" className="nav-img-card me-2 d-block " />
                                    Women
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink style={({ isActive }) => ({ color: isActive ? "red" : "gray", fontFamily: isActive ? "cursive" : "fantasy", textDecoration: isActive ? "underline" : "", fontSize: isActive ? "26px" : "18px" })} className="nav-link  ms-3 nav-hover" to="/shop/men"  >
                                    <img src={menImg} alt="Men" className="nav-img-card me-2 d-block" />
                                    Men
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink style={({ isActive }) => ({ color: isActive ? "red" : "gray", fontFamily: isActive ? "cursive" : "fantasy", textDecoration: isActive ? "underline" : "", fontSize: isActive ? "26px" : "18px" })} className="nav-link  ms-3 nav-hover" to="/shop/Accessories"  >
                                    <img src={bagImg} alt="Bag" className="nav-img-card me-2 d-block" />
                                    Accessories
                                </NavLink>
                            </li>
                        </ul>

                        {/* <div className="d-flex justify-content-center ">
                            <button className="btn btn-link d-flex" type="button" >
                                <input type='search' placeholder='Search Product...' className='form-control'></input>

                            </button>
                        </div> */}
                    </div>

                </div>
            </nav>

            <div className='p-4 bg-light'>
                <Outlet></Outlet>
            </div>

        </div>
    )
}
