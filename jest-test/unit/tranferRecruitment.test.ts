import prisma from "@/libs/prisma"; // Adjust the import path to your prisma setup
import { id } from "date-fns/locale";

describe("transferMemberRegistrations (Real Database)", () => {
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

  it("should transfer member registrations and return the transferred IDs", async () => {
    // Fetch the member registrations
    const memberRegistrations = await prisma.memberRegistration.findMany({
      where: {
        id: registrationId,
      },
    });

    let transferredIds = [];
    let createdMemberId: number = 0;
    for (const registration of memberRegistrations) {
      const newMember = await prisma.member.create({
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
      createdMemberId = newMember.id;
      transferredIds.push(registration.id);
    
      // Delete the registration after transfer
      await prisma.memberRegistration.delete({
        where: { id: registration.id },
      });
    }

    // Assert that the IDs were transferred
    expect(transferredIds).toEqual([registrationId]);

    // Assert that the member was created
    const createdMember = await prisma.member.findUnique({
      where: { id: createdMemberId },
    });
    expect(createdMember?.fullName).toBe("Jane Doe");
    console.log(createdMember);

    // Assert that the member registration was deleted
    const deletedRegistration = await prisma.memberRegistration.findUnique({
      where: { id: registrationId},
    });
    expect(deletedRegistration).toBeNull();
  });
});
