'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import FilterControls from '@/components/dashboard/FilterControls';

interface ChartDataPoint {
  name: string;
  visitors: number;
  sessions: number;
  pageviews: number;
}

interface ChartSectionProps {
  selectedDataSource: string;
  setSelectedDataSource: (value: string) => void;
  selectedTimePeriod: string;
  setSelectedTimePeriod: (value: string) => void;
}

const ChartSection: React.FC<ChartSectionProps> = ({
  selectedDataSource,
  setSelectedDataSource,
  selectedTimePeriod,
  setSelectedTimePeriod,
}) => {
  const chartData: ChartDataPoint[] = [
    { name: 'Jan', visitors: 1200, sessions: 800, pageviews: 1500 },
    { name: 'Feb', visitors: 300, sessions: 200, pageviews: 400 },
    { name: 'Mar', visitors: 700, sessions: 500, pageviews: 900 },
    { name: 'Apr', visitors: 450, sessions: 300, pageviews: 600 },
    { name: 'May', visitors: 600, sessions: 400, pageviews: 800 },
    { name: 'Jun', visitors: 750, sessions: 550, pageviews: 1000 },
    { name: 'Jul', visitors: 400, sessions: 250, pageviews: 500 },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg sm:text-xl font-anonymous-pro font-bold tracking-wider text-global-1 mb-6">
        График посещений
      </h2>
      <FilterControls
        selectedDataSource={selectedDataSource}
        setSelectedDataSource={setSelectedDataSource}
        selectedTimePeriod={selectedTimePeriod}
        setSelectedTimePeriod={setSelectedTimePeriod}
      />
      <div className="w-full h-64 sm:h-80 mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#637381' }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#637381' }} />
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
    </div>
  );
};

export default ChartSection;
