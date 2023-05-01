const UserController = {
  createUser: async function (email: string) {
    try {

      console.log("in createUser method");
    } catch (e) {
      console.error("Error in createUser method: ", e);
    }
  },

  createPrompt: async function (email: string, prompt: string, data: JSON) {
    try {
      console.log("in createPrompt method");
    } catch (e) {
      console.error("Error in createPrompt method: ", e);
    }

  },

};

export default UserController;