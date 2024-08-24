import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '@/pages/api/member_registration';
import prisma from '@/libs/prisma';
import { sendMail } from '@mailer/mailService';
import { mailMemberRegistration } from '@mailer/templates/member-registration-complete';

// Mock the dependencies
jest.mock('@/libs/prisma', () => ({
  memberRegistration: {
    create: jest.fn(),
  },
}));
jest.mock('@/mailer/mailService', () => ({
  sendMail: jest.fn(),
}));
jest.mock('@/mailer/templates/member-registration-complete', () => ({
  mailMemberRegistration: jest.fn(),
}));

describe('Member Registration API', () => {
  it('Create a new member registration', async () => {
    const mockMemberRegis = {
      id: 1,
      fullName: 'John Doe',
      birthday: '2000-01-01',
      phoneNumber: '1234567890',
      email: 'john.doe@example.com',
      address: '123 Main St',
      workPlace: 'Company',
      hasSocialActivities: true,
      memories: 'Some memories',
      positionId: 1,
      hopeToReceive: 'Some hopes',
      position: { name: 'Position' },
    };

    // Set up mock implementations
    (prisma.memberRegistration.create as jest.Mock).mockResolvedValue(mockMemberRegis);
    (sendMail as jest.Mock).mockResolvedValue(true);
    (mailMemberRegistration as jest.Mock).mockReturnValue('Mail content');

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        full_name: 'John Doe',
        birthday: '2000-01-01',
        phone_number: '1234567890',
        email: 'john.doe@example.com',
        address: '123 Main St',
        work_place: 'Company',
        has_social_activities: '1',
        memories: 'Some memories',
        position: '1',
        hope_to_receive: 'Some hopes',
      },
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(prisma.memberRegistration.create).toHaveBeenCalledWith({
      data: {
        fullName: 'John Doe',
        birthday: new Date('2000-01-01'),
        phoneNumber: '1234567890',
        email: 'john.doe@example.com',
        address: '123 Main St',
        workPlace: 'Company',
        hasSocialActivities: true,
        memories: 'Some memories',
        positionId: 1,
        hopeToReceive: 'Some hopes',
      },
      include: {
        position: {
          select: {
            name: true,
          },
        },
      },
    });

    expect(sendMail).toHaveBeenCalledWith(
      [mockMemberRegis.email],
      'CẢM ƠN BẠN ĐÃ ĐĂNG KÝ THÀNH VIÊN KHOẢNG TRỜI CỦA BÉ',
      'Mail content',
    );

    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData()).toEqual(mockMemberRegis);
  });

  it('should return 405 if method is not POST', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(405);
  });

  it('should return 500 if there is an error', async () => {
    // Set up mock implementation to throw an error
    (prisma.memberRegistration.create as jest.Mock).mockRejectedValue(new Error('Database error'));

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        full_name: 'John Doe',
        birthday: '2000-01-01',
        phone_number: '1234567890',
        email: 'john.doe@example.com',
        address: '123 Main St',
        work_place: 'Company',
        has_social_activities: '1',
        memories: 'Some memories',
        position: '1',
        hope_to_receive: 'Some hopes',
      },
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toEqual({ message: 'Something went wrong' });
  });
});