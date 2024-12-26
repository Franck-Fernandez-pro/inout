'use client';

import { useAuthActions } from '@convex-dev/auth/react';
import { Button } from '../ui/button';

export function SignIn() {
  const { signIn } = useAuthActions();

  return (
    <Button onClick={() => signIn('github', { redirectTo: '/' })}>
      Sign in with GitHub
    </Button>
  );
}
