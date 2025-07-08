'use client';
import React, { useState, useRef, useEffect } from 'react';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
  id?: string;
  name?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  value = '',
  onChange,
  placeholder = 'Select option',
  disabled = false,
  className = '',
  label,
  error,
  id,
  name,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    if (onChange) {
      onChange(optionValue);
    }
  };

  const selectedOption = options.find(option => option.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const baseClasses = `
    relative
    w-full
    px-3 py-2 sm:px-4 sm:py-3
    text-sm sm:text-base
    font-anonymous-pro
    bg-dropdown-1
    border border-dropdown-1
    rounded sm:rounded-md
    transition-all
    duration-200
    ease-in-out
    focus:outline-none
    focus:ring-2
    focus:ring-button-1
    focus:ring-opacity-50
    focus:border-button-1
    min-h-[44px] sm:min-h-[48px]
    touch-manipulation
    cursor-pointer
    flex
    items-center
    justify-between
  `;

  const stateClasses = disabled
    ? 'opacity-50 cursor-not-allowed bg-gray-100' :'hover:border-button-1';

  const errorClasses = error
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' :'';

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm sm:text-base font-medium text-global-1 mb-1 sm:mb-2"
        >
          {label}
        </label>
      )}
      <div ref={dropdownRef} className="relative">
        <div
          id={id}
          onClick={disabled ? undefined : () => setIsOpen(!isOpen)}
          className={`
            ${baseClasses}
            ${stateClasses}
            ${errorClasses}
            ${className}
          `.trim().replace(/\s+/g, ' ')}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
            if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
        >
          <span className={`text-dropdown-1 ${!selectedOption ? 'opacity-60' : ''}`}>
            {displayText}
          </span>
          <svg
            className={`w-4 h-4 sm:w-5 sm:h-5 text-dropdown-1 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-dropdown-1 border border-dropdown-1 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No options available</div>
            ) : (
              options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`
                    px-3 py-2 sm:px-4 sm:py-3
                    text-sm sm:text-base
                    font-anonymous-pro
                    text-dropdown-1
                    cursor-pointer
                    hover:bg-gray-50
                    transition-colors
                    duration-150
                    ${selectedValue === option.value ? 'bg-gray-100' : ''}
                  `}
                  role="option"
                  aria-selected={selectedValue === option.value}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Dropdown;