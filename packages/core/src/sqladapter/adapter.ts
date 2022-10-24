import type { Knex } from "knex";
import type { Adapter } from "../../types/Adapter";
import { getColumns } from "./columns.js";
import { applyModifiers } from "./modifiers.js";

export interface SqlAdapterOpts {
  client: Knex;
  strict?: boolean;
  soft?: string;
}

const createSqlAdapter = (opts: SqlAdapterOpts): Adapter<Knex> => ({
  client: opts.client,
  findMany(rs, args) {
    const columns = getColumns(rs, opts);

    const query = applyModifiers(this.client(rs.ref), args);

    if (opts.soft) query.where(opts.soft, false);

    return query.select(columns);
  },
  findOne(rs, args) {
    const columns = getColumns(rs, opts);

    return this.client(rs.ref).select(columns).where(rs.key, args.key).first();
  },
  create(rs, args) {
    return this.client.transaction(async (trx) => {
      const columns = getColumns(rs, opts);
      const ids = await trx(rs.ref).insert(args.input);

      return trx(rs.ref).select(columns).whereIn(rs.key, ids).first();
    });
  },
  update(rs, args) {
    return this.client.transaction(async (trx) => {
      const columns = getColumns(rs, opts);
      const ids = await trx(rs.ref).update(args.input).where(rs.key, args.key);

      return trx(rs.ref).select(columns).whereIn(rs.key, [ids]).first();
    });
  },
  delete(rs, args) {
    return this.client.transaction(async (trx) => {
      if (opts.soft)
        return trx(rs.ref)
          .update(opts.soft)
          .where(rs.key, args.key)
          .then((ids) => trx(rs.ref).where(rs.key, ids));

      const item = trx(rs.ref).where(rs.key, args.key).first();

      await trx(rs.ref).del().where(rs.key, args.key);

      return item;
    });
  },
});

export default createSqlAdapter;
