import React from 'react';
import Dropdown from '@/components/ui/Dropdown';

interface FilterControlsProps {
  selectedDataSource: string;
  setSelectedDataSource: (value: string) => void;
  selectedTimePeriod: string;
  setSelectedTimePeriod: (value: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  selectedDataSource,
  setSelectedDataSource,
  selectedTimePeriod,
  setSelectedTimePeriod
}) => {
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

  return (	
<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-end">
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
  );
};

export default FilterControls;