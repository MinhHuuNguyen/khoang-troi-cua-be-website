import { NextApiRequest, NextApiResponse } from "next";
import handler from "@/pages/api/member_registration";
import prisma from "@/libs/prisma";
import { sendMail } from "@/mailer/mailService";
import mailData from "@/mailer/templates/recruit-members/member-registration-complete";
import newMember from "@/mailer/templates/internal-mail/new-member-regis";
import formEmail from "@/mailer/templates/internal-mail/save-form-email";
import mailMemberInterviewFail from "@/mailer/templates/recruit-members/member-interview-fail";
import mailMemberFormFail from "@/mailer/templates/recruit-members/member-form-fail";
import saveInterviewEmail from "@/mailer/templates/internal-mail/save-interview-email";

const fs = require("fs");
const testData = JSON.parse(
  fs.readFileSync("src/utils/data/json/recruitment_test.json", "utf8")
);
const defaultValue = testData[0].name;

jest.mock("@/libs/prisma", () => ({
  memberRegistration: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock("@/mailer/mailService", () => ({
  sendMail: jest.fn(),
}));

jest.mock("@/mailer/templates/recruit-members/member-registration-complete");
jest.mock("@/mailer/templates/internal-mail/new-member-regis");
jest.mock("@/mailer/templates/internal-mail/save-form-email");
jest.mock("@/mailer/templates/internal-mail/save-interview-email");
jest.mock("@/mailer/templates/recruit-members/member-interview-fail");
jest.mock("@/mailer/templates/recruit-members/member-form-fail");

describe("Member Registration API", () => {
  let req: Partial<NextApiRequest>;
  let res: Partial<NextApiResponse>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      end: jest.fn(),
    };
  });

  it("should create a new member registration on POST", async () => {
    req.method = "POST";
    req.body = {
      full_name: "John Doe",
      birthday: "1990-01-01",
      phone_number: "123456789",
      email: "john.doe@example.com",
      address: "123 Main St",
      work_place: "Company",
      has_social_activities: "1",
      memories: "Some memories",
      position: "1",
      hope_to_receive: "Some hope",
    };

    const member = {
      id: 1,
      fullName: "John Doe",
      birthday: new Date("1990-01-01"),
      phoneNumber: "123456789",
      email: "john.doe@example.com",
      address: "123 Main St",
      workPlace: "Company",
      hasSocialActivities: true,
      memories: "Some memories",
      positionId: 1,
      hopeToReceive: "Some hope",
      test: defaultValue,
      position: { name: "Position Name" },
    };

    (prisma.memberRegistration.create as jest.Mock).mockResolvedValue(member);

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(prisma.memberRegistration.create).toHaveBeenCalledWith({
      data: {
        fullName: "John Doe",
        birthday: new Date("1990-01-01"),
        phoneNumber: "123456789",
        email: "john.doe@example.com",
        address: "123 Main St",
        workPlace: "Company",
        hasSocialActivities: true,
        memories: "Some memories",
        positionId: 1,
        hopeToReceive: "Some hope",
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

    expect(sendMail).toHaveBeenCalledWith(
      ["john.doe@example.com"],
      "CẢM ƠN BẠN ĐÃ ĐĂNG KÝ THÀNH VIÊN KHOẢNG TRỜI CỦA BÉ",
      mailData(member)
    );

    expect(sendMail).toHaveBeenCalledWith(
      expect.any(Array),
      "CÓ ĐƠN ĐĂNG KÝ MỚI",
      newMember(member)
    );
  });

  it("should return member registrations on GET", async () => {
    req.method = "GET";

    const registrations = [
      {
        id: 1,
        status: "REVIEWING",
        position: { name: "Tình nguyện viên" },
      },
    ];

    (prisma.memberRegistration.findMany as jest.Mock).mockResolvedValue(registrations);

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(prisma.memberRegistration.findMany).toHaveBeenCalledWith({
      where: { status: "REVIEWING" },
      include: { position: { select: { name: true } } },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(registrations);
  });

  it("should delete a member registration on registration", async () => {
    req.method = "PATCH";
    req.body = { id: 1 };

    const registrationInfo = {
      id: 1,
      email: "john.doe@example.com",
      status: "REVIEWING",
    };

    (prisma.memberRegistration.findUnique as jest.Mock).mockResolvedValue(registrationInfo);
    (prisma.memberRegistration.delete as jest.Mock).mockResolvedValue(registrationInfo);

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(prisma.memberRegistration.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(sendMail).toHaveBeenCalledWith(
      ["john.doe@example.com"],
      "KẾT QUẢ VÒNG ĐƠN KHOẢNG TRỜI CỦA BÉ",
      mailMemberFormFail(registrationInfo)
    );

    expect(sendMail).toHaveBeenCalledWith(
      expect.any(Array),
      "ỨNG VIÊN BỊ LOẠI VÒNG ĐƠN",
      formEmail(registrationInfo)
    );

    expect(prisma.memberRegistration.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(registrationInfo);
  });

  it("should delete a member registration on interview", async () => {
    req.method = "PATCH";
    req.body = { id: 1 };

    const registrationInfo = {
      id: 1,
      email: "john.doe@example.com",
      status: "INTERVIEW",
    };

    (prisma.memberRegistration.findUnique as jest.Mock).mockResolvedValue(registrationInfo);
    (prisma.memberRegistration.delete as jest.Mock).mockResolvedValue(registrationInfo);

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(prisma.memberRegistration.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(sendMail).toHaveBeenCalledWith(
      ["john.doe@example.com"],
      "KẾT QUẢ VÒNG PHỎNG VẤN KHOẢNG TRỜI CỦA BÉ",
      mailMemberInterviewFail(registrationInfo)
    );

    expect(sendMail).toHaveBeenCalledWith(
      expect.any(Array),
      "ỨNG VIÊN BỊ LOẠI VÒNG ĐƠN",
      saveInterviewEmail(registrationInfo)
    );

    expect(prisma.memberRegistration.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(registrationInfo);
  });


  it("should return 500 on error", async () => {
    req.method = "POST";
    req.body = {};

    (prisma.memberRegistration.create as jest.Mock).mockRejectedValue(new Error("Test error"));

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Something went wrong" });
  });
});