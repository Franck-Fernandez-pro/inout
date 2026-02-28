import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const transactions = {
  title: v.string(),
  tags: v.optional(v.string()),
  amount: v.string(),
  type: v.union(v.literal('IN'), v.literal('OUT')),
  userId: v.string(),
};

export default defineSchema({
  transactions: defineTable(transactions).index('by_user_type', [
    'userId',
    'type',
  ]),
});
