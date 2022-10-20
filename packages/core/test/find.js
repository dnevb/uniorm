import tap from "tap";
import uniorm from "../dist/orm.js";
import createSqlAdapter from "../dist/sqladapter/index.js";

const sql = createSqlAdapter({
  client: "sqlite3",
  debug: true,
  connection: {
    filename: "test/chinook.db",
  },
});

/** @type {import('../types/Resource').Resource} */
const Album = {
  name: "Album",
  key: "AlbumId",
  ref: "albums",
  fields: [
    {
      ref: "Title",
      type: "str",
    },
    {
      name: "Artist",
      ref: "ArtistId",
      type: "int",
    },
  ],
};

const client = uniorm({
  defaultAdapter: "sql",
  adapters: { sql },
  resources: [Album],
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
