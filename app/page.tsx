import ExpenseTable from '@/components/ExpenseTable';
import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';

export default async function Home() {
  const expenses = await fetchQuery(api.expenses.get);
  return (
    <main className="max-w-5xl mx-auto mt-5">
      {expenses ? (
        <ExpenseTable className="" expenses={expenses} />
      ) : (
        'No expenses'
      )}
    </main>
  );
}
