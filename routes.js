const express = require('express')
const routes = express.Router()

const authenticate = require('./middlewares/authenticate')

const userController = require('./controllers/userController')

//rotas
routes.post('/user', userController.newUser)
routes.put('/login', userController.loginUser)
routes.get('/users', userController.showUsers)
routes.get('/users/:id', authenticate.Auth, userController.showUser)





/* 

const Controller = require('./controllers/Controller')

//routes.post('/user', Controller.newUser)
routes.get('/user', Controller.showUser)
routes.get('/user/:id', Controller.showUserId)
routes.patch('/checkin/:id', Controller.checkinUser)
//routes.put('/login', Controller.loginUser)
routes.delete('/user/:id', Controller.deleteUser)
routes.get('/myaccount', Controller.my_account)

routes.post('/user/:id_user/package/:id_pack/payment', Controller.newPayment)
routes.get('/payment', Controller.showPayment)
routes.delete('/payment/:id', Controller.deletePayment)
routes.patch('/payment/:id', Controller.checkPayment)

routes.post('/user/:id/scheduling', Controller.newScheduling)
routes.get('/scheduling', Controller.showScheduling)
routes.get('/scheduling/:id', Controller.showSchedulingUser)
routes.delete('/scheduling/:id', Controller.deleteScheduling)

routes.post('/package', Controller.newPack)
routes.get('/package', Controller.showPacks)
routes.delete('/package/:id', Controller.deletePack)

routes.post('/time', Controller.newTime)
routes.get('/time', Controller.showTimes)
routes.delete('/time/:id', Controller.deleteTime) */

module.exports=routes
