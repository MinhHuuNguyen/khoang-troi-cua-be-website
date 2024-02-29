import {
  InterviewTable,
  SubmissionTable,
} from "@/components/features/recruitment-management";
import { ContainerXL } from "@/components/layouts/ContainerXL";
import ToastSuccess from "@/components/shared/toasts/ToastSuccess";
import { SEO } from "@/configs/seo.config";
import { Box, Button } from "@mui/material";
import { DefaultSeo } from "next-seo";
import React from "react";
import { useForm } from "react-hook-form";

const RecruitmentManagementPage = () => {
  const [open, setOpen] = React.useState(false);

  const { watch, setValue } = useForm<{ tabIndex: number }>({
    defaultValues: {
      tabIndex: 0,
    },
  });

  const tabElement = [
    {
      element: <SubmissionTable />,
    },
    {
      element: <InterviewTable />,
    },
  ];

  return (
    <ContainerXL>
      <div className="flex flex-col mt-9 gap-4">
        <DefaultSeo {...SEO} title="Quản lý đơn tuyển" />
        <ToastSuccess
          open={open}
          onClose={() => setOpen(false)}
          heading="Xác nhận thành công"
          content="Cảm ơn đã gửi thông tin"
        />
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              textWrap: "nowrap",
            }}
            color="secondary"
            disabled={watch("tabIndex") === 0}
            onClick={() => setValue("tabIndex", 0)}
          >
            Vòng nộp đơn
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              textWrap: "nowrap",
            }}
            disabled={watch("tabIndex") === 1}
            color="secondary"
            onClick={() => setValue("tabIndex", 1)}
          >
            Vòng phỏng vấn
          </Button>
        </div>
        {tabElement.map((e, index) => {
          return (
            <div hidden={watch("tabIndex") !== index} key={index}>
              {watch("tabIndex") === index && <Box>{e.element}</Box>}
            </div>
          );
        })}
      </div>
    </ContainerXL>
  );
};

export default RecruitmentManagementPage;
