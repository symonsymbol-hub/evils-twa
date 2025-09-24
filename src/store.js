import { create } from 'zustand';

// Создаем хранилище, в котором будет лежать объект user
export const useUserStore = create((set) => ({
  user: null, // Изначально пользователя нет
  // Функция для установки данных пользователя
  setUser: (userData) => set({ user: userData }),
}));