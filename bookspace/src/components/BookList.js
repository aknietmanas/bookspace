// src/components/BookList.js
import React from 'react';
import BookItem from './BookItem';
import '../styles/BookList.css';

const BookList = ({ books, loading, onToggleFavorite, favorites }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!books.length) {
    return <div>No books found. Try a different search query.</div>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.includes(book.id)}
        />
      ))}
    </div>
  );
};

export default BookList;