import { NextApiRequest, NextApiResponse } from 'next';
import db from "../../../utils/server/models/ConversationModel";

export default async function messageController(req: NextApiRequest, res: NextApiResponse) {
  // export default async function messageController(message: string, conversation_id: number): Promise<void> {
  const { message, conversation_id } = req.body
  try {
    await db.query(`
      INSERT INTO message (message, conversation_id)
      VALUES ($1, $2)
    `, [message, conversation_id],
      console.log("Created message to conversation_id: ", conversation_id));
    res.status(201).json({ message: "message created successfully" });
  } catch (err) {
    console.error("Error creating message: ", err);
  }
};