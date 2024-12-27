import { isAuthenticatedNextjs } from '@convex-dev/auth/nextjs/server';
import { SignIn } from './SignIn';

export async function AuthButton() {
  const isLogged = await isAuthenticatedNextjs();
  return <SignIn isAuthenticated={isLogged} />;
}
