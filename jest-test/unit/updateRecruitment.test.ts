import prisma from "@/libs/prisma";
import { MemberRegistrationStatus } from "@prisma/client";

jest.mock("@/libs/prisma", () => ({
  memberRegistration: {
    update: jest.fn(),
  },
}));

describe('Update status member registration', () => {
  it('should update status', async () => {
    const updatedMember = {
      id: 1,
      status: MemberRegistrationStatus.INTERVIEW, 
    };

    (prisma.memberRegistration.update as jest.Mock).mockResolvedValue(updatedMember);

    const member = await prisma.memberRegistration.update({
      where: {
        id: 1,
      },
      data: {
        status: MemberRegistrationStatus.INTERVIEW,
      },
    });

    expect(member).toEqual(updatedMember);
    expect(prisma.memberRegistration.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { status: MemberRegistrationStatus.INTERVIEW },
    });
  });
});
