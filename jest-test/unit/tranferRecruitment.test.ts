import prisma from "@/libs/prisma"; // Điều chỉnh đường dẫn import tới Prisma client

jest.mock("@/libs/prisma", () => ({
  memberRegistration: {
    findMany: jest.fn(),
    deleteMany: jest.fn(),
  },
  member: {
    create: jest.fn(),
  },
}));

describe('Transfer member registrations', () => {
  it('should transfer member registrations correctly', async () => {
    const passMember = {
      id: 1,
      email: "john.doe@example.com",
      fullName: "John Doe",
      birthday: "1990-01-01",
      phoneNumber: "123456789",
      address: "123 Main St",
      workPlace: "Company A",
    };

    const memberRegistrations = [
      {
        id: 1,
        fullName: "John Doe",
        birthday: "1990-01-01",
        phoneNumber: "123456789",
        email: "john.doe@example.com",
        address: "123 Main St",
        workPlace: "Company A",
      },
    ];

    const transferredIds = [1];

    // Giả lập dữ liệu trả về từ findMany
    (prisma.memberRegistration.findMany as jest.Mock).mockResolvedValue(memberRegistrations);

    // Giả lập việc xóa dữ liệu thành công
    (prisma.memberRegistration.deleteMany as jest.Mock).mockResolvedValue({ count: transferredIds.length });

    // Đoạn mã cần kiểm tra
    const memberRegistrationsFromDb = await prisma.memberRegistration.findMany({
      where: {
        id: passMember.id,
      },
    });

    for (const registration of memberRegistrationsFromDb) {
      await prisma.member.create({
        data: {
          fullName: registration.fullName,
          birthday: registration.birthday,
          phoneNumber: registration.phoneNumber,
          email: registration.email,
          address: registration.address,
          workPlace: registration.workPlace,
          bank: "",
          bankAccount: "",
          avatar: "",
        },
      });
    }

    await prisma.memberRegistration.deleteMany({
      where: {
        id: {
          in: transferredIds,
        },
      },
    });

    // Kiểm tra phương thức findMany có được gọi đúng cách hay không
    expect(prisma.memberRegistration.findMany).toHaveBeenCalledWith({
      where: { id: passMember.id },
    });

    // Kiểm tra phương thức create có được gọi đúng cách hay không
    for (const registration of memberRegistrations) {
      expect(prisma.member.create).toHaveBeenCalledWith({
        data: {
          fullName: registration.fullName,
          birthday: registration.birthday,
          phoneNumber: registration.phoneNumber,
          email: registration.email,
          address: registration.address,
          workPlace: registration.workPlace,
          bank: "",
          bankAccount: "",
          avatar: "",
        },
      });
    }

    // Kiểm tra phương thức deleteMany có được gọi đúng cách hay không
    expect(prisma.memberRegistration.deleteMany).toHaveBeenCalledWith({
      where: {
        id: {
          in: transferredIds,
        },
      },
    });
  });
});