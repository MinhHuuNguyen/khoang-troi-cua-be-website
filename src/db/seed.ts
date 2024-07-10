import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // seed users
  const password = await hash("ktcbtest", 12);
  const user = await prisma.user.upsert({
    where: { email: "ktcb@gmail.com" },
    update: {},
    create: {
      email: "ktcb@gmail.com",
      username: "KTCB Admin",
      password,
    },
  });
  console.log({ user });
  // seed positions
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
