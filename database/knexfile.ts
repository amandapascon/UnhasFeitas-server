import path from 'path'

//yarn knex:migrate

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'secot.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations')
  },
  useNullAsDefault : true,
}
