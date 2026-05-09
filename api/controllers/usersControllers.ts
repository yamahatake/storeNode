import userModel from "../models/userModel";

class UsersControllers {
  getUser = async (req: any, res: any) => {
    const { email } = req.body;
    try {
      const findUser = await userModel.findOne({ email });
      return findUser
    } catch (error) {
      console.error('Error during user search:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  };
  getUsers = async (req: any, res: any) => {
    const { email } = req.body;
    try {
      const findUser = await userModel.findOne({ email });
      return findUser
    } catch (error) {
      console.error('Error during user search:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  };
}

export default new UsersControllers();
