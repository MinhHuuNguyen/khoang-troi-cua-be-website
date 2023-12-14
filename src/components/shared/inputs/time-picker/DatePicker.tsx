"use client";

import { TextField } from "@mui/material";
import {
  DatePickerProps,
  DatePicker as MUIDatePicker,
} from "@mui/x-date-pickers/DatePicker";
import { InputControl } from "../components/InputControl";

type Props = {
  helperText?: string;
  error?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  label?: string;
  iconLabel?: string;
  onChange: (value: Date | null) => void;
} & Omit<DatePickerProps<Date>, "onChange" | "renderInput">;

export const DatePicker = ({
  required = false,
  fullWidth = false,
  helperText,
  error,
  label,
  iconLabel,
  value,
  onChange,
  ...props
}: Props) => {
  const handleChange = (newValue: Date | null) => {
    onChange(newValue);
  };

  return (
    <InputControl
      fieldError={error}
      fullWidth={fullWidth}
      label={label}
      iconLabel={iconLabel}
      required={required}
      helperText={helperText}
    >
      <MUIDatePicker
        onChange={handleChange}
        value={value ? value : null}
        // renderInput={(params) => (
        //   <TextField
        //     size="small"
        //     error={error}
        //     onKeyDown={(e) => {
        //       e.preventDefault();
        //     }}
        //     {...params}
        //   />
        // )}
        {...props}
      />
    </InputControl>
  );
};
