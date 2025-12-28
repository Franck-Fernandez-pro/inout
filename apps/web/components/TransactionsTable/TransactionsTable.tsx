import { Doc } from '@repo/convex';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { HTMLProps } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import TransactionModal from '../TransactionModal';
import DeleteButton from './DeleteButton';

const formatCurrency = (amount: number | bigint | Intl.StringNumericLiteral) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);

export default function TransactionsTable({
  className,
  transactions,
  type,
}: {
  className?: HTMLProps<HTMLElement>['className'];
  transactions: Doc<'transactions'>[];
  type: Doc<'transactions'>['type'];
}) {
  const total = transactions.reduce(
    (acc, { amount }) => acc + Number(amount),
    0,
  );

  return (
    <Card className="fit-content">
      <CardHeader className="px-7">
        <CardTitle className="flex items-center gap-2">
          {type === 'IN' ? 'Income' : 'Outcome'}
          <TransactionModal type={type} />

          <span className="ml-auto text-gray-500 text-sm">
            {type === 'IN'
              ? `+${formatCurrency(total)}`
              : `-${formatCurrency(total)}`}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Table className={className} data-testid={`transactions_table_${type}`}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Title</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="capitalize">
            {transactions.map(({ _id, title, tags, amount }) => (
              <TableRow key={_id}>
                <TableCell className="font-bold flex gap-2">
                  {title}
                  <DeleteButton id={_id} />
                </TableCell>
                <TableCell>{tags.length ? tags : '-'}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(Number(amount))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
