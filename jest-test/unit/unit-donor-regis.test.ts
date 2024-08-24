import { createMocks } from 'node-mocks-http';
import prisma from '@/libs/prisma';
import { kindOfDonation } from '@prisma/client';

jest.mock('@/libs/prisma', () => ({
  donorRegistration: {
    create: jest.fn(),
  },
}));

describe('Donor Registration', () => {
  it('should create a new donor with correct data', async () => {
    const data = {
      full_name: 'John Doe',
      birthday: '1990-01-01',
      email: 'john.doe@example.com',
      phone_number: '1234567890',
      kind_of_donate: '1',
      donation_image: 'https://picsum.photos/200/300',
    };

    const mockDonor = {
      id: 1,
      fullName: 'John Doe',
      birthday: new Date('1990-01-01'),
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      kindOfDonation: kindOfDonation.MONEY,
      donationImage: 'https://picsum.photos/200/300',
    };

    (prisma.donorRegistration.create as jest.Mock).mockResolvedValue(mockDonor);

    const donor = await prisma.donorRegistration.create({
      data: {
        fullName: data.full_name,
        birthday: new Date(data.birthday),
        email: data.email,
        phoneNumber: data.phone_number,
        kindOfDonation:
          data.kind_of_donate == '1'
            ? kindOfDonation.MONEY
            : kindOfDonation.GOODS,
        donationImage: 'https://picsum.photos/200/300', // random image
      },
    });

    expect(donor).toEqual(mockDonor);
    expect(prisma.donorRegistration.create).toHaveBeenCalledWith({
      data: {
        fullName: data.full_name,
        birthday: new Date(data.birthday),
        email: data.email,
        phoneNumber: data.phone_number,
        kindOfDonation: kindOfDonation.MONEY,
        donationImage: 'https://picsum.photos/200/300', // random image
      },
    });
  });
});