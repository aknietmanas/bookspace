import React, { useState } from "react";
import "../styles/LoginModal.css";

const LoginModal = ({ onClose, onLogin }) => {
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (name.trim()) {
      onLogin({ name });
      onClose();
    } else {
      alert("Введите имя!");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Вход</h2>
        <input
          type="text"
          placeholder="Введите ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleLogin} className="btn-login">Войти</button>
          <button onClick={onClose} className="btn-cancel">Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
