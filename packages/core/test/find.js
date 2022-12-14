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

tap.test("find many", async (t) => {
  const res = await client.rs("Album").findMany({});

  t.equal(res.length, 15);
  t.equal(res[0].Artist, 1);

  t.end();
});

tap.test("find one", async (t) => {
  const res = await client.rs("Album").findOne({ key: 89 });

  t.equal(res.id, 89);
  t.equal(res.Title, "American Idiot");

  t.end();
});

tap.teardown(() => sql.client.destroy());
