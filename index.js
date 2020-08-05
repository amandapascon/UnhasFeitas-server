const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const requireDir = require('require-dir')

dotenv.config()

const app = express()

//coneccao com o db
mongoose.connect(
    'mongodb+srv://amandapascon:iRIxQgY3LjSA42lE@amandadatabase.2qmed.gcp.mongodb.net/test',
    {useNewUrlParser: true}
)
requireDir('./database/models')

const routes = express.Router()

const port = process.env.PORT || 8080
app.listen(port)

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*")
    response.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
    next()
})
app.use(cors({allowedHeaders: ['Content-Type', 'Authorization']}))

app.use(express.json())

require('./controllers/userController').userController(routes)
require('./controllers/packageController').packageController(routes)

app.use(routes)

console.info(`backend app listening at port ${port}`)