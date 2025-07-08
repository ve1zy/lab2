'use client';
import React, { useState } from 'react';
import Image from 'next/image';
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
  const [formData, setFormData] = useState<LoginFormData>({
    login: '',
    password: ''
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleInputChange = (field: keyof LoginFormData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };
  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};
    if (!formData.login.trim()) {
      newErrors.login = 'Логин обязателен';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Пароль обязателен';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Handle successful login here
      console.log('Login successful:', formData);
      // Redirect or handle success
      // router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({
        login: 'Неверный логин или пароль'
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleForgotPassword = () => {
    // Handle forgot password functionality
    console.log('Forgot password clicked');
    // router.push('/forgot-password');
  };
  return (
    <div className="w-full min-h-screen bg-global-1 flex justify-start items-center">
      {/* Main Container */}
      <div className="w-full flex justify-center items-center px-4 sm:px-6 lg:px-14 pt-64 pb-8">
        {/* Login Card */}
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-global-2 border border-[#b5000333] rounded-lg sm:rounded-xl lg:rounded-2xl shadow-[0px_4px_15px_#888888ff] p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16">
          {/* Header Section */}
          <div className="flex flex-col items-end mb-4 sm:mb-6 lg:mb-8">
            {/* 5G Logo */}
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
            {/* Login Form Container */}
            <div className="w-full -mt-8 sm:-mt-10">
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-global-2 mb-6 sm:mb-8 lg:mb-10 font-mono">
                Вход
              </h1>
              {/* Form Fields */}
              <div className="space-y-6 sm:space-y-8 lg:space-y-10 mb-8 sm:mb-10 lg:mb-12">
                {/* Login Field */}
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
                    className="border-edittext-1 focus:border-edittext-1"
                  />
                </div>
                {/* Password Field */}
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
                    className="border-[#dfe4ea] focus:border-button-1"
                  />
                </div>
                {/* Login Button */}
                <Button
                  onClick={handleLogin}
                  disabled={isLoading}
                  loading={isLoading}
                  fullWidth
                  size="lg"
                  className="bg-button-1 text-button-1 hover:bg-[#a00003] font-medium text-base sm:text-lg py-3 sm:py-4"
                >
                  Войти
                </Button>
              </div>
              {/* Forgot Password Link */}
              <button
                onClick={handleForgotPassword}
                className="text-sm sm:text-base font-mono text-global-3 hover:text-global-1 transition-colors duration-200 focus:outline-none focus:underline"
              >
                Забыли пароль?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;