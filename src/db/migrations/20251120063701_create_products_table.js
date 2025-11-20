export async function up(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.schema.createTable('products', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('name').notNullable()
    table.text('description').notNullable()
    table.uuid('category_id').notNullable()
    table.foreign('category_id').references('id').inTable('categories').onDelete('CASCADE')
    table.decimal('price').notNullable()
    table.string('currency').notNullable()
    table.string('sku').unique().notNullable()
    table.integer('quantity').notNullable().defaultTo(0)
    table.timestamp("createdAt").defaultTo(knex.fn.now())
    table.timestamp("updatedAt").defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists('products')
}

