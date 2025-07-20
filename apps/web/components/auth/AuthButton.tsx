import { isAuthenticatedNextjs } from '@convex-dev/auth/nextjs/server';
import { SignIn } from './SignIn';

export async function AuthButton({ className = '' }: { className?: string }) {
  const isLogged = await isAuthenticatedNextjs();
  return <SignIn className={className} isAuthenticated={isLogged} />;
}
