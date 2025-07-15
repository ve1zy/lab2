'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import EditText from '@/components/ui/EditText';

interface LoginFormData {
  login: string;
  password: string;
}

interface LoginFormErrors {
  login?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({ login: '', password: '' });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (field: keyof LoginFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};
    if (!formData.login.trim()) newErrors.login = 'Логин обязателен';
    if (!formData.password.trim()) newErrors.password = 'Пароль обязателен';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: formData.login, password: formData.password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          router.push('/dashboard');
        } else {
          setErrors({ login: 'Неверный логин или пароль' });
        }
      } else {
        const errorData = await response.json();
        setErrors({ login: errorData?.detail || 'Ошибка авторизации' });
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
      setErrors({ login: 'Сервер недоступен' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log('Забыли пароль?');
  };

  return (
    <div className="w-full min-h-screen bg-global-1 flex justify-start items-center">
      <div className="w-full flex justify-center items-center px-4 sm:px-6 lg:px-14 pt-64 pb-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-global-2 border border-[#b5000333] rounded-lg sm:rounded-xl lg:rounded-2xl shadow-[0px_4px_15px_#888888ff] p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16">
            <div className="flex flex-col items-end mb-4 sm:mb-6 lg:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-6">
                <Image
                  src="/images/img_material_symbol.svg"
                  alt="5G Logo"
                  width={64}
                  height={52}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="w-full -mt-8 sm:-mt-10">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-global-2 mb-6 sm:mb-8 lg:mb-10 font-mono">
                  Вход
                </h1>
                <div className="space-y-6 sm:space-y-8 lg:space-y-10 mb-8 sm:mb-10 lg:mb-12">
                  <div className="space-y-2 sm:space-y-3">
                    <label className="block text-sm sm:text-base font-mono text-global-1">
                      Логин
                    </label>
                    <EditText
                      value={formData.login}
                      onChange={handleInputChange('login')}
                      placeholder=""
                      type="text"
                      autoComplete="username"
                      error={errors.login}
                      className={`border ${errors.login ? 'border-red-500' : 'border-edittext-1'} focus:border-edittext-1`}
                    />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <label className="block text-sm sm:text-base font-mono text-global-1">
                      Пароль
                    </label>
                    <EditText
                      value={formData.password}
                      onChange={handleInputChange('password')}
                      placeholder=""
                      type="password"
                      autoComplete="current-password"
                      error={errors.password}
                      className={`border ${errors.password ? 'border-red-500' : 'border-[#dfe4ea]'} focus:border-button-1`}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    loading={isLoading}
                    fullWidth
                    size="lg"
                    className="bg-button-1 text-button-1 hover:bg-[#a00003] font-medium text-base sm:text-lg py-3 sm:py-4"
                  >
                    {isLoading ? 'Входим...' : 'Войти'}
                  </Button>
                </div>
                <button
                  onClick={handleForgotPassword}
                  className="text-sm sm:text-base font-mono text-global-3 hover:text-global-1 transition-colors duration-200 focus:outline-none focus:underline"
                >
                  Забыли пароль?
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
