import type { Resource } from "../../types/Resource";
import type { SqlAdapterOpts } from "./adapter";

export const getColumns = (rs: Resource, opts: SqlAdapterOpts) =>
  !opts.strict
    ? "*"
    : rs.fields
        .map((field) => {
          const column = field.ref;

          return opts.client.ref(column).as(field.name || column);
        })
        .concat(opts.client.ref(rs.key))
        .concat(opts.client.ref(rs.key).as("id"));
