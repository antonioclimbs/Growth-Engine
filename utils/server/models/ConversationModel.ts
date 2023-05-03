import { Pool, Client } from 'pg';

const myURI = process.env.GOOGLE_URI;

const pool = new Pool({
  connectionString: myURI,
  port: 5432,
});

const db = {
  query: (text: string, params: any, callback: any) => {
    console.log('executed query: ', text)
    return pool.query(text, params, callback)
  }
};

export default db;