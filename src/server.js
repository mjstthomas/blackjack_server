require("dotenv").config();
const knex = require("knex");
const app = require("./app");
const { PORT, DATABASE_URL } = require("./config");

const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
});

app.set("db", db);

app.listen(PORT, (res, req) => {
  console.log(`Listening at http://localhost:${PORT}`);
});
