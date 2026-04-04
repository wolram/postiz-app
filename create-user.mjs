import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const email = 'marlow.dsds@gmail.com';
    const existingUser = await prisma.user.findFirst({ where: { email } });
    
    if (existingUser) {
        console.log('User already exists:', existingUser);
        return;
    }

    const hashedPassword = await bcrypt.hash('Postiz@123', 10);
    const user = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword,
            providerName: 'LOCAL',
            name: 'Marlow',
            timezone: 0,
            audience: 0,
            activated: true,
        }
    });

    console.log('User created successfully:', user.email);
    console.log('Password: Postiz@123');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
