/** @type {import('knex').Knex.Migration} */
export async function up(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

  const exists = await knex.schema.hasTable("inventory")
  if (exists) return

  return knex.schema.createTable("inventory", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"))
    table.uuid("product_id").notNullable().references("id").inTable("products").onDelete("CASCADE")
    table.integer("quantity").notNullable().defaultTo(0)
    table.string("warehouseLocation").notNullable()
    table.integer("reorderLevel").defaultTo(10)
    table.enu("status", ["in_stock", "out_of_stock", "low_stock"]).defaultTo("out_of_stock")
    table.timestamp("createdAt").defaultTo(knex.fn.now())
    table.timestamp("updatedAt").defaultTo(knex.fn.now())
  })
}
export async function down(knex) {
  return knex.schema.dropTableIfExists("inventory")
}
