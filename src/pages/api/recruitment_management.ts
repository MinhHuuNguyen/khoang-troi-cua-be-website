import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import { sendMail } from "@/mailer/mailService";
import { MemberRegistrationStatus } from "@prisma/client";
import mailMemberInterviewPass from "@/mailer/templates/recruit-members/member-interview-pass";
import mailMemberInterviewFail from "@/mailer/templates/recruit-members/member-interview-fail";
import mailMemberFormPass from "@/mailer/templates/recruit-members/member-form-pass";
import mailMemberFormFail from "@/mailer/templates/recruit-members/member-form-fail";

export interface UpdateMemberRegistrationDto {
  id: number;
  status: MemberRegistrationStatus;
  interviewTime?: any;
  test: string;
  email: string;
  type: "FORM" | "INTERVIEW";
}

export interface PassMemberRegistrationDto {
  id: number;
  email: string;
  fullName: string;
  birthday: any;
  phoneNumber: string;
  address: string;
  workPlace: string;
}

const MAILS = {
  FORM: {
    PASSED: {
      subject: "MỜI PHỎNG VẤN THÀNH VIÊN KHOẢNG TRỜI CỦA BÉ",
      template: mailMemberFormPass,
    },
    FAILED: {
      subject: "KẾT QUẢ VÒNG ĐƠN KHOẢNG TRỜI CỦA BÉ",
      template: mailMemberFormFail,
    },
  },
  INTERVIEW: {
    PASSED: {
      subject: "KẾT QUẢ TRÚNG TUYỂN THÀNH VIÊN KHOẢNG TRỜI CỦA BÉ",
      template: mailMemberInterviewPass,
    },
    FAILED: {
      subject: "KẾT QUẢ VÒNG PHỎNG VẤN KHOẢNG TRỜI CỦA BÉ",
      template: mailMemberInterviewFail,
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "PATCH":
        const data: UpdateMemberRegistrationDto = req.body;

        if (!data) {
          return res.status(400).json({ message: "Content not found" });
        }

        const member = await prisma.memberRegistration.update({
          where: {
            id: data.id,
          },
          data: {
            status: data.status,
          },
        });

        const status =
          data.status === "PASSED" || data.status === "INTERVIEW"
            ? "PASSED"
            : "FAILED";

        await sendMail(
          [data.email],
          MAILS[data.type][status].subject,
          MAILS[data.type][status].template(member)
        );

        return res.status(201).json(member);

      case "GET":
        const interviews = await prisma.memberRegistration.findMany({
          where: {
            status: "INTERVIEW",
          },
          include: {
            position: {
              select: {
                name: true,
              },
            },
          },
        });

        return res.status(200).json(interviews);

      case "POST":
        const passMember: PassMemberRegistrationDto = req.body;
        // Bước 1: Truy vấn dữ liệu từ MemberRegistration
        const memberRegistrations = await prisma.memberRegistration.findMany(
          {
            where: {
              id: passMember.id,
            },
          }
        );

        // Khởi tạo một mảng để lưu trữ ID của những bản ghi được chuyển
        let transferredIds = [];

        // Bước 2: Tạo bản ghi mới trong Member với dữ liệu đã lấy
        for (const registration of memberRegistrations) {
          await prisma.member.create({
            data: {
              fullName: registration.fullName,
              birthday: registration.birthday,
              phoneNumber: registration.phoneNumber,
              email: registration.email,
              address: registration.address,
              workPlace: registration.workPlace,
              // Giả sử các trường như bank, bankAccount, avatar được xử lý khác hoặc có giá trị mặc định
              bank: "", // Cập nhật giá trị phù hợp
              bankAccount: "", // Cập nhật giá trị phù hợp
              avatar: "", // Cập nhật giá trị phù hợp
            },
          });

          // Lưu ID của bản ghi vừa được chuyển
          transferredIds.push(registration.id);
        }

        // Bước 3: Xóa những bản ghi trong MemberRegistration mà đã được chuyển
        await prisma.memberRegistration.deleteMany({
          where: {
            id: {
              in: transferredIds, // Sử dụng mảng ID đã lưu để chỉ định những bản ghi cần xóa
            },
          },
        });

        return res.status(201).json({ transferredIds });

      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
