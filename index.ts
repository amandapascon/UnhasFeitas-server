import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const routes = express.Router()

const port = process.env.PORT || 3000
app.listen(port)

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*")
    response.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
    next()
})
app.use(cors({allowedHeaders: ['Content-Type', 'Authorization']}))

app.use(express.json())

// routes setup
require('./controllers/accountController').controller(routes)
require('./controllers/packageController').controller(routes)

app.use(routes)

console.info(`backend app listening at port ${port}`)