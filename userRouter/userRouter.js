const express = require('express');
const xss = require('xss')
const userService = require('./user-service')

const userRouter = express.Router()
const jsonParser = express.json()

userRouter
    .route('/api/users/:user')
    .all(checkUserExists)
    .get(jsonParser, (req, res, next) =>{
        const loginUser = req.params.user.split(':')
        userService.getUser(req.app.get('db'), loginUser[0], loginUser[1])
            .then(result => {
                res.json(result)
            })
            .catch(next)
    })
    async function checkUserExists(req, res, next) {
        try {
            const loginUserArray = req.params.user.split(':')
            const loginUser = {
                id: loginUserArray[1],
                user_email: loginUserArray[0],
                password: loginUserArray[1],
                user_name: loginUserArray[2]
            }
            const thing = await userService.getUser(
            req.app.get('db'),
            loginUser.user_email, loginUser.password
          )
          if (!thing){
            userService.insertUser(req.app.get('db'), loginUser)
            .then( result => {
                const user = {
                    ...loginUser,
                    wins: 0,
                    user_image: 'goku',
                    total_games: 0,
                    correct: 0
                }
                return res.json(user)
            })
          }
        } catch (error) {
          next(error)
        }
      }

userRouter
      .route('/api/user')
      .patch(jsonParser, (req, res, next)=>{
          const { id, wins, total_games, correct, user_image } = req.body
          const userStats = { id, wins, total_games, correct, user_image }
          userService.updateUser(req.app.get('db'), userStats)
            .then(result =>{
                return res.json({message: 'user updated'})
            })
            .catch(next)
      })
      .delete(jsonParser, (req, res, next) =>{
        const { id, wins, total_games, correct } = req.body
        const userStats = { id, wins, total_games, correct }

        userService.deleteUser(req.app.get('db'), userStats.id)
            .then(result=> {
                res.json({message: 'user deleted'})
            })
            .catch(next)
    })
    module.exports = userRouter;