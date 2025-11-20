export async function up(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  return knex.schema.createTable('orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.uuid('user_id').notNullable()
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.uuid('supplier_id').notNullable()
    table.foreign('supplier_id').references('id').inTable('suppliers').onDelete('CASCADE')
    table.timestamp('order_date').defaultTo(knex.fn.now())
    table.string('status').notNullable()
    table.jsonb('products')
    table.decimal('total_amount').notNullable()
    table.string('currency').notNullable()
    table.timestamp("createdAt").defaultTo(knex.fn.now())
    table.timestamp("updatedAt").defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists('orders')
}


