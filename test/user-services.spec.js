const userService = require('../userRouter/user-service')
const knex = require('knex')
const app = require('../src/app')
const { expect } = require('chai')

describe.only('user services', ()=> {
    let db

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
        }
    ]
    function createTestUsers(){
        let testUsers = []

        testData.forEach(user =>{
            const testUser = {
                id: user.id,
                user_name: user.user_name,
                user_email: user.user_email,
                password: user.password
            }
            testUsers.push(testUser)
        })

        return testUsers
    }

    function createTestPurse(){
        let testPurse = []

        testData.forEach(user =>{
            const userPurse = {
                id: user.id,
                wins: user.wins,
                total_games: user.total_games,
                correct: user.correct,
            }
            testPurse.push(userPurse)
        })

        return testPurse
    }

    before('make knex instance', () => {
        db = knex({
          client: 'pg',
          connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
      })
    before('delete users', ()=> {
        return db.transaction(trx =>
            trx.raw(
                `TRUNCATE
                users,
                user_purse
                RESTART IDENTITY CASCADE`
            ))
    })
    afterEach('delete users', ()=> {
        return db.transaction(trx =>
            trx.raw(
                `TRUNCATE
                users,
                user_purse
                RESTART IDENTITY CASCADE`
            ))
    })
    after('disconnect', ()=> db.destroy())

    context('user Services', ()=>{
        beforeEach('inserts users', ()=>{
            return db
                .into('users')
                .insert(createTestUsers())
        })
        beforeEach('inserts purse', ()=>{
            return db
                .into('user_purse')
                .insert(createTestPurse())
        })

        it('gets user by user email and password', ()=>{
            userService.getUser(db, 'me@gmail.com', 'password')
                .then(result =>{
                    console.log(result)
                    expect(result).to.eql(testData[0])
                })
                .catch()
        })
        it('gets all users', ()=>{
            userService.getAllUsers(db)
                .then(result =>{
                    expect(result).to.eql(testData)
                })
                .catch()
        })

        it.only('inserts a new user', ()=>{
            const newUser = {
                id: 5,
                user_name: 'gina',
                user_email: 'test@gmail.com',
                password: 'password',
                wins: 0,
                total_games: 0,
                correct: 0
            };
            newDB = [...testData, newUser]
            userService.insertUser(db, newUser)
            .then(result =>{
                console.log(result)
            })
            .catch()
        })
    })
})