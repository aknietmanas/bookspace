// src/api.js
const API_URL = 'https://67343524a042ab85d119355d.mockapi.io';

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) throw new Error('Login failed');
  const users = await response.json();
  const user = users.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );
  if (!user) throw new Error('Invalid email or password');
  return user;
};

export const getFavorites = async (userId) => {
  const response = await fetch(`${API_URL}/favorites?userId=${userId}`);
  if (!response.ok) throw new Error('Failed to fetch favorites');
  return response.json();
};

export const addFavorite = async (userId, book) => {
  const response = await fetch(`${API_URL}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, bookId: book.id, ...book }),
  });
  if (!response.ok) throw new Error('Failed to add favorite');
  return response.json();
};

export const removeFavorite = async (favoriteId) => {
  const response = await fetch(`${API_URL}/favorites/${favoriteId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to remove favorite');
  return response.json();
};
