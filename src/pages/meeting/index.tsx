
import { MeetingScreen } from "@/components/features/meeting";
import { SEO } from "@/configs/seo.config";
import { NextPage } from "next";
import { DefaultSeo } from "next-seo";
import React from "react";

const MeetingPage: NextPage = () => {
  return (
    <>
      <DefaultSeo {...SEO} title="Tổ chức buổi gặp mặt" />
      <MeetingScreen />
    </>
  );
};

export default MeetingPage;
