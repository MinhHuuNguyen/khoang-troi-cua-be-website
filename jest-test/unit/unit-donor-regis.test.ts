import { createMocks } from 'node-mocks-http';
import prisma from '@/libs/prisma';
import { kindOfDonation } from '@prisma/client';

describe('Donor Registration', () => {
  beforeAll(async () => {
    // Connect to the database
    await prisma.$connect();
  });

  afterAll(async () => {
    // Disconnect from the database
    await prisma.$disconnect();
  });

  it('should create a new donor with correct data', async () => {
    const data = {
      full_name: 'John Doe',
      birthday: '1990-01-01',
      email: 'john.doe@example.com',
      phone_number: '1234567890',
      kind_of_donate: '1',
      donation_image: 'https://picsum.photos/200/300',
    };

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

    const createdDonor = await prisma.donorRegistration.findUnique({
      where: { id: donor.id },
    });

    expect(createdDonor).toEqual(expect.objectContaining({
      id: donor.id,
      fullName: data.full_name,
      birthday: new Date(data.birthday),
      email: data.email,
      phoneNumber: data.phone_number,
      kindOfDonation: kindOfDonation.MONEY,
      donationImage: 'https://picsum.photos/200/300', // random image
    }));
  });
});