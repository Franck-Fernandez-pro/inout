import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';

export default async function Home() {
  const expenses = await fetchQuery(api.expenses.get);
  return (
    <main>
      {expenses.map(({ title, amount, tags }) => (
        <>
          <div>{title}</div>
          <div>{amount}</div>
          <div>{tags.length ? tags : 'No tags'}</div>
        </>
      ))}
    </main>
  );
}
