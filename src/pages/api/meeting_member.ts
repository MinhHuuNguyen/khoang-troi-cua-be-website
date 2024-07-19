import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import { sendMail } from "@mailer/mailService";
import mailData from "@mailer/templates/meeting-member/meeting";

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
        // Tạo dữ liệu Meeting mới
        const newMeeting = await prisma.meeting.create({
          data: {
            phoneNumber: req.body.phone_number,
            date: new Date(req.body.date), // Đảm bảo định dạng ngày tháng chính xác
            address: req.body.address,
            host: req.body.host,
            linkMaps : "https://goo.gl/maps/1q2w3e4r5t6y7u8i9o0p",
          },
        });

        // Tìm tất cả thành viên để gửi email
        const members = await prisma.member.findMany();

        if (members.length === 0) {
          return res.status(404).json({ message: "Members not found" });
        }

        // Gửi email cho mỗi thành viên tìm thấy
        for (const member of members) {
          const meetingDataWithFullName = {
            ...newMeeting,
            fullName: member.fullName, // Giả sử member có thuộc tính fullName
          };
          await sendMail(
            [member.email], // Sử dụng email từ cơ sở dữ liệu
            "MỜI THAM DỰ BUỔI GẶP MẶT THÀNH VIÊN MỚI",
            mailData(meetingDataWithFullName) // Sử dụng dữ liệu Meeting mới tạo
          );
        }

        // Phản hồi thành công sau khi gửi tất cả email
        return res.status(200).json({ message: "Mail sent to all members about the new meeting!" });

      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}