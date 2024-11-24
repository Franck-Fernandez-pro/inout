import TransactionsTable from '@/components/TransactionsTable';
import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';

export default async function Home() {
  const transactions = await fetchQuery(api.transactions.get);
  return (
    <main className="container mx-auto gap-10 mt-10 grid grid-cols-2">
      {transactions ? (
        <>
          <TransactionsTable type="IN" transactions={transactions} />
          <TransactionsTable type="OUT" transactions={transactions} />
        </>
      ) : (
        'No transactions'
      )}
    </main>
  );
}
