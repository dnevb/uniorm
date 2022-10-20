import type { Knex } from "knex";
import type { Modifiers } from "../../types/Modifiers";

const operators: Record<
  string,
  (q: Knex.QueryBuilder, col: string, value: any) => void
> = {
  eq: (b, k, v) => b.where(k, v),
  ne: (b, k, v) => b.whereNot(k, v),
  in: (b, k, v) => b.whereIn(k, v),
  ni: (b, k, v) => b.whereNotIn(k, v),
  gt: (b, k, v) => b.where(k, ">", v),
  ge: (b, k, v) => b.where(k, ">=", v),
  lt: (b, k, v) => b.where(k, "<", v),
  le: (b, k, v) => b.where(k, "<=", v),
  contains: (b, k, v) => b.where(k, "like", `%${v}%`),
  startsWith: (b, k, v) => b.where(k, "like", `${v}%`),
  endsWith: (b, k, v) => b.where(k, "like", `%${v}`),
  between: (b, k, v) => b.whereBetween(k, [v.min, v.max]),
};

const iterate = (obj: Record<string, any>, fn: (k: string, v: any) => void) =>
  Object.keys(obj).forEach((key) => fn(key, obj[key]));

const applyFilter = (b: Knex.QueryBuilder, mods: Modifiers) => {
  const filter = mods.filter || {};

  iterate(filter, (key, value) => {
    if (["and", "or"].includes(key)) {
      if (key === "and")
        b.andWhere((qb) => applyFilter(qb, { ...mods, filter: value }));
      if (key === "or")
        b.orWhere((qb) => applyFilter(qb, { ...mods, filter: value }));
    } else
      iterate(value, (op, value) => {
        if (op in operators) operators[op]!(b, key, value);
      });
  });
};

export default applyFilter;
