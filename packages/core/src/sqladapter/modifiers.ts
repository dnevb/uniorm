import type { Knex } from "knex";
import type { Modifiers } from "../../types/Modifiers";
import applyFilter from "./filter.js";
import applyPagination from "./pagination.js";
import applySort from "./sort.js";

export const applyModifiers = (qb: Knex.QueryBuilder, mods: Modifiers = {}) => {
  applyPagination(qb, mods);
  applySort(qb, mods);
  applyFilter(qb, mods);

  return qb;
};
