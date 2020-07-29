const express = require('express')
const tableService = require('./table-service')

const tableRouter = express.Router()

tableRouter
    .route('/strategy')
    .get((req, res, next)=>{
        tableService.pullTable(req.app.get('db'))
        .then(result =>{
            return res.status(200).json(result)
        })
        .catch(next)
    })
tableRouter
    .route('/strategy/:tableId')
    .get((req, res, next)=>{

        if (req.params.tableId > 21){
            return res.json({})
        }
        tableService.pullTableById(req.app.get('db'), req.params.tableId)
            .then(folders=>{
                return res.status(200).json(folders)
            })
        .catch(next)
    })

module.exports = tableRouter