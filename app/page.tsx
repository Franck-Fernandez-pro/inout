import TransactionsTable from '@/components/TransactionsTable';
import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';

export default async function Home() {
  const expenses = await fetchQuery(api.expenses.get);
  return (
    <main className="container mx-auto gap-10 mt-10 grid grid-cols-2">
      {expenses ? (
        <>
          <TransactionsTable title="Outcome" transactions={expenses} />
          <TransactionsTable title="Income" transactions={expenses} />
        </>
      ) : (
        'No expenses'
      )}
    </main>
  );
}
