'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import Sidebar from '@/components/common/Sidebar';

interface ChartDataPoint {
  name: string;
  visitors: number;
  sessions: number;
  pageviews: number;
}

interface VisitorStats {
  total: number;
  growth: string;
  peakDecrease: string;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [selectedDataSource, setSelectedDataSource] = useState('all');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('month');
  const [visitorStats, setVisitorStats] = useState<VisitorStats>({
    total: 1000,
    growth: '0.39%',
    peakDecrease: '12.6%',
  });

  // Проверка авторизации
  useEffect(() => {
  const token = document.cookie.split('; ').find((row) => row.startsWith('access_token='));
  if (!token) {
    router.push('/login'); // Перенаправляем на страницу входа, если токена нет
  }
}, [router]);

  const chartData: ChartDataPoint[] = [
    { name: 'Jan', visitors: 1200, sessions: 800, pageviews: 1500 },
    { name: 'Feb', visitors: 300, sessions: 200, pageviews: 400 },
    { name: 'Mar', visitors: 700, sessions: 500, pageviews: 900 },
    { name: 'Apr', visitors: 450, sessions: 300, pageviews: 600 },
    { name: 'May', visitors: 600, sessions: 400, pageviews: 800 },
    { name: 'Jun', visitors: 750, sessions: 550, pageviews: 1000 },
    { name: 'Jul', visitors: 400, sessions: 250, pageviews: 500 },
  ];

  const dataSourceOptions = [
    { value: 'all', label: 'все датчики' },
    { value: 'sensor1', label: 'датчик 1' },
    { value: 'sensor2', label: 'датчик 2' },
    { value: 'sensor3', label: 'датчик 3' },
  ];

  const timePeriodOptions = [
    { value: 'week', label: 'за неделю' },
    { value: 'month', label: 'за месяц' },
    { value: 'quarter', label: 'за квартал' },
    { value: 'year', label: 'за год' },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Дашборд', href: '/dashboard', active: true },
    { id: 'settings', label: 'Настройки', href: '/settings' },
    { id: 'logout', label: 'Выйти', onClick: () => handleLogout() },
  ];

  useEffect(() => {
    // Симуляция обновления данных на основе фильтров
    const updateStats = () => {
      setVisitorStats({
        total: Math.floor(Math.random() * 2000) + 500,
        growth: (Math.random() * 5).toFixed(2) + '%',
        peakDecrease: (Math.random() * 20 + 5).toFixed(1) + '%',
      });
    };
    updateStats();
  }, [selectedDataSource, selectedTimePeriod]);

  const handleMenuItemClick = (item: any) => {
    console.log('Menu item clicked:', item);
  };

  const handleLogout = () => {
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/login'; // Перенаправляем на страницу входа после выхода
  };

  return (
    <div className="min-h-screen bg-global-1 flex">
      {/* Sidebar */}
      <Sidebar
        menuItems={menuItems}
        onMenuItemClick={handleMenuItemClick}
        className="hidden lg:block"
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-80">
        {/* Header */}
        <header className="bg-global-2 border-b border-sidebar-1 p-4 sm:p-6">
          <div className="w-full">
            <Button
              variant="outline"
              className="w-full text-center text-lg sm:text-xl font-anonymous-pro font-normal tracking-[25px] text-sidebar-1 border border-sidebar-1 rounded-lg px-8 py-4"
            >
              ZENCOUNT WEB PANEL
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 sm:p-6">
          <div className="bg-global-2 border border-sidebar-1 rounded-lg p-4 sm:p-6">
            <div className="bg-global-2 border border-sidebar-1 rounded-lg p-4 sm:p-6">
              {/* Chart Section */}
              <div className="mb-8">
                {/* Chart Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h2 className="text-lg sm:text-xl font-anonymous-pro font-bold tracking-wider text-global-1">
                    График посещений
                  </h2>
                  {/* Filter Controls */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <div className="w-full sm:w-48">
                      <Dropdown
                        options={dataSourceOptions}
                        value={selectedDataSource}
                        onChange={setSelectedDataSource}
                        placeholder="все датчики"
                        className="text-sm"
                      />
                    </div>
                    <div className="w-full sm:w-40">
                      <Dropdown
                        options={timePeriodOptions}
                        value={selectedTimePeriod}
                        onChange={setSelectedTimePeriod}
                        placeholder="за месяц"
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
                {/* Chart */}
                <div className="w-full h-64 sm:h-80 mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#637381' }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#637381' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px',
                          fontSize: '14px',
                        }}
                      />
                      <Bar dataKey="visitors" fill="#4F46E5" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="sessions" fill="#10B981" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="pageviews" fill="#F59E0B" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                {/* Stats Section */}
                <div className="bg-global-2 border border-sidebar-1 rounded-lg p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                    {/* Left Stats */}
                    <div className="flex flex-col gap-5 w-full lg:w-auto">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-global-3 rounded-lg flex items-center justify-center">
                          <Image
                            src="/images/img_users_2.svg"
                            alt="Users icon"
                            width={24}
                            height={24}
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-anonymous-pro text-global-1">
                            Посещений
                          </span>
                          <span className="text-sm font-anonymous-pro text-global-6">
                            за месяц
                          </span>
                        </div>
                      </div>
                      {/* Stats Numbers */}
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-anonymous-pro font-bold text-global-1">
                          {visitorStats.total}
                        </span>
                        <div className="flex items-center gap-1 px-2">
                          <span className="text-sm font-anonymous-pro font-bold text-global-5">
                            {visitorStats.growth}
                          </span>
                          <Image
                            src="/images/img_vector.svg"
                            alt="Growth arrow"
                            width={10}
                            height={10}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Right Stats */}
                    <div className="flex flex-col gap-1 w-full lg:w-auto">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/images/img_vector.svg"
                          alt="Up arrow"
                          width={10}
                          height={10}
                        />
                        <span className="text-base font-anonymous-pro text-global-4">
                          В среднем на{' '}
                          <span className="text-global-5">100 больше, чем в прошлом месяце</span>
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Image
                          src="/images/img_vector_red_a700_01.svg"
                          alt="Down arrow"
                          width={10}
                          height={10}
                          className="mt-1"
                        />
                        <span className="text-base font-anonymous-pro text-global-4">
                          Ниже пиковой посещаемости на{' '}
                          <span className="text-red-600">{visitorStats.peakDecrease}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;