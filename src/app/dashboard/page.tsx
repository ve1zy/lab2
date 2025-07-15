// src/app/dashboard/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import ChartSection from '@/components/dashboard/ChartSection';
import StatsSection from '@/components/dashboard/StatsSection';

const Dashboard: React.FC = () => {
  const [selectedDataSource, setSelectedDataSource] = useState('all');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('month');
  const [visitorStats, setVisitorStats] = useState({
    total: 1000,
    growth: '0.39%',
    peakDecrease: '12.6%',
  });
const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/logout/', {
        method: 'POST',
        credentials: 'include', // Важно для отправки cookies
      });
      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = '/login';
    } catch (err) {
      console.error('Ошибка при выходе:', err);
    }
  };
  const menuItems = [
    { id: 'dashboard', label: 'Дашборд', href: '/dashboard', active: true },
    { id: 'settings', label: 'Настройки', href: '/settings' },
    { id: 'logout', label: 'Выйти', onClick: handleLogout }, // Передаем логику выхода
  ];
  useEffect(() => {
    const updateStats = () => {
      setVisitorStats({
        total: Math.floor(Math.random() * 2000) + 500,
        growth: (Math.random() * 5).toFixed(2) + '%',
        peakDecrease: (Math.random() * 20 + 5).toFixed(1) + '%',
      });
    };
    updateStats();
  }, [selectedDataSource, selectedTimePeriod]);

  return (
    <div className="min-h-screen bg-global-1 flex">
      <Sidebar
        menuItems={menuItems} // Передаем menuItems
        className="hidden lg:block"
      />

      <div className="flex-1 lg:ml-80">
        <Header />

        <main className="p-4 sm:p-6">
          <div className="bg-global-2 border border-sidebar-1 rounded-lg p-4 sm:p-6">
            <ChartSection 
              selectedDataSource={selectedDataSource}
              setSelectedDataSource={setSelectedDataSource}
              selectedTimePeriod={selectedTimePeriod}
              setSelectedTimePeriod={setSelectedTimePeriod}
            />
            
            <StatsSection visitorStats={visitorStats} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;