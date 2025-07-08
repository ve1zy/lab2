'use client';
import React, { useState } from 'react';

interface EditTextProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  disabled?: boolean;
  required?: boolean;
  className?: string;
  label?: string;
  error?: string;
  maxLength?: number;
  autoComplete?: string;
  id?: string;
  name?: string;
}

const EditText: React.FC<EditTextProps> = ({
  placeholder = '',
  value = '',
  onChange,
  type = 'text',
  disabled = false,
  required = false,
  className = '',
  label,
  error,
  maxLength,
  autoComplete,
  id,
  name,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const baseClasses = `
    w-full
    px-3 py-2 sm:px-4 sm:py-3
    text-sm sm:text-base
    font-inter
    bg-edittext-1
    border border-edittext-1
    rounded sm:rounded-md
    transition-all
    duration-200
    ease-in-out
    focus:outline-none
    focus:ring-2
    focus:ring-button-1
    focus:ring-opacity-50
    focus:border-button-1
    placeholder:text-global-3
    min-h-[44px] sm:min-h-[48px]
    touch-manipulation
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
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        className={`
          ${baseClasses}
          ${stateClasses}
          ${errorClasses}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        {...props}
      />
      {error && (
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default EditText;