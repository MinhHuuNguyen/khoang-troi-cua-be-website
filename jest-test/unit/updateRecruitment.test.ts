import prisma from "@/libs/prisma";
import { MemberRegistrationStatus } from "@prisma/client";

describe('Update status member registration', () => {
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
  it('should update the status of a member registration', async () => {
    // Update the status of the member registration
    const updatedMember = await prisma.memberRegistration.update({
      where: {
        id: registrationId,
      },
      data: {
        status: MemberRegistrationStatus.INTERVIEW,
      },
    });

    // Verify that the status was updated correctly
    expect(updatedMember.status).toBe(MemberRegistrationStatus.INTERVIEW);

    // Fetch the member registration from the database to verify the change
    const fetchedMember = await prisma.memberRegistration.findUnique({
      where: { id: registrationId },
    });
    expect(fetchedMember?.status).toBe(MemberRegistrationStatus.INTERVIEW);
    console.log(fetchedMember);
  });
});
