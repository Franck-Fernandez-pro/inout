import { SignIn } from '@/components/auth';
import TransactionsTable from '@/components/TransactionsTable';
import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';

export default async function Home() {
  const [transactionsIn, transactionsOut] = await Promise.all([
    fetchQuery(api.transactions.get, { type: 'IN' }),
    fetchQuery(api.transactions.get, { type: 'OUT' }),
  ]);

  return (
    <main className="container mx-auto ">
      <SignIn />
      <div className="gap-10 mt-10 grid grid-cols-2">
        <TransactionsTable type="IN" transactions={transactionsIn} />
        <TransactionsTable type="OUT" transactions={transactionsOut} />
      </div>
    </main>
  );
}
