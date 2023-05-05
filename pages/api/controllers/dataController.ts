import { NextApiRequest, NextApiResponse } from 'next';
import db from "../../../utils/server/models/ConversationModel";

export default async function dataController(req: NextApiRequest, res: NextApiResponse) {
  const { data } = req.body;
  const formatedData = { "data": data };
  const email = req.body.email ? req.body.email : 'hello@maslo.ai';

  try {
    await db.query(`
      INSERT INTO data (data, user_email)
      VALUES ($1, $2)
    `, [formatedData, email],
      console.log("Created data to email: ", email));
    res.status(201).json(formatedData);
  } catch (err) {
    console.error("Error creating data: ", err);
    res.status(500).json({ message: "Error creating data" });
  }
};