import type { Knex } from "knex";
import type { Modifiers } from "../../types/Modifiers";

const applyPagination = (b: Knex.QueryBuilder, mods: Modifiers) => {
  const opts = mods?.pagination;
  const type = opts?.type || "page";
  const limit = parseInt(opts?.limit?.toString() || "15");
  const offset = parseInt(opts?.offset?.toString() || "1");

  if (type === "page") {
    b.limit(limit).offset((offset - 1) * limit);
  }
};

export default applyPagination;
