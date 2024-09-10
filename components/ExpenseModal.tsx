import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const TAGS = ['insurance', 'rent', 'bank'];

export function ExpenseModal() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="default">
          <Plus className="size-3" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add expense</AlertDialogTitle>
        </AlertDialogHeader>

        <form action="" className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" type="text" placeholder="Netflix" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="title">Tags</Label>
            <Select required>
              <SelectTrigger className="">
                <SelectValue placeholder="-" />
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
            <Input id="amount" type="number" placeholder="19.99" required />
          </div>

          <div className="flex gap-3 justify-end mt-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Add</AlertDialogAction>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
