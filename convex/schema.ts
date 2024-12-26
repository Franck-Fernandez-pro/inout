import { defineSchema, defineTable } from 'convex/server';
import { authTables } from '@convex-dev/auth/server';
import { v } from 'convex/values';

export const transactions = {
  title: v.string(),
  tags: v.string(),
  amount: v.string(),
  type: v.union(v.literal('IN'), v.literal('OUT')),
};

export default defineSchema({
  transactions: defineTable(transactions).index('by_type', ['type']),
  ...authTables,
});
