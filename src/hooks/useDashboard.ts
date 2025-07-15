'use client';
import { useState, useEffect } from 'react';

interface VisitorStats {
  total: number;
  growth: string;
  peakDecrease: string;
}

export const useDashboard = () => {
  const [selectedDataSource, setSelectedDataSource] = useState<string>('all');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>('month');
  const [visitorStats, setVisitorStats] = useState<VisitorStats>({
    total: 1000,
    growth: '0.39%',
    peakDecrease: '12.6%',
  });

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

  return {
    selectedDataSource,
    setSelectedDataSource,
    selectedTimePeriod,
    setSelectedTimePeriod,
    visitorStats,
  };
};
