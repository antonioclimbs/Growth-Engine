import { NextApiRequest, NextApiResponse } from 'next';
import db from "../../../utils/server/models/ConversationModel";

export default async function userController(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  try {
    await db.query(`
      INSERT INTO users (email)
      VALUES ($1)
    `, [email],
      console.log("Created User with email: ", email));
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error in createUser method: ", err);
    res.status(500).json({ message: "Error creating user" });
  }
};