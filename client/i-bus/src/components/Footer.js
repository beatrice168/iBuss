import React from 'react';
import './Footer.css'; // Import your custom CSS file for styling

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Remove the container if you want to extend the Footer to full width. */}
      
        {/* Footer */}
        <footer className="text-center text-lg-start text-white" style={{ backgroundColor: '#1c2331' }}>
          {/* Section: Social media */}
          <section className="d-flex justify-content-between p-4" style={{ backgroundColor: '#0041EA' }}>
            {/* Left */}
            <div className="me-5">
              <span>Get connected with us on social networks:</span>
            </div>
            {/* Left */}

            {/* Right */}
            <div>
              <a href="#" className="text-white me-4">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white me-4">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white me-4">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="text-white me-4">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white me-4">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-white me-4">
                <i className="fab fa-github"></i>
              </a>
            </div>
            {/* Right */}
          </section>
          {/* Section: Social media */}

          {/* Section: Links */}
          <section>
            <div className="container text-center text-md-start mt-5">
              {/* Grid row */}
              <div className="row mt-3">
                {/* Grid column */}
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  {/* Content */}
                  <h6 className="text-uppercase fw-bold">I-BUS BOOKING</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                  <p>
                  Welcome to i-Bus Booking, your one-stop online platform for hassle-free bus reservations. We aim to simplify your travel experience by providing a seamless and efficient way to book bus tickets to your preferred destinations.
                  </p>
                </div>
                {/* Grid column */}

                {/* Grid column */}
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold">Benefits</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                  <p>
                    <a href="#!" className="text-white">Seamless Booking: </a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">Comfort and Convenience:</a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">Easy Payment</a>
                  </p>
                  <p>
                    <a href="#!" className="Responsive Design">Responsive Design</a>
                  </p>
                </div>
                {/* Grid column */}

                {/* Grid column */}
                {/* <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4"> */}
                  {/* Links */}
                  {/* <h6 className="text-uppercase fw-bold">Useful links</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                  <p>
                    <a href="#!" className="text-white">Your Account</a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">Become an Affiliate</a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">Shipping Rates</a>
                  </p>
                  <p>
                    <a href="#!" className="text-white">Help</a>
                  </p>
                </div> */}
                {/* Grid column */}

                {/* Grid column */}
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold">Contact</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                  <p><i className="fas fa-home mr-3"></i> Ngong road Nairobi Kenya</p>
                  <p><i className="fas fa-envelope mr-3"></i> ibus@gmail.com</p>
                  <p><i className="fas fa-phone mr-3"></i> 0710345785</p>
                  
                </div>
                {/* Grid column */}
              </div>
              {/* Grid row */}
            </div>
          </section>
          {/* Section: Links */}

          {/* Copyright */}
          <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            © 2023 Copyright:
            <a className="text-white" href="https://mdbootstrap.com/">Ibus-bookig.com</a>
          </div>
          {/* Copyright */}
        </footer>
        {/* Footer */}
     
      {/* End of .container */}
    </footer>
  );
};

export default Footer;
