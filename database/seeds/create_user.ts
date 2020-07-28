import Knex from 'knex'
import bcrypt from 'bcryptjs'

export async function seed(knex: Knex){
  return knex('users').insert([{
    email: 'admin@secot.com.br',
    name: 'Admin User',
    password_hash: bcrypt.hashSync('admin123', 10),
    role: 'admin',
  },
  {
    email: 'user@secot.com.br',
    name: 'Regular User',
    password_hash: bcrypt.hashSync('user123', 10),
  }])
}