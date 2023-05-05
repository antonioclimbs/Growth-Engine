import { NextApiRequest, NextApiResponse } from 'next';
import db from "../../../utils/server/models/ConversationModel";
const uuid = require('uuid');

export default async function masloRedirect(req: NextApiRequest, res: NextApiResponse) {
  // console.log('typeof req.body', typeof req.body)
  let body = req.body;
  if (typeof body === 'string') body = JSON.parse(req.body);
  // console.log('typeof body', typeof body)
  const { prompt, name, description, content, data, email } = body;
  const formatedData = { "data": data };
  const uniqueId = uuid.v4().substring(0, 8);
  const url_endpoint = `https://maslo.ai/conversation/${uniqueId}`;

  console.log('\n\n\n\n\nuniqueId:', uniqueId, '\nemail:', email, '\nformatedData:', formatedData, '\nname:', name, '\ndescription:', description, '\nprompt:', prompt, '\ncontent:', content, '\nurl_endpoint:', url_endpoint, '\n\n\n')

  try {
    // const select = await db.query(`SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)`, [email], console.log('sected query executed'))
    // console.log('\n\nselect query:', select)

    // await db.query(`
    //   DO $$
    //     DECLARE
    //       user_exists BOOLEAN;
    //     BEGIN
    //       SELECT EXISTS(SELECT 1 FROM users WHERE email = $2) INTO user_exists;
    //       IF user_exists THEN
    //         UPDATE graphs
    //         data = $3, name = $4, description = $5, prompt = $6, content = $7, url_endpoint = $8
    //         WHERE user_email = $2;
    //       ELSE
    //         INSERT INTO users (email)
    //         VALUES ($2);
    //         INSERT INTO graphs (_id, user_email, data, name, description, prompt, content, url_endpoint)
    //         VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    //       END IF;
    //     END;
    //   $$;
    //   `, [uniqueId, email, formatedData, name, description, prompt, content, url_endpoint],
    //   console.log("Redirecting to ", url_endpoint));

    await db.query(`
    INSERT INTO graphs(_id, user_email, url_endpoint) VALUES($1, $2, $3);
    
    IF NOT EXISTS(SELECT 1 FROM users WHERE email = $2) THEN
      INSERT INTO users (email)
      VALUES ($2);
    END IF;
    `, [uniqueId, email, url_endpoint], (err: any, res: any) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Inserted row with id ${uniqueId}, email ${email}, and url ${url_endpoint}`);
      }
    });

    // await db.query(`
    //   IF NOT EXISTS(SELECT 1 FROM users WHERE email = $2) THEN
    //     INSERT INTO users (email)
    //     VALUES ($2);
    //   END IF;

    //   INSERT INTO graphs (_id, user_email, data, name, description, prompt, content, url_endpoint)
    //   VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    //   `, [uniqueId, email, formatedData, name, description, prompt, content, url_endpoint],
    //   () => console.log("Will redirect to ", url_endpoint));

    // UPDATE graphs
    // SET data = $3, name = $4, description = $5, prompt = $6, content = $7, url_endpoint = $8
    // WHERE user_email = $2;

    // INSERT INTO graphs (_id, user_email, data, name, description, prompt, content, url_endpoint)
    // VALUES ($1, $2, $3, $4, $5, $6, $7, $8)


    // await db.query(`
    //   UPDATE graphs
    //   data = $2, name = $3, description = $4, prompt = $5, content = $6, url_endpoint = $7
    //   WHERE user_email = $1
    // `, [email, formatedData, name, description, prompt, content, url_endpoint],
    //   console.log("Redirecting to ", url_endpoint));

    res.status(302).json({ message: "will redirect", url_endpoint });
  } catch (err) {
    console.error("Error with redirect: ", err);
    res.status(500).json({ message: "Error with redirect", err });
  }
};