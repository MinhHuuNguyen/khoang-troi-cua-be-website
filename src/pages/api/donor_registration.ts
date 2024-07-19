import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import { kindOfDonation } from "@prisma/client";
import { DonorRegistrationInputType } from "@/components/features/donor-registration/types";
import { sendMail } from "@/mailer/mailService";
import { mailDonorRegistration } from "@/mailer/templates/donor-registration-complete";
import newDonorRegis from "@/mailer/templates/internal-mail/new-donor-regis";

const fs = require("fs");
const internalEmails = JSON.parse(
  fs.readFileSync("src/utils/data/json/internal_email.json", "utf8")
);
const ktcbMail = internalEmails.emails;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST":
        const data: DonorRegistrationInputType = req.body;

        if (!data) {
          return res.status(400).json({ message: "Content not found" });
        }

        const donor = await prisma.donorRegistration.create({
          data: {
            fullName: data.full_name,
            birthday: new Date(data.birthday),
            email: data.email,
            phoneNumber: data.phone_number,
            kindOfDonation:
              data.kind_of_donate == "1"
                ? kindOfDonation.MONEY
                : kindOfDonation.GOODS,
            donationImage: "https://picsum.photos/200/300", // random image
          },
        });
        await sendMail(
          [data.email],
          "CẢM ƠN BẠN ĐÃ ỦNG HỘ VÀO QUỸ KHOẢNG TRỜI CỦA BÉ",
          mailDonorRegistration(donor),
        );

        for (const email of ktcbMail) {
          await sendMail(
            [email],
            "CÓ ĐƠN ĐĂNG KÝ MỚI",
            newDonorRegis(data)
          );
        }

        return res.status(201).json(donor);
      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
