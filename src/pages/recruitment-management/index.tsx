import {
  InterviewTable,
  SubmissionTable,
} from "@/components/features/recruitment-management";
import { Container } from "@/components/layouts/Container";
import { TabBase } from "@/components/shared/tabs/TabBase";
import { SEO } from "@/configs/seo.config";
import { Box, Button, styled } from "@mui/material";
import { DefaultSeo } from "next-seo";
import React from "react";

const RecruitmentManagementPage = () => {
  const tabElement = [
    {
      title: (
        <TabButton
        // startIcon={<>1</>}
        >
          Nộp đơn
        </TabButton>
      ),
      element: <SubmissionTable />,
    },
    {
      title: <TabButton>Chờ phỏng vấn</TabButton>,
      element: <InterviewTable />,
    },
  ];

  return (
    <Container>
      <Box className="py-4">
        <DefaultSeo {...SEO} title="Đăng ký thành viên" />
        <TabBase tabElement={tabElement} tabIndex={0} />
      </Box>
    </Container>
  );
};

const TabButton = styled(Button)({
  textTransform: "capitalize",
});

export default RecruitmentManagementPage;
