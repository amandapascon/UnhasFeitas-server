// TODO: rewrite import as ES6
const jwt = require('jsonwebtoken')

// TODO: rewrite export as ES6
//export async function Auth(request, response, next) {
exports.Auth = async (request, response, next) => {
  const token = request.headers.authorization

  jwt.verify(token, process.env.SECRET, (err, data) => {
    if (err) {
      return response.json({ err: 'auth' })
    } else {
      request.user = data
      return next()
    }
  })
}

//export async function AuthAdmin(request, response, next) {
exports.AuthAdmin = async (request, response, next) => {
  const token = request.headers.authorization

  jwt.verify(token, process.env.SECRET, (err, data) => {
    if (err || data.role != 'admin') {
      return response.json({ err: 'auth' })
    } else {
      request.user = data
      return next()
    }
  })
}

//export async function AuthPermissive(request, response, next) {
exports.AuthPermissive = async (request, response, next) => {
  const token = request.headers.authorization

  jwt.verify(token, process.env.SECRET, (err, data) => {
    request.user = err ? false : data
    return next()
  })
}