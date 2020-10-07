const knex = require("knex");
const app = require("../src/app");
const supertest = require("supertest");

describe("leaderBoardRouter endpoints", () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  const testData = [
    {
      id: "1",
      user_name: "Me",
      user_email: "me@gmail.com",
      password: "password",
      wins: 10,
      total_games: 20,
      correct: 15,
    },
    {
      id: "2",
      user_name: "Myself",
      user_email: "myself@gmail.com",
      password: "mypassword",
      wins: 59,
      total_games: 75,
      correct: 94,
    },
    {
      id: "3",
      user_name: "I",
      user_email: "I@gmail.com",
      password: "thispassword",
      wins: 900,
      total_games: 901,
      correct: 1,
    },
  ];
  function createTestUsers() {
    let testUsers = [];

    testData.forEach((user) => {
      const testUser = {
        id: user.id,
        user_name: user.user_name,
        user_email: user.user_email,
        password: user.password,
      };
      testUsers.push(testUser);
    });

    return testUsers;
  }

  function createTestPurse() {
    let testPurse = [];

    testData.forEach((user) => {
      const userPurse = {
        id: user.id,
        wins: user.wins,
        total_games: user.total_games,
        correct: user.correct,
      };
      testPurse.push(userPurse);
    });

    return testPurse;
  }
  after("disconnect from db", () => db.destroy());

  before("cleanup", () => {
    return db.transaction((trx) =>
      trx.raw(
        `TRUNCATE
                users,
                user_purse
                RESTART IDENTITY CASCADE`
      )
    );
  });

  afterEach("cleanup", () => {
    return db.transaction((trx) =>
      trx.raw(
        `TRUNCATE
                users,
                user_purse
                RESTART IDENTITY CASCADE`
      )
    );
  });

  beforeEach("inserts users", () => {
    return db.into("users").insert(createTestUsers());
  });
  beforeEach("inserts purse", () => {
    return db.into("user_purse").insert(createTestPurse());
  });
  context("/api/leaderboard", () => {
    it("responds with all users", () => {
      const users = [...testData]
      return supertest(app).get(`/api/LeaderBoard/`).expect(200, testData);
    });

  });
});
