'use client'; // Добавляем эту строку
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthResponse {
  success?: boolean;
  detail?: string;
}

export const useAuth = () => {
  const router = useRouter();

  const handleLogin = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data: AuthResponse = await response.json();
        if (data.success) {
          router.push('/dashboard');
          return { success: true };
        }
        return { success: false, error: data.detail || 'Неверный логин или пароль' };
      }

      const errorData: AuthResponse = await response.json();
      return { success: false, error: errorData?.detail || 'Ошибка авторизации' };
    } catch (error) {
      console.error('Ошибка сети:', error);
      return { success: false, error: 'Сервер недоступен' };
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await fetch('http://localhost:8000/logout/', {
        method: 'POST',
        credentials: 'include',
      });

      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      router.push('/login');
    } catch (err) {
      console.error('Ошибка при выходе:', err);
    }
  };

  return { handleLogin, handleLogout };
};