import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconButton, Modal, Button, Typography, Grid, Box, Tooltip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { ContainerXL } from "@/components/layouts/ContainerXL";
import ktcbBackground from "@public/mission-background.jpg";
import { useRouter } from "next/router";
import { MeetingInformation } from "./components";
import { useMeetingMember } from "./hook/useMeetingMember";
import {
  MODAL_TYPES,
  useGlobalModalContext,
} from "../global-modal/GlobalModal";
import { MeetingInputSchema, MeetingInputType } from "./types";

export const MeetingScreen = () => {
  const router = useRouter();
  const { showModal } = useGlobalModalContext();
  const [formData, setFormData] = useState<MeetingInputType | null>(null);
  const [open, setOpen] = useState(false);

  const methods = useForm<MeetingInputType>({
    resolver: zodResolver(MeetingInputSchema),
    defaultValues: {
      name: "",
      date: Date.now(),
      address: "",
      host: "",
    },
  });

  const mutate = useMeetingMember();

  const { handleSubmit } = methods;
  const classNameCol = "md:col-span-1 xs:col-span-2";

  const onSubmit = handleSubmit(async (data) => {
    try {
      setFormData(data);
      setOpen(true);
    } catch (err) {
      console.error(err);
    }
  });

  const handleConfirm = async () => {
    // Xác nhận dữ liệu và đóng Dialog
    mutate.mutate(formData as MeetingInputType);
    showModal(MODAL_TYPES.MODAL_SUCCESS, { heading: "Xác nhận thành công", content: "Cảm ơn đã gửi thông tin", });
    setOpen(false);
    setFormData(null);
    // Reset form
    methods.reset();
  };

  const handleClose = () => {
    // Đóng Dialog mà không xác nhận
    setOpen(false);
  };

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
          <Typography fontSize={28} fontWeight={"bold"}>
            Màn hình tổ chức buổi gặp mặt
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <MeetingInformation />
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
              }}>
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

      <Modal open={open} onClose={handleClose}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[60vw] w-3/4 h-auto max-h-[60vh] bg-white mx-auto shadow-xl rounded-lg overflow-hidden">
          <div className="grid grid-cols-6 h-full md:p-8 p-4 gap-4">
            <div className="lg:col-span-6 col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={classNameCol}>
                <span className="font-bold">Tên buổi gặp mặt: </span>
                {formData?.name}
              </div>
              <div className={classNameCol}>
                <span className="font-bold">Thời gian: </span>
                {new Date(formData?.date).toLocaleString('vi-VN', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </div>
              <div className={classNameCol}>
                <span className="font-bold">Địa chỉ: </span>
                {formData?.address}
              </div>
              <div className={classNameCol}>
                <span className="font-bold">Thành viên tiếp đón: </span>
                {formData?.host}
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4 p-4">
            <Tooltip title="Hủy bỏ và đóng cửa sổ">
              <IconButton onClick={handleClose} aria-label="cancel">
                <CloseIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xác nhận thông tin">
              <IconButton onClick={handleConfirm} aria-label="confirm" color="primary">
                <CheckIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Modal>

    </FormProvider>
  );
};
