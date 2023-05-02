import { NextApiRequest, NextApiResponse } from 'next';
import db from "../../../utils/server/models/ConversationModel";
const uuid = require('uuid');

export default async function conversationController(req: NextApiRequest, res: NextApiResponse) {
  const { messages, id, model, name, prompt, temperature } = JSON.parse(req.body);
  const testEmail = 'hello@maslo.ai'
  const email = req.body.email ? req.body.email : testEmail;
  const formatedMessages = { 'messages': messages }

  // console.log('\n\n\n\n', messages, id, model, name, prompt, temperature, email)

  const uniqueId = uuid.v4().substring(0, 8);
  const url_endpoint = `https://maslo.ai/conversation/${uniqueId}`;

  try {
    // currently breaks if you go back to an empty chat
    if (!messages) {
      return res.status(200).json({ message: 'starting conversation' });
    } else if (messages?.length === 0) {
      await db.query(`
      INSERT INTO conversations (_id, conversation, title, user_email, prompt, temperature, url_endpoint)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [id, formatedMessages, name, email, prompt, temperature, url_endpoint],
        console.log("Created message at id: ", id));
      return res.status(201).json({ message: "message created successfully" });
    } else {
      await db.query(`
      UPDATE conversations 
      SET conversation = $1, title = $2, user_email = $3, prompt = $4, temperature = $5 
      WHERE _id = $6;
      `, [formatedMessages, name, email, prompt, temperature, id],
        console.log("Updated message at id: ", id));
      return res.status(201).json({ message: "message updated successfully" });
    }
  } catch (err) {
    console.error("Error updating message: ", err);
    res.status(500).json({ message: "Error updating message" });
  }
};