const express = require('express')
const routes = express.Router()

const authenticate = require('./middlewares/authenticate')

const userController = require('./controllers/userController')
const packController = require('./controllers/packageController')
const paymentController = require('./controllers/paymentController')
const timeController = require('./controllers/timeController')
const schedulingController = require('./controllers/schedullingController')

//rotas
routes.post('/user', userController.newUser)
routes.put('/login', userController.loginUser)
routes.get('/user', authenticate.Auth, userController.showUser)
routes.get('/users', authenticate.AuthAdmin, userController.showUsers)
routes.delete('/user', authenticate.Auth, userController.deleteUser)

routes.post('/package', authenticate.AuthAdmin, packController.newPack)
routes.delete('/package/:id', authenticate.AuthAdmin, packController.deletePack)
routes.get('/package', authenticate.Auth, packController.showPacks)

routes.post('/payment/package/:id_pack', authenticate.Auth, paymentController.newPayment)
routes.delete('/payment/:id_payment', authenticate.Auth, paymentController.deletePayment)
routes.get('/payment', authenticate.AuthAdmin, paymentController.showPayments)
routes.patch('/payment/:id_payment', authenticate.AuthAdmin, paymentController.checkPayment)

routes.post('/time', authenticate.AuthAdmin, timeController.newTime)
routes.get('/time', authenticate.Auth, timeController.showTime)
routes.delete('/time/:id_time', authenticate.AuthAdmin, timeController.deleteTime)

routes.post('/scheduling', authenticate.Auth, schedulingController.newScheduling)
routes.get('/schedulings', authenticate.AuthAdmin, schedulingController.showScheduling)
routes.get('/scheduling', authenticate.AuthAdmin, schedulingController.schedulingUser)



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
