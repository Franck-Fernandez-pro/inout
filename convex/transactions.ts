import { mutation, query } from './_generated/server';
import { transactions } from './schema';

export const get = query({
  args: {},
  handler: async (ctx) => await ctx.db.query('transactions').collect(),
});

export const add = mutation({
  args: transactions,
  handler: async (ctx, data) => await ctx.db.insert('transactions', data),
});
