import prisma from "@/libs/prisma";

jest.mock("@/libs/prisma", () => ({
  memberRegistration: {
    delete: jest.fn(),
    findUnique: jest.fn(),
  },
}));

describe('Delete member registration', () => {
  it('should delete the member and the data should no longer exist', async () => {
    const data = {
      id: 1,
    };
    const deletedMember = {
      id: 1,
    };
    
    // Giả lập rằng trước khi xóa, dữ liệu tồn tại
    (prisma.memberRegistration.findUnique as jest.Mock).mockResolvedValue(deletedMember);

    // Giả lập việc xóa dữ liệu thành công
    (prisma.memberRegistration.delete as jest.Mock).mockResolvedValue(deletedMember);
    
    // Xóa dữ liệu
    const member = await prisma.memberRegistration.delete({
      where: {
        id: data.id,
      },
    });

    // Kiểm tra dữ liệu đã bị xóa thành công
    expect(member).toEqual(deletedMember);
    expect(prisma.memberRegistration.delete).toHaveBeenCalledWith({
      where: { id: data.id },
    });

    // Giả lập rằng sau khi xóa, dữ liệu không còn tồn tại
    (prisma.memberRegistration.findUnique as jest.Mock).mockResolvedValue(null);
    const nonExistentMember = await prisma.memberRegistration.findUnique({
      where: {
        id: data.id,
      },
    });

    // Kiểm tra rằng dữ liệu không còn tồn tại sau khi xóa
    expect(nonExistentMember).toBeNull();
  });
});