import type { Model } from "../types/Model";
import type { Resource } from "../types/Resource";
import type { UniormOptions } from "../types/Uniorm";

export const createModel = (rs: Resource, opts: UniormOptions): Model => {
  const adapter = opts.adapters[rs.adapter || opts.defaultAdapter]!;

  return {
    resource: rs,
    findMany: (args, ctx) => adapter.findMany(rs, args, ctx),
    findOne: (args, ctx) => adapter.findOne(rs, args, ctx),
    create: (args, ctx) => adapter.create(rs, args, ctx),
    update: (args, ctx) => adapter.update(rs, args, ctx),
    delete: (args, ctx) => adapter.delete(rs, args, ctx),
  };
};

export const createModels = (opts: UniormOptions) =>
  new Map(
    opts.resources.map((item) => [
      item.name || item.ref,
      createModel(item, opts),
    ])
  );
