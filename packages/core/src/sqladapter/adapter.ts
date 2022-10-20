import knex, { Knex } from "knex";
import type { Adapter } from "../../types/Adapter";
import { getColumns } from "./columns.js";
import { applyModifiers } from "./modifiers.js";

const createSqlAdapter = (opts: Knex.Config): Adapter<Knex> => ({
  client: knex(opts),
  findMany(rs, args) {
    const columns = getColumns(rs, this.client);

    return applyModifiers(this.client(rs.ref).select(columns), args);
  },
  findOne(rs, args) {
    const columns = getColumns(rs, this.client);

    return this.client(rs.ref).select(columns).where(rs.key, args.key).first();
  },
  create(rs) {
    return this.client(rs.ref);
  },
  update(rs) {
    return this.client(rs.ref);
  },
  delete(rs) {
    return this.client(rs.ref);
  },
});

export default createSqlAdapter;
