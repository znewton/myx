import * as React from 'react';
import Authenticator from 'auth/Authenticator';

import { Button } from 'shared/Button';

export const Play: React.SFC = () => {
  const [user, setUser] = React.useState<firebase.User | null>(null);

  React.useEffect(() => {
    Authenticator.addAuthListener(setUser);
  });
  console.log(user);
  return (
    <div>
      <Button onClick={Authenticator.signOut}>Log out</Button>
    </div>
  );
};
