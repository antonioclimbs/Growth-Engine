import { Pool } from 'pg';

const username = process.env.POSTGRESQL_USERNAME;
const ip = process.env.INSTANCE_IP_ADDRESS;
const dbname = process.env.DATABASE_NAME;
const psqlpassword = process.env.POSTGRESQL_PASSWORD;

const pool = new Pool({
  user: username,
  host: ip,
  database: dbname,
  password: psqlpassword,
  port: 5432,
});

const db = {
  query: (text: string, params: any, callback: any) => {
    console.log('executed query: ', text)
    return pool.query(text, params, callback)
  }
};

export default db;