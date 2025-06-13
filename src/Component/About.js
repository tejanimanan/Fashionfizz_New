import React from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import Footer from './Footer'

export default function About() {
  let obj = {
    filter: "brightness(0.6)",
    height: "40vh",
    width: "100%",
    position: "relative"
  }

  let obj2 = {
    position: "absolute",
    top: "200px",
    left: "700px",
    textAlign: "center",
    color: "#fff"
  }
  return (
    <div className=''>
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <img style={obj} src="images/bg-01.jpg" className='' alt="no" />
            <div style={obj2} className='z-0 '>
              <h1 className="fw-bold marcellus-regular">About</h1>
            </div>
          </div>

        </div>
        <div className='row justify-content-center ms-5'>
          <div className="card mb-3 mt-5 border-0" style={{ "maxWidth": "1500px" }}>
            <div className="row g-0 mt-5 justify-content-center">
              <div className="col-lg-6">
                <div className="card-body">
                  <h3 className="card-title text-start fw-bold">Our Story</h3>
                  <p className="card-text text-start text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat consequat enim, non auctor massa ultrices non. Morbi sed odio massa. Quisque at vehicula tellus, sed tincidunt augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas varius egestas diam, eu sodales metus scelerisque congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas gravida justo eu arcu egestas convallis. Nullam eu erat bibendum, tempus ipsum eget, dictum enim. Donec non neque ut enim dapibus tincidunt vitae nec augue. Suspendisse potenti. Proin ut est diam. Donec condimentum euismod tortor, eget facilisis diam faucibus et. Morbi a tempor elit</p>
                  <p className="card-text text-start text-muted">
                    Donec gravida lorem elit, quis condimentum ex semper sit amet. Fusce eget ligula magna. Aliquam aliquam imperdiet sodales. Ut fringilla turpis in vehicula vehicula. Pellentesque congue ac orci ut gravida. Aliquam erat volutpat. Donec iaculis lectus a arcu facilisis, eu sodales lectus sagittis. Etiam pellentesque, magna vel dictum rutrum, neque justo eleifend elit, vel tincidunt erat arcu ut sem. Sed rutrum, turpis ut commodo efficitur, quam velit convallis ipsum, et maximus enim ligula ac ligula.
                  </p>
                </div>
              </div>
              <div className="col-lg-5">
                <img src="images/about-01.jpg" width="400px" className="img-fluid  rounded-start" alt="..." />
              </div>
            </div>
          </div>

        </div>
        <div className='row mb-5 justify-content-center'>
          <div className="card mb-3 mt-5 border-0" style={{ "maxWidth": "1500px" }}>
            <div className="row g-0 mt-5 ">
              <div className="col-lg-5">
                <img src="images/about-02.jpg" width="400px" className="img-fluid  rounded-start" alt="..." />
              </div>
              <div className="col-lg-6">
                <div className="card-body">
                  <h3 className="card-title text-start fw-bold">Our Mission </h3>
                  <p className="card-text text-start text-muted">Mauris non lacinia magna. Sed nec lobortis dolor. Vestibulum rhoncus dignissim risus, sed consectetur erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam maximus mauris sit amet odio convallis, in pharetra magna gravida. Praesent sed nunc fermentum mi molestie tempor. Morbi vitae viverra odio. Pellentesque ac velit egestas, luctus arcu non, laoreet mauris. Sed in ipsum tempor, consequat odio in, porttitor ante. Ut mauris ligula, volutpat in sodales in, porta non odio. Pellentesque tempor urna vitae mi vestibulum, nec venenatis nulla lobortis. Proin at gravida ante. Mauris auctor purus at lacus maximus euismod. Pellentesque vulputate massa ut nisl hendrerit, eget elementum libero iaculis.</p>
                  <p className="card-text text-start text-muted text-italic">
                    Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while. ~Steve Job’s
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  )
}
