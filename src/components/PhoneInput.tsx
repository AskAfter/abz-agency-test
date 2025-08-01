import React, { useState } from 'react';

interface PhoneInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
}

export function PhoneInput({
  name,
  value,
  onChange,
  placeholder,
  helperText,
  errorText,
  required = false,
}: PhoneInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = !!errorText;
  const displayLabel = placeholder || 'Phone';

  // Format phone number to (xxx)-xxx-xx-xx
  const formatPhoneNumber = (phoneNumber: string) => {
    // Remove all non-digits
    const digits = phoneNumber.replace(/\D/g, '');
    
    // If it starts with 38, remove it as we'll add +38 prefix
    const cleanDigits = digits.startsWith('38') ? digits.slice(2) : digits;
    
    // Limit to 10 digits after +38
    const limitedDigits = cleanDigits.slice(0, 10);
    
    // Format as (0xx)-xxx-xx-xx
    if (limitedDigits.length === 0) return '';
    
    // Ensure first digit is 0, if not present, add it
    let workingDigits = limitedDigits;
    if (workingDigits.length > 0 && !workingDigits.startsWith('0')) {
      workingDigits = '0' + workingDigits.slice(0, 9); // Limit to 9 more digits after 0
    }
    
    // Limit to 10 digits total (including the 0)
    workingDigits = workingDigits.slice(0, 10);
    
    if (workingDigits.length <= 3) return `(${workingDigits})`;
    if (workingDigits.length <= 6) return `(${workingDigits.slice(0, 3)})-${workingDigits.slice(3)}`;
    if (workingDigits.length <= 8) return `(${workingDigits.slice(0, 3)})-${workingDigits.slice(3, 6)}-${workingDigits.slice(6)}`;
    return `(${workingDigits.slice(0, 3)})-${workingDigits.slice(3, 6)}-${workingDigits.slice(6, 8)}-${workingDigits.slice(8)}`;
  };

  // Get display value (what user sees)
  const getDisplayValue = () => {
    if (!value && !isFocused) return '';
    
    // Always show +38 when focused or has value
    const formatted = formatPhoneNumber(value);
    if (formatted) {
      return `+38 ${formatted}`;
    } else {
      // When focused but no value, show +38 (0
      return isFocused ? '+38 (0' : '+38 ';
    }
  };

  // Get actual value (what gets stored)
  const getActualValue = (inputValue: string) => {
    // Remove +38 prefix and spaces/formatting
    const withoutPrefix = inputValue.replace(/^\+38\s?/, '');
    const digits = withoutPrefix.replace(/\D/g, '');
    
    // Return in format +38xxxxxxxxxx for storage
    return digits ? `+38${digits}` : '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const actualValue = getActualValue(inputValue);
    
    // Create a new event with the actual value
    const newEvent = {
      ...e,
      target: {
        ...e.target,
        name,
        value: actualValue,
      },
    };
    
    onChange(newEvent as React.ChangeEvent<HTMLInputElement>);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const displayValue = getDisplayValue();
  const shouldFloatLabel = displayValue.length > 0 || isFocused;

  return (
    <div className="space-y-1">
      <div className="relative">
        {displayLabel && (
          <label
            className={`absolute left-3 font-nunito transition-all duration-200 pointer-events-none px-1 bg-background z-10 ${
              shouldFloatLabel
                ? '-top-2 text-xs leading-[14px] text-gray-light'
                : 'top-1/2 -translate-y-1/2 text-base text-gray-light'
            } ${hasError ? 'text-red-500' : ''}`}
          >
            {displayLabel}
          </label>
        )}
        <input
          type="tel"
          name={name}
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className={`w-full h-[54px] px-4 border rounded bg-white text-black-87 font-nunito text-base focus:outline-none ${
            hasError ? 'border-red-500' : 'border-border-gray'
          }`}
        />
      </div>
      {helperText && !hasError && (
        <div className="text-gray-light font-nunito text-xs leading-[14px]">
          {helperText}
        </div>
      )}
      {hasError && (
        <div className="text-red-500 font-nunito text-xs leading-[14px]">
          {errorText}
        </div>
      )}
    </div>
  );
}
