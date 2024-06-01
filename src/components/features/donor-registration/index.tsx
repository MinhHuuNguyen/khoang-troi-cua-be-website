import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DonorRegistrationInputSchema,
  DonorRegistrationInputType,
} from "./types";
import { Button, Typography, Grid, Box } from "@mui/material";
import { ContainerXL } from "@/components/layouts/ContainerXL";
import ktcbBackground from "@public/mission-background.jpg";
import { useRouter } from "next/router";
import { DonorDonate, DonorInformation } from "./components";
import QR from "@public/QR_KTCB.png";
import { useCreateDonorRegistration } from "./hooks/useCreateDonorRegistration";
import {
  MODAL_TYPES,
  useGlobalModalContext,
} from "../global-modal/GlobalModal";

export const DonorRegistration = () => {
  const router = useRouter();
  const { showModal } = useGlobalModalContext();

  const methods = useForm<DonorRegistrationInputType>({
    resolver: zodResolver(DonorRegistrationInputSchema),
    defaultValues: {
      full_name: "",
      birthday: Date.now(),
      phone_number: "",
      email: "",

      // donate
      kind_of_donate: "1",
      image_url: "",
    },
  });

  const { handleSubmit } = methods;

  const mutate = useCreateDonorRegistration();

  const onSubmit = handleSubmit(async (data) => {
    try {
      mutate.mutate(data);
      showModal(MODAL_TYPES.MODAL_SUCCESS, {
        heading: "Xác nhận thành công",
        content: "Cảm ơn đã gửi thông tin",
      });
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <FormProvider {...methods}>
      <ContainerXL
        sx={{
          backgroundImage: `url(${ktcbBackground.src})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="flex flex-col mt-9 gap-4">
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="contained"
              sx={{
                width: "fit-content",
              }}
              color="secondary"
              onClick={() => router.push("/member-registration")}
            >
              Trở thành thành viên
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "fit-content",
              }}
              disabled
              color="secondary"
              onClick={() => router.push("/donor-registration")}
            >
              Trở thành nhà hảo tâm
            </Button>
          </div>

          <Typography fontSize={28} fontWeight={"bold"}>
            Đăng ký trở thành nhà hảo tâm Khoảng Trời Của Bé
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <DonorInformation />
              <DonorDonate />
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography fontSize={20} fontWeight={"bold"}>
                Quét mã QR để quyên góp
              </Typography>
              <Typography fontSize={16} fontWeight={"bold"}>
                Nguyễn Hữu Minh
              </Typography>
              <Typography fontSize={16}>1903 3179 1709 96</Typography>

              <Box
                component="img"
                src={QR.src}
                alt="qr_code"
                sx={{
                  width: "100%",
                  height: "100%",
                  maxWidth: "240px",
                }}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            sx={{
              marginTop: "1rem",
              width: "fit-content",
              alignSelf: "center",
            }}
            color="secondary"
            onClick={onSubmit}
          >
            Gửi thông tin
          </Button>
        </div>
      </ContainerXL>
    </FormProvider>
  );
};
