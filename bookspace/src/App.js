// src/App.js
import React, { useState } from 'react';
import { registerUser, loginUser, getFavorites, addFavorite, removeFavorite } from './api';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import FilterPanel from './components/FilterPanel';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from './components/Modal';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ author: '', category: '' });
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [userInput, setUserInput] = useState({ email: '', username: '', password: '' });
  const [error, setError] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchBooks = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (book) => {
    if (!user) {
      alert("Log in to add books to your favorites.");
      return;
    }

    try {
      const existingFavorite = favorites.find((fav) => fav.bookId === book.id);

      if (existingFavorite) {
        await removeFavorite(existingFavorite.id);
        setFavorites((prev) => prev.filter((fav) => fav.bookId !== book.id));
      } else {
        const newFavorite = await addFavorite(user.id, book);
        setFavorites((prev) => [...prev, { bookId: book.id, ...newFavorite }]);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      alert("Couldn't update favorites. Try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLoginMode) {
        const userData = await loginUser(userInput.username, userInput.password);
        setUser(userData);
        setFavorites(await getFavorites(userData.id));
        closeModal();
      } else {
        const response = await registerUser(userInput.email, userInput.username, userInput.password);
        if (response.success) {
          alert('Registration was successful! You can log in.');
          setIsLoginMode(true);
        } else {
          setError(response.message || 'Registration error');
        }
      }
    } catch (err) {
      setError(err.message || 'Request processing error');
    }
  };
  //<FilterPanel filters={filters} setFilters={setFilters} />
  return (
    <div className="app-container">
      <Header user={user} openModal={() => setIsModalOpen(true)} onLogout={() => setUser(null)} />
      <main className="app-main">
        <SearchBar onSearch={fetchBooks} />
        
        <BookList
          books={books}
          loading={loading}
          onToggleFavorite={toggleFavorite}
          favorites={favorites.map((fav) => fav.bookId)}
        />
      </main>
      <Footer />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit} className="modal-form">
          <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
          {!isLoginMode && (
            <>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                name="name"
                value={userInput.name || ''}
                onChange={handleInputChange}
                required
              />
            </>
          )}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              value={userInput.email}
              onChange={handleInputChange}
              required={!isLoginMode}
              disabled={isLoginMode}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              value={userInput.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              name="password"
              value={userInput.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            {isLoginMode ? 'Login' : 'Register'}
          </button>
          {error && <p className="error-message">{error}</p>}
          <p className="toggle-mode">
            {isLoginMode
              ? "Don’t have an account? "
              : "Already have an account? "}
            <span className="link" onClick={() => setIsLoginMode(!isLoginMode)}>
              {isLoginMode ? 'Register' : 'Login'}
            </span>
          </p>
        </form>
      </Modal>
    </div>
  );
};

export default App;