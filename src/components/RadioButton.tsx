import React from 'react';

interface RadioButtonProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export function RadioButton({
  id,
  name,
  value,
  checked,
  onChange,
  label,
}: RadioButtonProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer">
      <div className="relative">
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded-full border-[1px] ${
            checked ? 'border-radio-active' : 'border-border-gray'
          } flex items-center justify-center relative`}
        >
          {checked && (
            <div className="w-2.5 h-2.5 rounded-full bg-radio-active absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          )}
        </div>
      </div>
      <span className="text-black-87 font-nunito text-base leading-[26px]">
        {label}
      </span>
    </label>
  );
}
