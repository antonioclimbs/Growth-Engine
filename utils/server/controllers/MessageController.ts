import db from "../models/ConversationModel";

const MessageController = {
  createMessage: async function (message: string, conversation_id: number): Promise<void> {
    // const client = await db.connect();
    try {
      await db.query(`
      INSERT INTO Message (message, conversation_id)
      VALUES ($1, $2)
    `, [message, conversation_id],
        console.log("Created Message to conversation_id: ", conversation_id));
    } catch (err) {
      console.error("Error creating message: ", err);
    }
  }
};

module.exports = MessageController;