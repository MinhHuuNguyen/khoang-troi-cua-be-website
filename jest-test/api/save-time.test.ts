import { NextApiRequest, NextApiResponse } from "next";
import handler from "@/pages/api/save_interview_time";
import prisma from "@/libs/prisma";

jest.mock("@/libs/prisma", () => ({
  memberRegistration: {
    update: jest.fn(),
  },
}));

describe("Save Interview Time API", () => {
  let req: Partial<NextApiRequest>;
  let res: Partial<NextApiResponse>;

  beforeEach(() => {
    req = {
      method: "PATCH",
      body: {
        id: 1,
        dateTime: "2023-10-01T10:00:00Z",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      setHeader: jest.fn(),
      end: jest.fn(),
    };

    (prisma.memberRegistration.update as jest.Mock).mockResolvedValue({
      id: 1,
      interviewTime: "2023-10-01T10:00:00Z",
    });
  });

  it("should update interview time and return the updated member", async () => {
    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(prisma.memberRegistration.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { interviewTime: "2023-10-01T10:00:00Z" },
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      interviewTime: "2023-10-01T10:00:00Z",
    });
  });

  it("should return 405 on unsupported method", async () => {
    req.method = "DELETE";

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.setHeader).toHaveBeenCalledWith('Allow', ['PATCH']);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.end).toHaveBeenCalledWith("Method DELETE Not Allowed");
  });

  it("should return 400 on invalid request body", async () => {
    req.body = { id: "invalid", dateTime: 12345 };

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid request body" });
  });

  it("should handle errors", async () => {
    (prisma.memberRegistration.update as jest.Mock).mockRejectedValue(new Error("Test error"));

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Something went wrong" });
  });
});