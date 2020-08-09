const express = require('express')
const routes = express.Router()

const userController = require('./controllers/userController')
routes.get('/user', userController.show)
routes.post('/user', userController.new)
routes.put('/login', userController.login)

const packageController = require('./controllers/packageController')
routes.post('/package', packageController.new)
routes.post('/package/:id/activate', packageController.activate)
routes.delete('/package/:id', packageController.del)
routes.get('/package', packageController.show)
routes.get('/package/:id', packageController.curruntPack)

module.exports=routes