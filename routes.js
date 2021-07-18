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
routes.get('/users', userController.showUsers)
//voltar o authenticate.AuthAdmin no show all users
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
routes.delete('/scheduling/:id_scheduling', authenticate.Auth, schedulingController.deleteScheduling)
routes.patch('/checkin/:id_scheduling', authenticate.AuthAdmin, schedulingController.checkin)

module.exports=routes
