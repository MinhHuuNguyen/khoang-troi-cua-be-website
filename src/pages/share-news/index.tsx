// src/pages/share-news/index.tsx
import {NewsTable} from "@/components/features/share-new/NewsTable";
import { ContainerXL } from "@/components/layouts/ContainerXL";
import ToastSuccess from "@/components/shared/toasts/ToastSuccess";
import { SEO } from "@/configs/seo.config";
import { DefaultSeo } from "next-seo";
import React from "react";

const ShareNewsPage = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <ContainerXL>
      <div className="flex flex-col mt-9 gap-4">
        <DefaultSeo {...SEO} title="Chia sẻ bài viết" />
        <ToastSuccess
          open={open}
          onClose={() => setOpen(false)}
          heading="Xác nhận thành công"
          content="Cảm ơn đã gửi thông tin"
        />
        <NewsTable />
      </div>
    </ContainerXL>
  );
};

export default ShareNewsPage;