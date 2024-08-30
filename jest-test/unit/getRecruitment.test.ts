import prisma from "@/libs/prisma";
import { mock } from "node:test";

jest.mock("@/libs/prisma", () => ({
  memberRegistration: {
    findMany: jest.fn(),
  },
}));

describe('Get member registration with status REVIEWING', () => {
  it('should retrieve the member registrations with status REVIEWING', async () => {
    const mockMembers = [
      {
        id: 1,
        status: "REVIEWING",
        position: { name: "Developer" },
      },
      {
        id: 2,
        status: "REVIEWING",
        position: { name: "Designer" },
      },
    ];

    (prisma.memberRegistration.findMany as jest.Mock).mockResolvedValue(mockMembers);

    const members = await prisma.memberRegistration.findMany({
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

    expect(prisma.memberRegistration.findMany).toHaveBeenCalledWith({
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

    expect(members).toEqual(mockMembers);
  });
});

describe('Get member registration with status REVIEWING', () => {
    it('should retrieve the member registrations with status INTERVIEW', async () => {
      const mockInterviews = [
        {
          id: 1,
          status: "INTERVIEW",
          position: { name: "Developer" },
        },
        {
          id: 2,
          status: "INTERVIEW",
          position: { name: "Designer" },
        },
      ];
  
      (prisma.memberRegistration.findMany as jest.Mock).mockResolvedValue(mockInterviews);
  
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
  
      expect(prisma.memberRegistration.findMany).toHaveBeenCalledWith({
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
  
      expect(interviews).toEqual(mockInterviews);
    });
  });