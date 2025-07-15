'use client';
import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import ChartSection from '@/components/dashboard/ChartSection';
import StatsSection from '@/components/dashboard/StatsSection';
import { useDashboard } from '@/hooks/useDashboard'; // Именованный импорт
import { useAuth } from '@/hooks/useAuth';

const Dashboard: React.FC = () => {
  const { selectedDataSource, setSelectedDataSource, selectedTimePeriod, setSelectedTimePeriod, visitorStats } =
    useDashboard();
  const { handleLogout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Дашборд', href: '/dashboard', active: true },
    { id: 'settings', label: 'Настройки', href: '/settings' },
    { id: 'logout', label: 'Выйти', onClick: handleLogout },
  ];

  return (
    <div className="min-h-screen bg-global-1 flex">
      <Sidebar menuItems={menuItems} className="hidden lg:block" />
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