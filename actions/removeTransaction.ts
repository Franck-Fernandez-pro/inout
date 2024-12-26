'use server';

import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { fetchMutation } from 'convex/nextjs';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  id: z
    .string({
      invalid_type_error: 'Invalid id',
      required_error: 'Id is required',
    })
    .min(1, {
      message: 'Must be 1 or more characters long',
    })
    .max(32, {
      message: 'Must be 32 or fewer characters long',
    }),
});

export async function removeTransaction(id: string) {
  const { data, success, error } = schema.safeParse({
    id,
  });
  if (!success)
    return {
      errors: error.flatten().fieldErrors,
    };

  await fetchMutation(api.transactions.remove, {
    id: data.id as Doc<'transactions'>['_id'],
  });
  revalidatePath('/');
}
