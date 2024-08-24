import { createMocks } from 'node-mocks-http';
import prisma from '@/libs/prisma';

jest.mock('@/libs/prisma', () => ({
  memberRegistration: {
    create: jest.fn(),
  },
}));

describe('Member Registration', () => {
  it('should create a new member with correct data', async () => {
    const data = {
      full_name: 'Jane Doe',
      birthday: '1995-02-15',
      phone_number: '0987654321',
      email: 'jane.doe@example.com',
      address: '123 Main St',
      work_place: 'Company XYZ',
      has_social_activities: '1',
      memories: 'Great memories from the past',
      position: '2',
      hope_to_receive: 'More community support',
    };

    const mockMember = {
      id: 1,
      fullName: 'Jane Doe',
      birthday: new Date('1995-02-15'),
      phoneNumber: '0987654321',
      email: 'jane.doe@example.com',
      address: '123 Main St',
      workPlace: 'Company XYZ',
      hasSocialActivities: true,
      memories: 'Great memories from the past',
      positionId: 2,
      hopeToReceive: 'More community support',
      position: {
        name: 'Member',
      },
    };

    (prisma.memberRegistration.create as jest.Mock).mockResolvedValue(mockMember);

    const hasSocialActivities = data.has_social_activities === '1';

    const member = await prisma.memberRegistration.create({
      data: {
        fullName: data.full_name,
        birthday: new Date(data.birthday),
        phoneNumber: data.phone_number,
        email: data.email,
        address: data.address,
        workPlace: data.work_place,
        hasSocialActivities: hasSocialActivities,
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

    expect(member).toEqual(mockMember);
    expect(prisma.memberRegistration.create).toHaveBeenCalledWith({
      data: {
        fullName: data.full_name,
        birthday: new Date(data.birthday),
        phoneNumber: data.phone_number,
        email: data.email,
        address: data.address,
        workPlace: data.work_place,
        hasSocialActivities: hasSocialActivities,
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
  });
});
