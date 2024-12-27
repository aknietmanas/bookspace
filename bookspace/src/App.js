// src/App.js
import React, { useState, useEffect } from 'react';
import { registerUser, loginUser, getFavorites, addFavorite, removeFavorite } from './api';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import FilterPanel from './components/FilterPanel';
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginModal from './components/LoginModal';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ author: '', category: '' });
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

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

  const handleRegister = async (userData) => {
    try {
      const newUser = await registerUser(userData);
      setUser(newUser);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const loggedInUser = await loginUser(credentials);
      setUser(loggedInUser);
      const userFavorites = await getFavorites(loggedInUser.id);
      setFavorites(userFavorites);
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const toggleFavorite = async (book) => {
    const existingFavorite = favorites.find((fav) => fav.bookId === book.id);
    if (existingFavorite) {
      await removeFavorite(existingFavorite.id);
      setFavorites((prev) => prev.filter((fav) => fav.id !== existingFavorite.id));
    } else {
      const newFavorite = await addFavorite(user.id, book);
      setFavorites((prev) => [...prev, newFavorite]);
    }
  };

  return (
    <div className="app-container">
      <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
      <main className="app-main">
          <SearchBar onSearch={fetchBooks} />
          <FilterPanel filters={filters} setFilters={setFilters} />
          <BookList
            books={books}
            loading={loading}
            onToggleFavorite={toggleFavorite}
            favorites={favorites.map((fav) => fav.bookId)}
          />
      </main>
      <Footer />
      {isModalOpen && <LoginModal onClose={() => setModalOpen(false)} onLogin={handleLogin} />}
    </div>
  );
};

export default App;
