import userModel from "../models/userModel";
import bcrpty from 'bcrypt';
import { createToken } from "../utils/createToken";

class AuthControllers {
  adminLogin = async (req: any, res: any) => {
    const { email, password } = req.body;
    try {
      const findAdminUser = await userModel.findOne({ email }).select('+password');
      const isPasswordMatch = await bcrpty.compare(password, findAdminUser.password);

      if (findAdminUser && isPasswordMatch) {
        const { password: _, ...adminData } = findAdminUser.toObject();
        const token = await createToken({id: findAdminUser._id, role: findAdminUser.role});
        res.cookie('accessToken', token, { expires: new Date(Date.now() + 8 * 60 * 60 * 1000), httpOnly: true });
        res.status(200).send(adminData);
      } else {
        res.status(401).send({ error: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error during admin login:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  };
  getCurrentUser = async (req: any, res: any) => {
    res.status(200).send(req.user);
  };
}

export default new AuthControllers();
