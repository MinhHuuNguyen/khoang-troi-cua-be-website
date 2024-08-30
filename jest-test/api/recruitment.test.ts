import { NextApiRequest, NextApiResponse } from "next";
import handler from "@/pages/api/recruitment_management";
import prisma from "@/libs/prisma";
import { sendMail } from "@/mailer/mailService";
import { MemberRegistrationStatus } from "@prisma/client";
import mailMemberFormPass from "@/mailer/templates/recruit-members/member-form-pass";
import mailMemberInterviewPass from "@/mailer/templates/recruit-members/member-interview-pass";

jest.mock("@/mailer/mailService");
jest.mock("@/mailer/templates/recruit-members/member-form-pass");
jest.mock("@/mailer/templates/recruit-members/member-interview-pass");
jest.mock('@/libs/prisma', () => ({
  memberRegistration: {
    update: jest.fn(),
    findMany: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
    create: jest.fn(),
  },
  member: {
    create: jest.fn(),
  },
}));

describe("Recruitment Management API", () => {
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

  it("should update member registration status on PATCH", async () => {
    req.method = "PATCH";
    req.body = {
      id: 1,
      status: MemberRegistrationStatus.INTERVIEW,
      email: "test@example.com",
      test: "test",
      type: "FORM",
    };

    (prisma.memberRegistration.update as jest.Mock).mockResolvedValue(req.body);
    (sendMail as jest.Mock).mockResolvedValue(true);

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(prisma.memberRegistration.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { status: MemberRegistrationStatus.INTERVIEW },
    });
    expect(sendMail).toHaveBeenCalledWith(
      ["test@example.com"],
      "MỜI PHỎNG VẤN THÀNH VIÊN KHOẢNG TRỜI CỦA BÉ",
      mailMemberFormPass(req.body)
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it("should return interviews on GET", async () => {
    req.method = "GET";

    const interviews = [
      {
        id: 1,
        status: "INTERVIEW",
        position: { name: "Tình nguyện viên" },
      },
    ];

    (prisma.memberRegistration.findMany as jest.Mock).mockResolvedValue(interviews);

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(prisma.memberRegistration.findMany).toHaveBeenCalledWith({
      where: { status: "INTERVIEW" },
      include: { position: { select: { name: true } } },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(interviews);
  });

  it("should create member and delete registration on POST", async () => {
    req.method = "POST";
    req.body = {
      id: 1,
      email: "test@example.com",
      fullName: "John Doe",
      birthday: "1990-01-01",
      phoneNumber: "123456789",
      address: "123 Street",
      workPlace: "Company",
    };

    const memberRegistrations = [
      {
        id: 1,
        fullName: "John Doe",
        birthday: "1990-01-01",
        phoneNumber: "123456789",
        email: "test@example.com",
        address: "123 Street",
        workPlace: "Company",
      },
    ];

    (prisma.memberRegistration.findMany as jest.Mock).mockResolvedValue(memberRegistrations);
    (prisma.member.create as jest.Mock).mockResolvedValue(true);
    (sendMail as jest.Mock).mockResolvedValue(true);
    (prisma.memberRegistration.deleteMany as jest.Mock).mockResolvedValue(true);

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(prisma.memberRegistration.findMany).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(prisma.member.create).toHaveBeenCalledWith({
      data: {
        fullName: "John Doe",
        birthday: "1990-01-01",
        phoneNumber: "123456789",
        email: "test@example.com",
        address: "123 Street",
        workPlace: "Company",
        bank: "",
        bankAccount: "",
        avatar: "",
      },
    });
    expect(sendMail).toHaveBeenCalledWith(
      ["test@example.com"],
      "KẾT QUẢ TRÚNG TUYỂN THÀNH VIÊN KHOẢNG TRỜI CỦA BÉ",
      mailMemberInterviewPass(memberRegistrations[0])
    );
    expect(prisma.memberRegistration.deleteMany).toHaveBeenCalledWith({
      where: { id: { in: [1] } },
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ transferredIds: [1] });
  });

  it("should return 405 on unsupported method", async () => {
    req.method = "DELETE";

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.end).toHaveBeenCalled();
  });

  it("should handle errors", async () => {
    req.method = "PATCH";
    req.body = {
      id: 1,
      status: MemberRegistrationStatus.INTERVIEW,
      email: "test@example.com",
      test: "test",
      type: "FORM",
    };

    (prisma.memberRegistration.update as jest.Mock).mockRejectedValue(new Error("Test error"));

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Something went wrong" });
  });
});