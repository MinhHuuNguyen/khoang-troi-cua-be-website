import React from "react";
import { UserInformation } from "./components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MemberRegistrationInputSchema,
  MemberRegistrationInputType,
} from "./types";
import { Button } from "@mui/material";
import { Container } from "@/components/layouts/Container";
import dayjs from "dayjs";

export const MemberRegistration = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberRegistrationInputType>({
    resolver: zodResolver(MemberRegistrationInputSchema),
    defaultValues: {
      full_name: "",
      birthday: dayjs(Date.now()).toString(),
      phone_number: "",
      email: "",
      address: "",
      work_place: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Container>
      <div className="flex flex-col mt-9">
        <UserInformation control={control} errors={errors} />

        <Button
          variant="contained"
          sx={{
            marginTop: "2rem",
            width: "fit-content",
          }}
          onClick={onSubmit}
        >
          Đăng ký
        </Button>
      </div>
    </Container>
  );
};
