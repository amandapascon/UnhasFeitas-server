const mongoose = require('mongoose')
const User = mongoose.model('User')

function userController(routes) {

    routes.get('/', (resquest, response) => {

    })
}

module.exports = userController;