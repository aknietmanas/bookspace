// src/components/BookItem.js
import React from 'react';
import '../styles/BookItem.css';

const BookItem = ({ book, onToggleFavorite, isFavorite }) => {
  const { volumeInfo } = book;
  const { title, authors, imageLinks } = volumeInfo;

  return (
    <div className="book-item">
      <img src={imageLinks?.thumbnail || 'placeholder.jpg'} alt={title} />
      <div className="book-details">
        <h3>{title}</h3>
        <p>{authors?.join(', ')}</p>
        <button className='FavoriteButton' onClick={() => onToggleFavorite(book)}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default BookItem;