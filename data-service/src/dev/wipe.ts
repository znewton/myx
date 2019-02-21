import { prisma } from '../generated/prisma-client';
import { accountTypes, users } from './seed.data';

async function main() {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const deletedUser = await prisma.deleteUser({
      email: user.email,
    });
    console.log(`Deleted User: ${deletedUser.email} ${deletedUser.firebaseId}`);
  }

  for (let i = 0; i < accountTypes.length; i++) {
    const accountType = accountTypes[i];
    const deletedAccountType = await prisma.deleteAccountType({
      name: accountType.name,
    });
    console.log(`Deleted AccountType: ${deletedAccountType.name}`);
  }
}

main().catch(console.error);
