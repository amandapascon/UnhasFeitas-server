const express = require('express')
const routes = express.Router()

const userController = require('./controllers/userController')
routes.get('/user', userController.show)
routes.post('/user', userController.new)

const packageController = require('./controllers/packageController')
routes.get('/package', packageController.showHistoric)
routes.post('/package', packageController.new)
routes.delete('/package', packageController.del)

module.exports=routes