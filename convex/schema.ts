import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  expenses: defineTable({
    title: v.string(),
    tags: v.array(v.string()),
    amount: v.number(),
  }),
});
