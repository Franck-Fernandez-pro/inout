import { AuthButton } from '@/components/auth';
import TransactionsTable from '@/components/TransactionsTable';
import { api } from '@repo/convex';
import { getTokenFromCookie } from '@/lib';
import { fetchQuery } from 'convex/nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const cookieStore = await cookies();
  const jwt = getTokenFromCookie(cookieStore);
  if (!jwt) return redirect('/');

  const userId = jwt.userId;
  const [transactionsIn, transactionsOut] = await Promise.all([
    fetchQuery(api.transactions.get, { type: 'IN', userId }),
    fetchQuery(api.transactions.get, { type: 'OUT', userId }),
  ]);

  return (
    <main className="container mx-auto pt-5">
      <div className="w-full flex justify-end">
        <AuthButton />
      </div>
      <div className="gap-10 grid grid-cols-2 mt-5">
        <TransactionsTable type="IN" transactions={transactionsIn} />
        <TransactionsTable type="OUT" transactions={transactionsOut} />
      </div>
    </main>
  );
}
