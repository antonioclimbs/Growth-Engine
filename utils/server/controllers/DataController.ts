import db from "../models/ConversationModel";

const DataController = {
  createData: async function (data: JSON, conversation_id: number): Promise<void> {
    try {
      await db.query(`
      INSERT INTO Data (data, conversation_id)
      VALUES ($1, $2)
    `, [data, conversation_id],
        console.log("Created Data to conversation_id: ", conversation_id));
    } catch (err) {
      console.error("Error creating data: ", err);
    }
  }
};

module.exports = DataController;