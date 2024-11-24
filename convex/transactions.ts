import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const get = query({
  args: {},
  handler: async (ctx) => await ctx.db.query('transactions').collect(),
});

export const add = mutation({
  args: { title: v.string(), tags: v.string(), amount: v.string() },
  handler: async (ctx, data) => await ctx.db.insert('transactions', data),
});
