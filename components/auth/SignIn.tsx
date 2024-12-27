'use client';

import { useAuthActions } from '@convex-dev/auth/react';
import { Button } from '../ui/button';

export function SignIn({ isAuthenticated }: { isAuthenticated: boolean }) {
  const { signIn, signOut } = useAuthActions();

  return isAuthenticated ? (
    <Button onClick={() => signOut()}>Sign out</Button>
  ) : (
    <Button onClick={() => signIn('github', { redirectTo: '/' })}>
      Sign in with GitHub
    </Button>
  );
}
