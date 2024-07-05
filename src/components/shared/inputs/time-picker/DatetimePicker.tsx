import React from "react";

type Props = {
  label?: string; // Add label prop
  helperText?: string;
  error?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  onChange: (value: Date | null) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export const DatetimePicker: React.FC<Props> = ({
  label,
  helperText,
  error,
  onChange,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(new Date(event.target.value));
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md px-2 py-2 focus:border-[#556cd6] h-[40px] ${props.fullWidth ? 'w-full' : ''}`}
        type="datetime-local"
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};