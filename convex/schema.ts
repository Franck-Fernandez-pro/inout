import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  expenses: defineTable({
    title: v.string(),
    tags: v.string(),
    amount: v.string(),
  }),
});
