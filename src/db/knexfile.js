import "dotenv/config";

const development = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: "./migrations",
    extension: "js", 
  },
  seeds: {
    directory: "./seeds",
    extension: "js",
  },
}

export default { development }
