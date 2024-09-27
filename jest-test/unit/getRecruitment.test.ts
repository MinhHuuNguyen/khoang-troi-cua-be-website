import prisma from "@/libs/prisma";

describe('Get member registration with status REVIEWING', () => {
  beforeAll(async () => {
    // Connect to the database
    await prisma.$connect();
  });

  afterAll(async () => {
    // Clean up after all tests
    await prisma.$disconnect();
  });
  it('should retrieve the member registrations with status REVIEWING', async () => {
    const members = await prisma.memberRegistration.findMany({
      where: {
        status: "REVIEWING",
      },
      include: {
        position: {
          select: {
            name: true,
          },
        },
      },
    });
    expect(members[0].status).toBe("REVIEWING");
    console.log(members);
  });
});

describe('Get member registration with status REVIEWING', () => {
  beforeAll(async () => {
    // Connect to the database
    await prisma.$connect();
  });

  afterAll(async () => {
    // Clean up after all tests
    await prisma.$disconnect();
  });
  it('should retrieve the member registrations with status INTERVIEW', async () => {
    const interviews = await prisma.memberRegistration.findMany({
      where: {
        status: "INTERVIEW",
      },
      include: {
        position: {
          select: {
            name: true,
          },
        },
      },
    });
    expect(interviews[0].status).toBe("INTERVIEW");
    console.log(interviews);
  });
});