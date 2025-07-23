import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DB_URI
});

const query = (text, values) => {
  console.log('query:', text, values)
  return pool.query(text, values)
}

export { query };
