import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Book Finder. Все права защищены.</p>
    </footer>
  );
};

export default Footer;
