import * as React from 'react';
import Authenticator from 'auth/Authenticator';

import { Button } from 'shared/Button';

export const Play: React.SFC = () => {
  return (
    <div>
      <Button onClick={Authenticator.signOut}>Log out</Button>
    </div>
  );
};
