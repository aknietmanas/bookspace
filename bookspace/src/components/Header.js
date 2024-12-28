// ./components/Header.js
import React from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/Header.css";

const Header = ({ user, openModal, onLogout }) => {
    const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-logo">
        <img src="../img/logo.jpg" alt="Logo" className="logo" />
        <h1>Book Finder</h1>
      </div>
      <nav className="header-nav">
        <div className="menu-item" onClick={() => navigate('/')}>Main</div>
        <div className="menu-item" onClick={() => navigate('/favorites')}>Favorites</div>
      </nav>
      <div className="header-user">
        {user ? (
          <>
            <button onClick={onLogout} className="btn-logout">Log out</button>
          </>
        ) : (
          <button onClick={openModal} className="btn-login">Sign in</button>
        )}
      </div>
    </header>
  );
};

export default Header;