// ./components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.jpg";
import "../styles/Header.css";

const Header = ({ user, openModal, onLogout }) => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="Logo" className="logo" />
        <h1>BookSpace</h1>
      </div>
      <nav className="header-nav"></nav>
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
