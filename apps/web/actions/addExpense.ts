'use server';

import { Id, api } from '@repo/convex';
import { fetchMutation } from 'convex/nextjs';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  title: z
    .string({
      invalid_type_error: 'Invalid title',
      required_error: 'Title is required',
    })
    .min(1, {
      message: 'Must be 1 or more characters long',
    })
    .max(32, {
      message: 'Must be 32 or fewer characters long',
    }),
  tags: z.string({
    invalid_type_error: 'Invalid tag',
    required_error: 'Tag is required',
  }),
  amount: z
    .string({
      invalid_type_error: 'Invalid amount',
      required_error: 'Title is required',
    })
    .min(1, {
      message: 'Must be 1 or more characters long',
    })
    .max(32, {
      message: 'Must be 32 or fewer characters long',
    }),
  type: z.enum(['IN', 'OUT']),
  userId: z
    .string()
    .min(32, { message: 'Must be 32 characters long' })
    .max(32, { message: 'Must be 32 characters long' }),
});

export async function addExpenseAction(formData: FormData) {
  const { data, success, error } = schema.safeParse({
    title: formData.get('title'),
    tags: formData.get('tags'),
    amount: formData.get('amount'),
    type: formData.get('type'),
    userId: formData.get('userId'),
  });

  const userId = data?.userId as Id<'users'>;

  if (!success)
    return {
      errors: error.flatten().fieldErrors,
    };

  await fetchMutation(api.transactions.add, { ...data, userId });
  revalidatePath('/');
}
