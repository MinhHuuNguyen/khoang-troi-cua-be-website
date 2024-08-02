import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/donor_registration';
import prisma from '@/libs/prisma';
import { sendMail } from '@/mailer/mailService';
import { mailDonorRegistration } from '@/mailer/templates/donor-registration-complete';
import type { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@/libs/prisma', () => ({
  donorRegistration: {
    create: jest.fn(),
  },
}));
jest.mock('@/mailer/mailService', () => ({
  sendMail: jest.fn(),
}));
jest.mock('@/mailer/templates/donor-registration-complete', () => ({
  mailDonorRegistration: jest.fn(),
}));

describe('Donor Registration API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Create a new donor registration', async () => {
    const mockDonor = {
      id: 1,
      fullName: 'John Doe',
      birthday: '2000-01-01',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      kindOfDonation: 'MONEY',
      donationImage: 'https://picsum.photos/200/300',
    };

    (prisma.donorRegistration.create as jest.Mock).mockResolvedValue(mockDonor);
    (sendMail as jest.Mock).mockResolvedValue(true);
    (mailDonorRegistration as jest.Mock).mockReturnValue('Mail content');

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        full_name: 'John Doe',
        birthday: '2000-01-01',
        email: 'john.doe@example.com',
        phone_number: '1234567890',
        kind_of_donate: '1',
      },
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(prisma.donorRegistration.create).toHaveBeenCalledWith({
      data: {
        fullName: 'John Doe',
        birthday: new Date('2000-01-01'),
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        kindOfDonation: 'MONEY',
        donationImage: 'https://picsum.photos/200/300',
      },
    });

    expect(sendMail).toHaveBeenCalledWith(
      ['john.doe@example.com'],
      'CẢM ƠN BẠN ĐÃ ỦNG HỘ VÀO QUỸ KHOẢNG TRỜI CỦA BÉ',
      'Mail content',
    );

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toEqual(mockDonor);
  });

  it('should return 405 if method is not POST', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(405);
  });

  it('should return 500 if there is an error', async () => {
    (prisma.donorRegistration.create as jest.Mock).mockRejectedValue(new Error('Database error'));

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        full_name: 'John Doe',
        birthday: '2000-01-01',
        email: 'john.doe@example.com',
        phone_number: '1234567890',
        kind_of_donate: '1',
      },
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({ message: 'Something went wrong' });
  });
});