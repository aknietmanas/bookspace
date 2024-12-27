import React from "react";
import "../styles/Header.css";

const Header = ({ user, onLoginClick, onLogout }) => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>Book Finder</h1>
      </div>
      <nav className="header-nav">
        <a href="#home">Главная</a>
        <a href="#favorites">Избранные</a>
      </nav>
      <div className="header-user">
        {user ? (
          <>
            <span className="user-name">Привет, {user.name}!</span>
            <button onClick={onLogout} className="btn-logout">Выйти</button>
          </>
        ) : (
          <button onClick={onLoginClick} className="btn-login">Войти</button>
        )}
      </div>
    </header>
  );
};

export default Header;
