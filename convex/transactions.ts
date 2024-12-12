import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { transactions } from './schema';

export const get = query({
  args: { type: transactions.type },
  handler: async (ctx, { type }) =>
    await ctx.db
      .query('transactions')
      .filter((q) => q.eq(q.field('type'), type))
      .order('asc')
      .collect(),
});

export const add = mutation({
  args: transactions,
  handler: async (ctx, data) => await ctx.db.insert('transactions', data),
});

export const remove = mutation({
  args: { id: v.id('transactions') },
  handler: async (ctx, { id }) => await ctx.db.delete(id),
});
