import React from 'react';
import Image from 'next/image';

interface VisitorStats {
  total: number;
  growth: string;
  peakDecrease: string;
}

interface StatsSectionProps {
  visitorStats: VisitorStats;
}

const StatsSection: React.FC<StatsSectionProps> = ({ visitorStats }) => {
  return (
    <div className="bg-global-2 border border-sidebar-1 rounded-lg p-4 sm:p-6 mt-8">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="flex flex-col gap-5 w-full lg:w-auto">
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
  );
};

export default StatsSection;