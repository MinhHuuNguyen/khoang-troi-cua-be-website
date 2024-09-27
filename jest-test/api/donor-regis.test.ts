import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '@/pages/api/donor_registration';
import prisma from '@/libs/prisma';
import { mailDonorRegistration } from '@/mailer/templates/donor-registration-complete';
import { sendMail } from '@/mailer/mailService';

jest.mock('@/mailer/mailService', () => ({
  sendMail: jest.fn(),
}));
jest.mock('@/mailer/templates/donor-registration-complete', () => ({
  mailDonorRegistration: jest.fn(),
}));

describe('Member Registration API (Integration)', () => {
  beforeAll(async () => {
    // Connect to the database
    await prisma.$connect();
  });

  afterAll(async () => {
    // Disconnect from the database
    await prisma.$disconnect();
  });

  it('creates a new donor registration and retrieves the ID from the database', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        full_name: 'John Doe donor',
        birthday: '2000-01-01',
        email: 'john.doe@example.com',
        phone_number: '1234567890',
        kind_of_donate: '1',
      },
    });

    // Call the API handler
    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    // Retrieve the member from the database directly to get the ID
    const donor = await prisma.donorRegistration.findFirst({
      where: { fullName: 'John Doe donor' },
    });

    // Assert that the member is found and retrieve the ID
    expect(donor).not.toBeNull();
    expect(donor?.email).toBe('john.doe@example.com');

    expect(res._getStatusCode()).toBe(201);
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
        full_name: 'John Doe donor',
        birthday: 'invalid-date',
        email: 'john.doe@example.com',
        phone_number: '1234567890',
        kind_of_donate: '1',
      },
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toEqual({ message: 'Something went wrong' });
  });
});
