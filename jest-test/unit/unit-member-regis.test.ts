import { createMocks } from 'node-mocks-http';
import prisma from '@/libs/prisma';
import { tr } from 'date-fns/locale';

describe('Member Registration', () => {
  beforeAll(async () => {
    // Connect to the database
    await prisma.$connect();
  });

  afterAll(async () => {
    // Disconnect from the database
    await prisma.$disconnect();
  });

  it('should create a new member with correct data', async () => {
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

    const member = await prisma.memberRegistration.create({
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
      },
      include: {
        position: {
          select: {
            name: true,
          },
        },
      },
    });

    const createdMember= await prisma.memberRegistration.findUnique({
      where: { id: member.id },
    });

    expect(createdMember).toEqual(expect.objectContaining({
      id: member.id,
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
    }));
  });
});
