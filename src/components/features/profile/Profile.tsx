import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileInputSchema, ProfileInputType } from "./types";
import { Button } from "@mui/material";
import { Container } from "@/components/layouts/Container";

import { Controller } from "react-hook-form";
import { Grid } from "@mui/material";
import { Input } from "@/components/shared/inputs";
import { DatePicker } from "@/components/shared/inputs/time-picker";

const COL_SPAN = {
  xs: 12,
  sm: 6,
  md: 4,
};

export const Profile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInputType>({
    resolver: zodResolver(ProfileInputSchema),
    defaultValues: {
      full_name: "",
      birthday: Date.now(),
      phone_number: "",
      email: "",
      address: "",
      work_place: "",
      bank_account: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Container>
      <div className="flex flex-col mt-9 gap-4">
        <Grid container spacing={2}>
          <Grid item {...COL_SPAN}>
            <Controller
              name="full_name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  label={"Họ và tên"}
                  required
                  fullWidth
                  placeholder={"Nhập họ và tên"}
                  value={value}
                  onChange={onChange}
                  error={!!errors.full_name?.message}
                  helperText={errors.full_name?.message}
                />
              )}
            />
          </Grid>

          <Grid item {...COL_SPAN}>
            <Controller
              name="birthday"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  label={"Ngày tháng năm sinh"}
                  required
                  fullWidth
                  value={value as unknown as Date}
                  onChange={onChange}
                  error={!!errors.birthday?.message}
                  helperText={errors.birthday?.message as string}
                  maxDate={new Date()}
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
                  label={"Số điện thoại"}
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
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  label={"Email"}
                  required
                  fullWidth
                  placeholder={"Nhập email"}
                  value={value}
                  onChange={onChange}
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>

          <Grid item {...COL_SPAN}>
            <Controller
              name="work_place"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  label={"Đơn vị công tác"}
                  required
                  fullWidth
                  placeholder={"Nhập đơn vị công tác"}
                  value={value}
                  onChange={onChange}
                  error={!!errors.work_place?.message}
                  helperText={errors.work_place?.message}
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
                  label={"Nơi ở hiện tại"}
                  required
                  fullWidth
                  placeholder={"Nhập nơi ở hiện tại"}
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
              name="bank_account"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  label={"Số tài khoản"}
                  required
                  fullWidth
                  placeholder={"Nhập số tài khoản"}
                  value={value}
                  onChange={onChange}
                  error={!!errors.bank_account?.message}
                  helperText={errors.bank_account?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          sx={{
            marginTop: "1rem",
            width: "fit-content",
            alignSelf: "center",
            color: "#fff",
          }}
          color="secondary"
          onClick={onSubmit}
        >
          Cập nhật
        </Button>
      </div>
    </Container>
  );
};
