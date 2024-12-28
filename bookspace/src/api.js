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
    console.log('Пользователь успешно зарегистрирован:', result);
    
    alert('Регистрация прошла успешно! Пожалуйста, войдите в аккаунт.');
} else {
    const errorData = await response.json();
    console.error('Ошибка регистрации:', errorData);
    alert('Ошибка регистрации. Пожалуйста, попробуйте еще раз.');
}
  return await response.json();
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_URL}/users?username=${username}&password=${password}`);
  const data = await response.json();
  if (data.length === 0) {
    throw new Error("Неправильный логин или пароль");
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
    throw new Error("Ошибка добавления в избранное");
  }
  return await response.json();
};

export const removeFavorite = async (favoriteId) => {
  const response = await fetch(`${API_URL}/favorites/${favoriteId}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Ошибка удаления из избранного");
  }
  return await response.json();
};
