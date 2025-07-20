import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { addExpenseAction } from '@/actions/addExpense';
import { Doc } from '@/convex/_generated/dataModel';
import { UserIdInput } from './auth';

const TAGS = ['insurance', 'rent', 'bank', 'other'];

export default function TransactionModal({
  type,
}: {
  type: Doc<'transactions'>['type'];
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <PlusCircle className="size-3" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add expense</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="hidden">
          Add a new expense to your transactions
        </AlertDialogDescription>

        <form action={addExpenseAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Netflix"
              required
              autoFocus
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tags">Tags</Label>
            <Select name="tags" required>
              <SelectTrigger>
                <SelectValue className="capitalize" placeholder="-" />
              </SelectTrigger>
              <SelectContent>
                {TAGS.map((tag) => (
                  <SelectItem className="capitalize" value={tag} key={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="text"
              placeholder="19.99"
              required
            />
          </div>

          <input name="type" type="hidden" value={type} />
          <UserIdInput />

          <div className="flex gap-3 justify-end mt-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
