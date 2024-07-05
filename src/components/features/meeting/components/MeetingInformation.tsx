import React from "react";
import { Control, Controller, useFormContext } from "react-hook-form";
import { Stack, Typography, Grid } from "@mui/material";
import { Input } from "@/components/shared/inputs";
import { DatetimePicker } from "@/components/shared/inputs/time-picker";
import { MeetingInputType } from "../types";

const COL_SPAN = {
  xs: 12,
  md: 6,
};

export const MeetingInformation = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<MeetingInputType>();

  return (
    <Stack>
      <Typography variant="h5" mb={3}>
        Nhập thông tin buổi gặp mặt
      </Typography>

      <Grid container spacing={2}>
        <Grid item {...COL_SPAN}>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label={"Tên buổi gặp mặt"}
                required
                fullWidth
                placeholder={"Nhập tên"}
                value={value}
                onChange={onChange}
                error={!!errors.name?.message}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>

        <Grid item {...COL_SPAN}>
          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatetimePicker
                label={"Thời gian buổi gặp mặt"}
                required
                fullWidth
                onChange={(date: Date | null) => onChange(date ? date.toISOString() : '')} // Adjusted to match expected onChange type
                error={!!errors.date?.message}
                helperText={errors.date?.message as string}
              />
            )}
          />
        </Grid>

        <Grid item {...COL_SPAN}>
          <Controller
            name="address"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label={"Địa điểm buổi gặp mặt"}
                required
                fullWidth
                placeholder={"Nhập địa chỉ"}
                value={value}
                onChange={onChange}
                error={!!errors.address?.message}
                helperText={errors.address?.message}
              />
            )}
          />
        </Grid>

        <Grid item {...COL_SPAN}>
          <Controller
            name="host"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label={"Thành viên tiếp đón"}
                required
                fullWidth
                placeholder={"Nhập tên thành viên"}
                value={value}
                onChange={onChange}
                error={!!errors.host?.message}
                helperText={errors.host?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};
