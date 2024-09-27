import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import { sendMail } from "@mailer/mailService";
import {mailMemberRegistration} from "@mailer/templates/member-registration-complete";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Content not found" });
    }

    switch (req.method) {
      case "POST":
        const data = req.body;
        const hasSocialActivities = data.has_social_activities === "1";

        const member = await prisma.memberRegistration.create({
          data: {
            fullName: data.full_name,
            birthday: new Date(data.birthday),
            phoneNumber: data.phone_number,
            email: data.email,
            address: data.address,
            workPlace: data.work_place,
            hasSocialActivities: hasSocialActivities,
            memories: data.memories,
            positionId: parseInt(data.position),
            hopeToReceive: data.hope_to_receive,
          },
          include: {
            position: {
              select: {
                name: true,
              },
            },
          },
        });

        await sendMail(
          [member.email],
          "CẢM ƠN BẠN ĐÃ ĐĂNG KÝ THÀNH VIÊN KHOẢNG TRỜI CỦA BÉ",
          mailMemberRegistration(member)
        );
        return res.status(201).json(member);
      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
