import { NextApiRequest, NextApiResponse } from 'next';
import db from "../../../utils/server/models/ConversationModel";

export default async function dataController(req: NextApiRequest, res: NextApiResponse) {
  // export default async function dataController(data: JSON, conversation_id: number): Promise<void> {\
  const { data, conversation_id } = req.body;
  try {
    await db.query(`
      INSERT INTO data (data, conversation_id)
      VALUES ($1, $2)
    `, [data, conversation_id],
      console.log("Created data to conversation_id: ", conversation_id));
    return;
  } catch (err) {
    console.error("Error creating data: ", err);
    return;
  }
};