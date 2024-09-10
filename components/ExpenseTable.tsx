import { Doc } from '@/convex/_generated/dataModel';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { HTMLProps } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function ExpenseTable({
  className,
  expenses,
}: {
  className?: HTMLProps<HTMLElement>['className'];
  expenses: Doc<'expenses'>[];
}) {
  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Expenses</CardTitle>
      </CardHeader>

      <CardContent>
        <Table className={className}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Title</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {expenses.map(({ _id, title, tags, amount }) => (
              <TableRow key={_id}>
                <TableCell className="font-bold">{title}</TableCell>
                <TableCell>{tags.length ? tags : '-'}</TableCell>
                <TableCell className="text-right">{amount} €</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
