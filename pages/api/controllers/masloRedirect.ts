import { NextApiRequest, NextApiResponse } from 'next';
import db from "../../../utils/server/models/ConversationModel";
const uuid = require('uuid');

export default async function masloRedirect(req: NextApiRequest, res: NextApiResponse) {
  console.log('typeof req.body', typeof req.body)
  let body = req.body;
  if (typeof body === 'string') body = JSON.parse(req.body);
  const { prompt, name, description, content, data } = req.body;
  const formatedData = { "data": data };
  const email = req.body.email ? req.body.email : 'hello@maslo.ai';
  const uniqueId = uuid.v4().substring(0, 8);
  const url_endpoint = `https://maslo.ai/conversation/${uniqueId}`;

  console.log('\n\n\n\n\nuniqueId:', uniqueId, '\nemail:', email, '\nformatedData:', formatedData, '\nname:', name, '\ndescription:', description, '\nprompt:', prompt, '\ncontent:', content, '\nurl_endpoint:', url_endpoint)

  try {
    await db.query(`
      INSERT INTO graphs (_id, user_email, data, name, description, prompt, content, url_endpoint)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [uniqueId, email, formatedData, name, description, prompt, content, url_endpoint],
      console.log("Redirecting to ", url_endpoint));
    res.status(201).json({ message: "will redirect", url_endpoint });
    // res.redirect(`https://maslo.ai/conversation/${url_endpoint}`);
  } catch (err) {
    console.error("Error with redirect: ", err);
    res.status(500).json({ message: "Error with redirect", err });
  }
};