import { NextApiRequest, NextApiResponse } from 'next';
import db from "../../../utils/server/models/ConversationModel";

export default async function dataController(req: NextApiRequest, res: NextApiResponse) {
  // export default async function dataController(data: JSON, conversation_id: number): Promise<void> {\
  console.log('checking req.body first', req.body)
  const { data, conversation_id } = req.body;
  // console.log('checking data in dataController', data)
  // console.log('checking conversation_id in dataController', conversation_id)
  const jsonData = JSON.stringify(data);
  try {
    await db.query(`
      INSERT INTO data (data, conversation_id)
      VALUES ($1, $2)
    `, [jsonData, conversation_id],
      console.log("Created data to conversation_id: ", conversation_id));
    res.status(201).json({ message: "Data created successfully" });
  } catch (err) {
    console.error("Error creating data: ", err);
    res.status(500).json({ message: "Error creating data" });
  }
};