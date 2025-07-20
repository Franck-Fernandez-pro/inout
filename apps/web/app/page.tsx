import { AuthButton } from '@/components/auth';

export default async function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen gap-3">
      <AuthButton />
    </main>
  );
}
