//src/api.js
const API_URL = "https://67343524a042ab85d119355d.mockapi.io";

export const registerUser = async (email, username, password) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, username, password }),
  });
  if (response.ok) {
    const result = await response.json();
    console.log('The user has been successfully registered:', result);
    
    alert('Registration was successful! Please log in to your account.');
} else {
    const errorData = await response.json();
    console.error('Registration error:', errorData);
    alert('Registration error. Please try again.');
}
  return await response.json();
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_URL}/users?username=${username}&password=${password}`);
  const data = await response.json();
  if (data.length === 0) {
    throw new Error("Incorrect username or password");
  }
  return data[0];
};

export const getFavorites = async (userId) => {
  const response = await fetch(`${API_URL}/favorites?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Ошибка загрузки избранного");
  }
  return await response.json();
};

export const addFavorite = async (userId, book) => {
  const response = await fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, bookId: book.id, title: book.volumeInfo.title }),
  });
  if (!response.ok) {
    throw new Error("Error adding to favorites");
  }
  return await response.json();
};

export const removeFavorite = async (favoriteId) => {
  const response = await fetch(`${API_URL}/favorites/${favoriteId}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Deletion error from favorites");
  }
  return await response.json();
};
