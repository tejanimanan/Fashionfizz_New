import React, { useRef, useState } from 'react';
import { FaLockOpen, FaShoppingCart, FaUser, FaUserPlus } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.removeItem('userId');
    alert("Logout successfully");
    navigate('/login');
  };

  const toggleMenu = () => {
    if (menuRef.current) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{ background: "linear-gradient(to right, #4b6cb7, #182848)" }}>
        <div className="container-fluid shadow p-2 sticky-top">
          <Link to="/" className="text-dark text-decoration-none fw-bold">
            <img src="images/Fashionfizz_logo.png" alt="IMG-LOGO" width="100px" height="70px" />
          </Link>

          {/* Custom Toggle Button */}
          <button onClick={toggleMenu} className="navbar-toggler bg-white" type="button">
            <span className="navbar-toggler-icon" />
          </button>

          {/* Collapsible Menu */}
          <div
            ref={menuRef}
            className="navbar-collapse"
            style={{ display: isMenuOpen ? 'block' : 'none' }}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {['/', '/shop', '/about', '/contact'].map((path, index) => {
                const labels = ['Home', 'Shop', 'About', 'Contact'];
                return (
                  <li className="nav-item" key={path}>
                    <NavLink
                      to={path}
                      className="nav-link btn fs-4 ms-4"
                      style={({ isActive }) => ({
                        color: isActive ? '#ffffff' : '#ffd700',
                        fontFamily: isActive ? 'cursive' : 'fantasy',
                      })}
                      onClick={closeMenu}
                    >
                      {labels[index]}
                    </NavLink>
                  </li>
                );
              })}
            </ul>

            <div className="d-flex justify-content-start">
              {userId && (
                <Link to="/profile" className="btn btn-link position-relative">
                  <FaUser size={24} color="white" />
                </Link>
              )}

              {!userId && (
                <div className="nav-item">
                  <NavLink
                    to="/register"
                    className="nav-link fs-4 ms-4"
                    onClick={closeMenu}
                  >
                    <FaUserPlus size={22} color="white" />
                  </NavLink>
                </div>
              )}

              <Link to="/cart" className="btn btn-link position-relative" onClick={closeMenu}>
                <FaShoppingCart size={24} color="white" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
