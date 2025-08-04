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
  const inputId = `input-${name}`;

  // Format phone number to (0xx)-xxx-xx-xx
  const formatPhoneNumber = (phoneNumber: string) => {
    // Remove all non-digits
    const digits = phoneNumber.replace(/\D/g, '');

    // Extract digits after +38 prefix (if present)
    let workingDigits = '';
    if (digits.startsWith('38')) {
      // Remove +38 prefix and use remaining digits
      workingDigits = digits.slice(2);
    } else {
      // Use all digits as they are
      workingDigits = digits;
    }

    // Ensure we have exactly 10 digits for a valid Ukrainian phone number
    // Ukrainian mobile numbers are 10 digits after +38 (0XXXXXXXXX format)
    if (workingDigits.length === 0) return '';

    // Ensure first digit is 0 for Ukrainian mobile format
    if (!workingDigits.startsWith('0')) {
      workingDigits = '0' + workingDigits;
    }

    // Limit to exactly 10 digits
    workingDigits = workingDigits.slice(0, 10);

    // Format as (0xx)-xxx-xx-xx
    if (workingDigits.length <= 3) return `(${workingDigits})`;
    if (workingDigits.length <= 6)
      return `(${workingDigits.slice(0, 3)})-${workingDigits.slice(3)}`;
    if (workingDigits.length <= 8)
      return `(${workingDigits.slice(0, 3)})-${workingDigits.slice(3, 6)}-${workingDigits.slice(6)}`;
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

    if (!digits) return '';

    // Ensure first digit is 0 for Ukrainian mobile format
    let workingDigits = digits;
    if (!workingDigits.startsWith('0')) {
      workingDigits = '0' + workingDigits;
    }

    // Limit to exactly 10 digits (Ukrainian mobile format: 0XXXXXXXXX)
    workingDigits = workingDigits.slice(0, 10);

    // Return in format +38xxxxxxxxxx for storage (only if we have at least some digits)
    return workingDigits ? `+38${workingDigits}` : '';
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
            htmlFor={inputId}
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
          id={inputId}
          type="tel"
          name={name}
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          aria-invalid={hasError}
          className={`w-full h-[54px] px-4 border rounded bg-transparent text-black-87 font-nunito text-base focus:outline-none ${
            hasError ? 'border-red-500' : 'border-border-gray'
          }`}
        />
      </div>
      {helperText && !hasError && (
        <div
          id={`${inputId}-helper`}
          className="text-gray-light font-nunito text-xs leading-[14px]"
        >
          {helperText}
        </div>
      )}
      {hasError && (
        <div
          id={`${inputId}-error`}
          className="text-red-500 font-nunito text-xs leading-[14px]"
        >
          {errorText}
        </div>
      )}
    </div>
  );
}
