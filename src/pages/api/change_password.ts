import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import { hash, compareSync } from "bcryptjs";
import { ChangePasswordInputType } from "@/components/features/change-password/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST":
        const data: ChangePasswordInputType & { email: string } = req.body;

        if (!data) {
          return res.status(400).json({ message: "Content not found" });
        }

        const user = await prisma.user.findUnique({
          where: { email: data.email },
        });

        if (!user) {
          return res.status(404).json({ message: "Người dùng không tìm thấy" });
        }

        if (!compareSync(data.current_password, user?.password)) {
          return res
            .status(400)
            .json({ message: "Mật khẩu hiện tại không chính xác" });
        }

        const password = await hash(data.new_password, 12);

        const u = await prisma.user.update({
          where: { email: data.email },
          data: {
            password,
          },
        });

        return res.status(201).json(u);
      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Có vấn đề xảy ra" });
  }
}
