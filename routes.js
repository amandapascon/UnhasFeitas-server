const express = require('express')
const routes = express.Router()

const userController = require('./controllers/userController')
routes.get('/user', userController.show)
routes.post('/user', userController.new)
routes.put('/login', userController.login)
routes.patch('/checkin', userController.checkin)

const packageController = require('./controllers/packageController')
routes.post('/package', packageController.new)
routes.patch('/package/:id_user/:id_pack/activate', packageController.activate)
routes.delete('/package/:id_user/deactivate', packageController.deactivate)
routes.delete('/package/:id', packageController.del)
routes.get('/package/:id_user/historic', packageController.historic)
routes.get('/package', packageController.show)
routes.get('/package/:id', packageController.curruntPack)

module.exports=routes