require("dotenv").config();

const supertest = require("supertest");
const knex = require("knex");
const app = require("../src/app");
const { expect } = require("chai");

describe("table strategy", () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());
  afterEach("disconnect from db", () => db.destroy());

  it("should return empty object if id is above 21", () => {
    const value = 22;
    return supertest(app).get(`/api/strategy/${value}`).expect({});
  });

  it("should return strategy object if id is 21 or below", () => {
    const expectedStrategy = {
      2: "s",
      3: "s",
      4: "s",
      5: "s",
      6: "s",
      7: "s",
      8: "s",
      9: "s",
      10: "s",
      id: 18,
      A: "s",
      K: "s",
      Q: "s",
      J: "s",
    };

    return supertest(app).get("/api/strategy/18").expect(200, expectedStrategy);
  });

  it("should return entire strategy table", () => {
    return supertest(app).get("api/strategy").expect(200);
  });
});
