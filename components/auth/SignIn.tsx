'use client';

import { useAuthActions } from '@convex-dev/auth/react';
import { Button } from '../ui/button';

export function SignIn({
  className,
  isAuthenticated,
}: {
  className?: string;
  isAuthenticated: boolean;
}) {
  const { signIn, signOut } = useAuthActions();

  return isAuthenticated ? (
    <Button className={className} variant="outline" onClick={() => signOut()}>
      Sign out
    </Button>
  ) : (
    <Button
      className={className}
      onClick={() => signIn('github', { redirectTo: '/' })}
    >
      Sign in with GitHub
    </Button>
  );
}
