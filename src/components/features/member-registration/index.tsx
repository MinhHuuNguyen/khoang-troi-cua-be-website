import React from "react";
import { UserInformation, UserKTCB, UserSocialActivities } from "./components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MemberRegistrationInputSchema,
  MemberRegistrationInputType,
} from "./types";
import { Button } from "@mui/material";
import { Container } from "@/components/layouts/Container";

export const MemberRegistration = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberRegistrationInputType>({
    resolver: zodResolver(MemberRegistrationInputSchema),
    defaultValues: {
      full_name: "",
      birthday: Date.now(),
      phone_number: "",
      email: "",
      address: "",
      work_place: "",

      // social activities
      has_social_activities: "1",
      memories: "",

      // ktcb
      position: "1",
      hope_to_receive: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Container>
      <div className="flex flex-col mt-9 gap-4">
        <UserInformation control={control} errors={errors} />

        <UserSocialActivities control={control} errors={errors} />

        <UserKTCB control={control} errors={errors} />

        <Button
          variant="contained"
          sx={{
            marginTop: "1rem",
            width: "fit-content",
            alignSelf: "flex-end",
          }}
          onClick={onSubmit}
        >
          Gửi thông tin
        </Button>
      </div>
    </Container>
  );
};