const express = require('express')
const routes = express.Router()

const Controller = require('./controllers/Controller')

routes.post('/user', Controller.newUser)
routes.get('/user', Controller.showUser)
routes.get('/user/:id', Controller.showUserId)
routes.patch('/checkin/:id', Controller.checkinUser)
routes.put('/login', Controller.loginUser)
routes.delete('/user/:id', Controller.deleteUser)
routes.get('/myaccount', Controller.my_account)

routes.post('/payment', Controller.newPayment)
routes.get('/payment', Controller.showPayment)
routes.delete('/payment/:id', Controller.deletePayment)
routes.patch('/payment', Controller.checkPayment)

routes.post('/scheduling', Controller.newScheduling)
routes.get('/scheduling', Controller.showScheduling)
routes.get('/scheduling/:id', Controller.showSchedulingUser)
routes.delete('/scheduling/:id', Controller.deleteScheduling)

routes.post('/package', Controller.newPack)
routes.get('/package', Controller.showPacks)
routes.get('/package/:id', Controller.showPacks)
routes.delete('/package/:id', Controller.deletePack)

module.exports=routes
