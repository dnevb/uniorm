import knex from "knex";
import tap from "tap";
import uniorm from "../dist/orm.js";
import createSqlAdapter from "../dist/sqladapter/index.js";
import options from "./options.json" assert { type: "json" };
import schema from "./schema.json" assert { type: "json" };

const db = knex(options);
const sql = createSqlAdapter({ client: db, strict: true });
const client = uniorm({
  defaultAdapter: "sql",
  adapters: { sql },
  resources: schema,
});

tap.test("album insert", async (t) => {
  const res = await client
    .rs("Album")
    .create({ input: { Title: "Gin", ArtistId: 270 } });

  await client.rs("Album").delete({ key: res.id });

  t.end();
});

tap.test("artist update", async (t) => {
  const name = "Nash Ensemble";
  await client.rs("Artist").update({ key: 274, input: { name: "Gin" } });

  await client.rs("Artist").update({ key: 274, input: { name } });

  t.end();
});

tap.teardown(() => sql.client.destroy());
