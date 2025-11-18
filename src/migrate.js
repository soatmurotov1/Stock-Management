import knex from "./db/knex.js";
import { up as createCategories } from "./db/migrations/20251116134417_create_users_table.js"

async function runMigrations() {
  try {
    await createCategories(knex)
    console.log("Migration completed!")
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

runMigrations()

