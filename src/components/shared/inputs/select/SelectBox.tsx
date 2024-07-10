import { SyntheticEvent, useEffect, useState } from "react";
import { InputControl } from "../components/InputControl";
import classNames from "classnames";

export type SelectOption = {
  label: string;
};

type Props = {
  helperText?: string;
  error?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  label?: string;
  options: SelectOption[];
  onChange: (label: string) => void; // Updated to expect a label instead of value
  disabled?: boolean;
  placeholder?: string;
  disabledClearable?: boolean;
};

const SelectBox = ({
  required = false,
  fullWidth = false,
  helperText,
  error,
  label,
  options,
  onChange,
  placeholder,
  disabledClearable = false,
  ...props
}: Props) => {
  const [_label, setLabel] = useState<string | undefined>("");

  useEffect(() => {
    const option = options.find((option) => option.label === _label);

    setLabel(option?.label);
  }, [options, _label]);

  const handleChangeValue = (_event: SyntheticEvent<Element, Event>) => {
    const newLabel = (_event.target as HTMLSelectElement).selectedOptions[0].text;
    if (!newLabel) {
      onChange("");
      setLabel(undefined);
      return;
    }

    onChange(newLabel);
    setLabel(newLabel);
  };

  return (
    <InputControl
      fieldError={error}
      fullWidth={fullWidth}
      label={label}
      required={required}
      helperText={helperText}
    >
      <select
        value={_label as string}
        onChange={handleChangeValue}
        className={classNames(
          "rounded-md border min-w-[120px] border-gray-300 px-2 py-2 focus:border-[#556cd6] h-[40px] bg-transparent bg-white",
          {
            "border-red-600": error,
          }
        )}
        {...props}
      >
        {placeholder && (
          <option
            className="px-4 py-2 block whitespace-nowrap text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            value=""
            disabled
          >
            {placeholder}
          </option>
        )}
        {options.map((option) => {
          return (
            <option
              className="px-4 py-2 block whitespace-nowrap text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              // key remains as value for uniqueness
              value={option.label} // Changed to label
              key={option.label}
            >
              {option.label}
            </option>
          );
        })}
      </select>
    </InputControl>
  );
};

export { SelectBox };