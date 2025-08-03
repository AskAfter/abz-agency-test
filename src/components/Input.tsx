import React, { useState } from 'react';

interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'tel' | 'password';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
}

export function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  helperText,
  errorText,
  required = false,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const hasError = !!errorText;
  const displayLabel = label || placeholder;
  const shouldFloatLabel = hasValue || isFocused;
  const inputId = `input-${name}`;

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
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          aria-describedby={hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          aria-invalid={hasError}
          className={`w-full h-[54px] px-4 border rounded bg-white text-black-87 font-nunito text-base focus:outline-none ${
            hasError ? 'border-red-500' : 'border-border-gray'
          }`}
        />
      </div>
      {helperText && !hasError && (
        <div id={`${inputId}-helper`} className="text-gray-light font-nunito text-xs leading-[14px]">
          {helperText}
        </div>
      )}
      {hasError && (
        <div id={`${inputId}-error`} className="text-red-500 font-nunito text-xs leading-[14px]">
          {errorText}
        </div>
      )}
    </div>
  );
}
