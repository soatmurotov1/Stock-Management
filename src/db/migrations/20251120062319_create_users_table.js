/** @type {import('knex').Knex} */
export async function up(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('email').notNullable().unique()
    table.string('username').notNullable().unique()
    table.string('password').notNullable()
    table.enu('role', ['user', 'admin', 'warehouse_manager']).defaultTo('user')
    table.enu('status', ['active', 'inactive']).defaultTo('inactive')
    table.string('otp') 
    table.timestamp('otp_expires_at', { useTz: true })
    table.boolean('is_verified').defaultTo(false)
    table.timestamp("createdAt").defaultTo(knex.fn.now())
    table.timestamp("updatedAt").defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists('users')
}
