import React, { useState } from "react";
import { Control, Controller, useFormContext } from "react-hook-form";
import { Stack, Typography, Grid, InputAdornment } from "@mui/material";
import { Input } from "@/components/shared/inputs";
import { DatetimePicker } from "@/components/shared/inputs/time-picker";
import { MeetingInputType } from "../types";
import IconButton from '@mui/material/IconButton';
import MapIcon from '@mui/icons-material/Map';

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
            name="host"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label={"Thành viên tiếp đón"}
                required
                fullWidth
                placeholder={"Nhập tên"}
                value={value}
                onChange={onChange}
                error={!!errors.host?.message}
                helperText={errors.host?.message}
              />
            )}
          />
        </Grid>

        <Grid item {...COL_SPAN}>
          <Controller
            name="phone_number"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label={"Số điện thoại liên hệ"}
                required
                fullWidth
                placeholder={"Nhập số điện thoại"}
                value={value}
                onChange={onChange}
                error={!!errors.phone_number?.message}
                helperText={errors.phone_number?.message}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Input
                  label="Địa điểm buổi gặp mặt"
                  required
                  fullWidth
                  placeholder="Nhập địa chỉ"
                  value={value}
                  onChange={onChange}
                  error={!!errors.address?.message}
                  helperText={errors.address?.message}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        color="primary"
                        onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`, '_blank')}
                        aria-label="search on google maps"
                      >
                        <MapIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>
            )}
          />
        </Grid>

      </Grid>
    </Stack>
  );
};
