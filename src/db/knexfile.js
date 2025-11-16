import "dotenv/config";

const development = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: "./migrations",
    extension: "js", // ESM fayllar uchun
  },
  seeds: {
    directory: "./seeds",
    extension: "js",
  },
};

export default { development };
