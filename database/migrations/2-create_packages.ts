import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('packages', table => {
    table.increments('id').primary()

    table.string('name').notNullable()

    table.string('description')

    table.string('banner')

    table.dateTime('start_time')

    table.integer('duration')

    table.integer('capacity')

    table.integer('subscribers').defaultTo(0).notNullable()

    table.boolean('available').defaultTo(true).notNullable()

    table.boolean('hidden').defaultTo(false).notNullable()

    table.string('talk_stream_url')

    table.string('palestrante')
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('talks')
}