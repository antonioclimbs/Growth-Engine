import { pool } from '../models/ConversationModel'

async function createMessage(message: string, user_id: number): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(`
      INSERT INTO conversations (message, user_id)
      VALUES ($1, $2)
    `, [message, user_id]);
  } finally {
    client.release();
  }
}