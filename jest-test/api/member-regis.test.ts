import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '@/pages/api/member_registration';
import prisma from '@/libs/prisma';
import { sendMail } from '@/mailer/mailService';
import {mailMemberRegistration} from '@/mailer/templates/member-registration-complete';

jest.mock('@/mailer/mailService', () => ({
  sendMail: jest.fn(),
}));

jest.mock("@/mailer/templates/member-registration-complete");

describe('Member Registration API (Integration)', () => {
  beforeAll(async () => {
    // Connect to the database
    await prisma.$connect();
  });

  afterAll(async () => {
    // Disconnect from the database
    await prisma.$disconnect();
  });

  it('creates a new member registration and retrieves the ID from the database', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        full_name: 'John Doe',
        birthday: '2000-07-29',
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

    // Call the API handler
    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    // Retrieve the member from the database directly to get the ID
    const member = await prisma.memberRegistration.findFirst({
      where: { email: 'john.doe@example.com' },
    });

    // Assert that the member is found and retrieve the ID
    expect(member).not.toBeNull();
    expect(member?.fullName).toBe('John Doe');

    expect(res._getStatusCode()).toBe(201);

    expect(sendMail).toHaveBeenCalledWith(
      ["john.doe@example.com"],
      "CẢM ƠN BẠN ĐÃ ĐĂNG KÝ THÀNH VIÊN KHOẢNG TRỜI CỦA BÉ",
      mailMemberRegistration(member)
    );
  });

  it('should return 405 if method is not POST', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(405);
  });

  it('should return 500 if there is an error', async () => {
    // Induce an error by passing invalid data
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        full_name: 'John Doe',
        birthday: 'invalid-date', // Invalid date format
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
