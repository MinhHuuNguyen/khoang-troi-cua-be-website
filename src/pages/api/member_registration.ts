import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import { sendMail } from "@mailer/mailService";
import mailData from "@mailer/templates/recruit-members/member-registration-complete";
import internalMail from "@mailer/templates/recruit-members/new-registration";
import mailMemberInterviewFail from "@/mailer/templates/recruit-members/member-interview-fail";
import mailMemberFormFail from "@/mailer/templates/recruit-members/member-form-fail";
import { MemberRegistrationStatus } from "@prisma/client";
import { de } from "date-fns/locale";

interface getMemberRegistrationDto {
  status: MemberRegistrationStatus;
}

export interface deleteMemberRegistrationDto {
  id: number;
}
const fs = require("fs");
const testData = JSON.parse(
  fs.readFileSync("src/utils/data/json/recruitment_test.json", "utf8")
);
const defaultValue = testData[0].name;
const internalEmails = JSON.parse(
  fs.readFileSync("src/utils/data/json/internal_email.json", "utf8")
);
const ktcbMail = internalEmails.emails;

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
            test: defaultValue,
          },
          include: {
            position: {
              select: {
                name: true,
              },
            },
          },
        });

        await new Promise(async (resolve, reject) => {
          try {
            // Send mail to user
            const userMailResult = await sendMail(
              [data.email],
              "CẢM ƠN BẠN ĐÃ ĐĂNG KÝ THÀNH VIÊN KHOẢNG TRỜI CỦA BÉ",
              mailData(member)
            );
        
            // send mail to internal
            const internalMailResult = await sendMail(
              [ktcbMail],
              "THÔNG BÁO ĐĂNG KÝ MỚI",
              internalMail(member)
            );
        
            resolve({userMailResult, internalMailResult});
            res.status(200).json({ message: "Mail sent to user and internal!" });
          } catch (err: any) {
            reject(err);
            return res.status(500).json({
              error: err.message || "Something went wrong",
            });
          }
        });

      case "GET":
        const registrations = await prisma.memberRegistration.findMany({
          where: {
            status: "REVIEWING",
          },
          include: {
            position: {
              select: {
                name: true,
              },
            },
          },
        });

        return res.status(200).json(registrations);

      case "PATCH":
        const deletedData: deleteMemberRegistrationDto = req.body;

        if (!deletedData) {
          return res.status(400).json({ message: "Content not found" });
        }

        // Get registration info
        const registrationInfo = await prisma.memberRegistration.findUnique({
          where: {
            id: deletedData.id,
          },
        });

        if (!registrationInfo) {
          return res.status(404).json({ message: "Registration not found" });
        }

        if (registrationInfo.status === "REVIEWING") {
          await sendMail(
            [registrationInfo.email],
            "KẾT QUẢ VÒNG ĐƠN KHOẢNG TRỜI CỦA BÉ",
            mailMemberFormFail(registrationInfo),
            ktcbMail
          );
        } else if (registrationInfo.status === "INTERVIEW") {
          await sendMail(
            [registrationInfo.email],
            "KẾT QUẢ VÒNG PHỎNG VẤN KHOẢNG TRỜI CỦA BÉ",
            mailMemberInterviewFail(registrationInfo),
            ktcbMail
          );
        }

        const deleteMember = await prisma.memberRegistration.delete({
          where: {
            id: deletedData.id,
          },
        });

        return res.status(201).json(deleteMember);

      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
