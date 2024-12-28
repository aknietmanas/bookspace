// ./components/Header.js
import React from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/Header.css";

const Header = ({ user, openModal, onLogout }) => {
    const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-logo">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>Book Finder</h1>
      </div>
      <nav className="header-nav">
        <button className="header-button" onClick={() => navigate('/')}>Главная</button>
        <button className="header-button" onClick={() => navigate('/favorites')}>Избранное</button>
      </nav>
      <div className="header-user">
        {user ? (
          <>
            <button onClick={onLogout} className="btn-logout">Выйти</button>
          </>
        ) : (
          <button onClick={openModal} className="btn-login">Войти</button>
        )}
      </div>
    </header>
  );
};

export default Header;