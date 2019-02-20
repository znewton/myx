import * as React from 'react';
import Authenticator from 'auth/Authenticator';

import { Button } from 'shared/Button';

export const Play: React.SFC = () => {
  const [user, setUser] = React.useState<firebase.User | null>(null);

  React.useEffect(() => {
    const removeAuthListener = Authenticator.addAuthListener(setUser);
    return () => {
      removeAuthListener();
    };
  });
  console.log(user);
  return (
    <div>
      <Button onClick={Authenticator.signOut}>Log out</Button>
    </div>
  );
};
