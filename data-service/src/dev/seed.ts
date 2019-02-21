import { prisma } from '../generated/prisma-client';
import { accountTypes, users } from './seed.data';

async function main() {
  for (let i = 0; i < accountTypes.length; i++) {
    const accountType = accountTypes[i];
    const newAccountType = await prisma.createAccountType(accountType);
    console.log(
      `Created new account type: ${newAccountType.name} (ID: ${
        newAccountType.id
      })`
    );
  }

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const newUser = await prisma.createUser(user);
    console.log(`Created new user: ${newUser.email} ${newUser.firebaseId}`);
  }
}

main().catch(console.error);
