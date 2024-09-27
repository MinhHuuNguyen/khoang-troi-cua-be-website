import prisma from "@/libs/prisma"; // Adjust the import path to your prisma setup

describe('Delete member registration (Real Database)', () => {
  // Seed database before each test
  let registrationId: number;
  beforeEach(async () => {
    const data = {
      full_name: 'Jane Doe',
      birthday: '1995-02-15',
      phone_number: '0987654321',
      email: 'jane.doe@example.com',
      address: '123 Main St',
      work_place: 'Company XYZ',
      has_social_activities: true,
      memories: 'Great memories from the past',
      position: '2',
      hope_to_receive: 'More community support',
    };
    // Create a member registration entry
    const registration = await prisma.memberRegistration.create({
      data: {
        fullName: data.full_name,
        birthday: new Date(data.birthday),
        phoneNumber: data.phone_number,
        email: data.email,
        address: data.address,
        workPlace: data.work_place,
        hasSocialActivities: data.has_social_activities,
        memories: data.memories,
        positionId: parseInt(data.position),
        hopeToReceive: data.hope_to_receive,
        test: "test",
      },
      include: {
        position: {
          select: {
            name: true,
          },
        },
      },
    });

    registrationId = registration.id;
  });

  it('should delete the member and ensure the data no longer exists', async () => {
    // Ensure the data exists before deletion
    const existingMember = await prisma.memberRegistration.findUnique({
      where: {
        id: registrationId,
      },
    });
    expect(existingMember).not.toBeNull();

    // Perform the deletion
    const deletedMember = await prisma.memberRegistration.delete({
      where: {
        id: registrationId,
      },
    });

    // Verify the data was deleted
    expect(deletedMember.id).toBe(registrationId);

    // Verify the data no longer exists after deletion
    const nonExistentMember = await prisma.memberRegistration.findUnique({
      where: {
        id: registrationId,
      },
    });
    expect(nonExistentMember).toBeNull();
  });
});
