import type { Knex } from "knex";
import type { Resource } from "../../types/Resource";

export const getColumns = (rs: Resource, client: Knex) =>
  rs.fields
    .map((field) => {
      const column = field.ref;

      return client.ref(column).as(field.name || column);
    })
    .concat(client.ref(rs.key).as("id"));
