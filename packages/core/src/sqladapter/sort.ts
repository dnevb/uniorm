import type { Knex } from "knex";
import type { Modifiers, Sort } from "../../types/Modifiers";

export const parseSort = (sort?: Sort) => {
  if (typeof sort === "string") return { column: sort, order: "asc" };
  else
    return {
      column: sort?.column || "id",
      order: sort?.order || "asc",
    };
};

const applySort = (b: Knex.QueryBuilder, mods: Modifiers) => {
  const sort = parseSort(mods.sort);

  b.orderBy(sort.column, sort.order);
};

export default applySort;
