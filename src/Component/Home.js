import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Link } from 'react-router-dom'
// import FullShop from './FullShop'
// import Shop from './Shop'
import AllProduct from './AllProduct'

export default function Home() {
  useEffect(()=>{
    const userId = localStorage.getItem('userId');
    console.log(userId);

  },[])
  return (
    <div>
      <div className='fixed-top top-0 text-white ' >
      <NavBar />
      </div>
      <section className="carousel slide mt-5" id="carouselExampleSlidesOnly" data-bs-ride="carousel">
        <div className="carousel-inner" style={{height:"500px"}}>
          {/* First Slide */}
          <div className="carousel-item active" style={{ "backgroundImage": "url('images/slide-01.jpg')", "backgroundSize": "cover", "backgroundPosition": "center", "height": "100vh" }}>
            <div className="container  h-100">
              <div className="d-flex justify-content-start h-100">
                <div style={{ top: "300px", left: "-500px" }} className="carousel-caption    d-none d-md-block">
                  <span className="h4 text-dark">Women Collection 2025</span>
                  <h1 className="text-dark mb-3 mt-3">NEW SEASON</h1>
                  <Link to={'/shop/women'} className="btn btn-primary rounded-pill px-5">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Second Slide */}
          <div className="carousel-item active" style={{ "backgroundImage": "url('images/slide-02.jpg')", "backgroundSize": "cover", "backgroundPosition": "center", "height": "100vh" }}>
            <div className="container  h-100">
              <div className="d-flex justify-content-start h-100">
                <div style={{ top: "300px", left: "-500px" }} className="carousel-caption    d-none d-md-block">
                  <span className="h4 text-dark">Men New SEASON 2025</span>
                  <h1 className="text-dark mb-3 mt-3 uppercase">jackets &  Coats</h1>
                  <Link to={'/shop/men'} className="btn btn-primary rounded-pill px-5">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Third Slide */}
          <div className="carousel-item active" style={{ "backgroundImage": "url('images/slide-03.jpg')", "backgroundSize": "cover", "backgroundPosition": "center", "height": "100vh" }}>
            <div className="container  h-100">
              <div className="d-flex justify-content-start h-100">
                <div style={{ top: "300px", left: "-500px" }} className="carousel-caption    d-none d-md-block">
                  <span className="h4 text-dark">Men Collection 2025</span>
                  <h1 className="text-dark mb-3 mt-3">NEW ARRVIVELS</h1>
                  <Link to={'/shop/men'} className="btn btn-primary rounded-pill px-5">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Controls (Optional) */}
        <button className="carousel-control-prev text-dark" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="prev">
          <span className="carousel-control-prev-icon bg-dark" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next text-dark" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="next">
          <span className="carousel-control-next-icon bg-dark" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </section>
      <div className="sec-banner" style={{background:"linear-gradient(to right,rgb(106, 115, 124),rgb(200, 213, 226))"}} >
        <div className="container ">
          <div className="row">
            {/* Block 1: Women */}
            <div className="col-md-6 col-xl-4 mb-4  ">
              <div className="position-relative block1">
                <img src="images/banner-01.jpg" alt="Women Collection" className="img-fluid border-4 border-primary border rounded-5" />
                <div className="block1-txt">
                  <h5 className="text-white mb-1">Women</h5>
                  <p className="text-white mb-2">Spring 2025</p>
                  <Link to={'/shop/women'} className="btn btn-light">Shop Now</Link>
                </div>
              </div>
            </div>
            {/* Block 2: Men */}
            <div className="col-md-6 col-xl-4 mb-4 ">
              <div className="position-relative block1">
                <img src="images/banner-02.jpg" alt="Men Collection" className="img-fluid border-4 border-primary border rounded-5" />
                <div className="block1-txt">
                  <h5 className="text-white">Men</h5>
                  <p className="text-white mb-2">Spring 2025</p>
                  <Link to={'/shop/men'} className="btn btn-light">Shop Now</Link>
                </div>
              </div>
            </div>
            {/* Block 3: Accessories */}
            <div className="col-md-6 col-xl-4 mb-4">
              <div className="position-relative block1">
                <img src="images/banner-06.jpg" alt="Accessories" className="img-fluid border-4 border-primary border rounded-5" />
                <div className="block1-txt">
                  <h5 className="text-white">Accessories</h5>
                  <p className="text-white mb-2">New Trend</p>
                  <Link to={'/shop/bag'} className="btn btn-light">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid  '>
        <div className=' mb-4  pb-4'>
            <h1 className='fw-bold text-uppercase pt-3'>Product Overview  </h1>
            <AllProduct />
        </div>
      </div>
      <Footer />
    </div>
  )
}
