import React from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import Footer from './Footer'

export default function Contact() {
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
            <img style={obj} src="images/bg-02.jpg" className='' alt="no" />
            <div style={obj2} className='z-0 '>
              <h1 className="fw-bold marcellus-regular">Contact</h1>
            </div>
          </div>

        </div>
        <div>
          <section className="bg-light pt-5 pb-5">
            <div className="container">
              <div className="d-flex row">
                <div className=" col-lg-6 border text-start border-2 ps-4 pt-5 pb-4">
                  <form>
                    <h4 className=" text-center pb-3">
                      Send Us A Message
                    </h4>
                    <div className=" mb-2 text-start">
                      <input className="form-control" type="text" name="email" placeholder="Your Email Address" />
                    </div>
                    <div className="bor8 m-b-30">
                      <textarea className="form-control" rows={5} name="msg" placeholder="How Can We Help?" defaultValue={""} />
                    </div>
                    <button className="btn btn-dark  fw-semibold text-white rounded-pill w-100  mt-3">
                      SUBMIT
                    </button>
                  </form>
                </div>
                <div className=" col-lg-6 border border-2 text-start    p-5 ">
                  <div className="d-flex w-full p-b-42">
                    <span className="pe-3">
                      <i className="fa-solid fa-location-dot"></i>
                    </span>
                    <div className="size-212 p-t-2">
                      <h4 className="">
                        Address
                      </h4>
                      <p className="">
                        Jambala,Sihor, Bhavanagar, Gujarat 364240 IN
                      </p>
                    </div>
                  </div>
                  <div className="d-flex pb-4">
                    <span className=" pt-2 pe-3 text-center">
                      <i className="fa-solid fa-phone"></i>
                    </span>
                    <div className=" pt-2">
                      <h4 className="">
                        Lets Talk
                      </h4>
                      <p className="pt-2">
                        +91 9898666545
                      </p>
                    </div>
                  </div>
                  <div className="d-flex ">
                    <span className="text-center pe-3 mt-2">
                      <i className="fa-solid fa-envelope"></i>
                    </span>
                    <div className="mt-1">
                      <h4 className="mtext-110 cl2">
                        Sale Support
                      </h4>
                      <p className="mt-2">
                        tejanimanan444.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Map */}
          <div className="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14834.65718328194!2d71.95643624656394!3d21.638001310582105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f55155703741d%3A0x5e69e6d632be83c9!2z4Kqc4Kq-4KqC4Kqs4Kqz4Kq-LCDgqpfgq4HgqpzgqrDgqr7gqqQ!5e0!3m2!1sgu!2sin!4v1738315711673!5m2!1sgu!2sin" width="600" height="450" className='w-100' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}
