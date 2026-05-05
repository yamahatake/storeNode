import adminModel from "../models/adminModel";
import bcrpty from 'bcrypt';
import { createToken } from "../utils/createToken";

class AuthControllers {
  adminLogin = async (req: any, res: any) => {
    const { email, password } = req.body;
    console.log('Admin login attempt:', { email, password });
    try {
      const findAdminUser = await adminModel.findOne({ email }).select('+password');
      const isPasswordMatch = await bcrpty.compare(password, findAdminUser.password);

      if (findAdminUser && isPasswordMatch) {
        const token = await createToken({id: findAdminUser._id, role: findAdminUser.role});
        res.cookie('accessToken', token, { expires: new Date(Date.now() + 8 * 60 * 60 * 1000), httpOnly: true });
        res.status(200).json({ message: 'Login successful', admin: findAdminUser });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error during admin login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

export default new AuthControllers();
