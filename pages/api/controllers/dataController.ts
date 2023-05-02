import { NextApiRequest, NextApiResponse } from 'next';
import db from "../../../utils/server/models/ConversationModel";

export default async function dataController(req: NextApiRequest, res: NextApiResponse) {
  // export default async function dataController(data: JSON, conversation_id: number): Promise<void> {\
  const { data } = req.body;
  const email = req.body.email ? req.body.email : 'hello@maslo.ai';

  try {
    await db.query(`
      INSERT INTO data (data, user_email)
      VALUES ($1, $2)
    `, [data, email],
      console.log("Created data to email: ", email));
    res.status(201).json({ message: "Data created successfully" });
  } catch (err) {
    console.error("Error creating data: ", err);
    res.status(500).json({ message: "Error creating data" });
  }
};