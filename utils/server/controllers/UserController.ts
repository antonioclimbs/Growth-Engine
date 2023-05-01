import db from "../models/ConversationModel";

const UserController = {
  createUser: async function (email: string) {
    try {
      await db.query(`
      INSERT INTO Data (email)
      VALUES ($1)
    `, [email],
        console.log("Created User with email: ", email));
      return;
    } catch (err) {
      console.error("Error in createUser method: ", err);
      return;
    }
  },
};
module.exports = UserController;