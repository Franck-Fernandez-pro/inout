import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const transactions = {
  title: v.string(),
  tags: v.string(),
  amount: v.string(),
  type: v.union(v.literal('IN'), v.literal('OUT')),
};

export default defineSchema({
  transactions: defineTable(transactions),
});
