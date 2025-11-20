export async function up(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  return knex.schema.createTable('suppliers', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('name').notNullable()
    table.string('contact_email').unique().notNullable()
    table.string('phone_number').notNullable()
    table.string('address').notNullable()
    table.timestamp("createdAt").defaultTo(knex.fn.now())
    table.timestamp("updatedAt").defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists('suppliers')
}

